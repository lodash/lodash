<?php

require(dirname(__FILE__) . "/Entry.php");

/**
 * Generates Markdown from JSDoc entries.
 */
class MarkdownGenerator {

  /**
   * The HTML for the close tag.
   *
   * @static
   * @memberOf MarkdownGenerator
   * @type string
   */
  public $closeTag = "\n<!-- /div -->\n";

  /**
   * An array of JSDoc entries.
   *
   * @memberOf MarkdownGenerator
   * @type Array
   */
  public $entries = array();

  /**
   * The HTML for the open tag.
   *
   * @memberOf MarkdownGenerator
   * @type string
   */
  public $openTag = "\n<!-- div -->\n";

  /**
   * An options array used to configure the generator.
   *
   * @memberOf MarkdownGenerator
   * @type Array
   */
  public $options = array();

  /**
   * The file's source code.
   *
   * @memberOf MarkdownGenerator
   * @type string
   */
  public $source = '';

  /**
   * The array of code snippets that are tokenized by `escape`.
   *
   * @private
   * @memberOf MarkdownGenerator
   * @type Array
   */
  private $snippets = array();

  /*--------------------------------------------------------------------------*/

  /**
   * The MarkdownGenerator constructor.
   *
   * @constructor
   * @param {string} $source The source code to parse.
   * @param {Array} $options The options array.
   */
  public function __construct( $source, $options = array() ) {
    // juggle arguments
    if (is_array($source)) {
      $options = $source;
    } else {
      $options['source'] = $source;
    }
    if (isset($options['source']) && realpath($options['source'])) {
      $options['path'] = $options['source'];
    }
    if (isset($options['path'])) {
      preg_match('/(?<=\.)[a-z]+$/', $options['path'], $ext);
      $options['source'] = file_get_contents($options['path']);
      $ext = array_pop($ext);

      if (!isset($options['lang']) && $ext) {
        $options['lang'] = $ext;
      }
      if (!isset($options['title'])) {
        $options['title'] = ucfirst(basename($options['path'])) . ' API documentation';
      }
    }
    if (!isset($options['lang'])) {
      $options['lang'] = 'js';
    }
    if (!isset($options['toc'])) {
      $options['toc'] = 'properties';
    }

    $this->options = $options;
    $this->source = str_replace(PHP_EOL, "\n", $options['source']);
    $this->entries = Entry::getEntries($this->source);

    foreach ($this->entries as $index => $value) {
      $this->entries[$index] = new Entry($value, $this->source, $options['lang']);
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Performs common string formatting operations.
   *
   * @private
   * @static
   * @memberOf MarkdownGenerator
   * @param {string} $string The string to format.
   * @returns {string} The formatted string.
   */
  private static function format( $string ) {
    $counter = 0;

    // tokenize inline code snippets
    preg_match_all('/`[^`]+`/', $string, $tokenized);
    $tokenized = $tokenized[0];
    foreach ($tokenized as $snippet) {
      $string = str_replace($snippet, '__token' . ($counter++) .'__', $string);
    }

    // italicize parentheses
    $string = preg_replace('/(^|\s)(\([^)]+\))/', '$1*$2*', $string);

    // mark numbers as inline code
    $string = preg_replace('/[\t ](-?\d+(?:.\d+)?)(?!\.[^\n])/', ' `$1`', $string);

    // detokenize inline code snippets
    $counter = 0;
    foreach ($tokenized as $snippet) {
      $string = str_replace('__token' . ($counter++) . '__', $snippet, $string);
    }

    return trim($string);
  }

  /**
   * Modify a string by replacing named tokens with matching assoc. array values.
   *
   * @private
   * @static
   * @memberOf MarkdownGenerator
   * @param {string} $string The string to modify.
   * @param {Array|Object} $object The template object.
   * @returns {string} The modified string.
   */
  private static function interpolate( $string, $object ) {
    preg_match_all('/#\{([^}]+)\}/', $string, $tokens);
    $tokens = array_unique(array_pop($tokens));

    foreach ($tokens as $token) {
      $pattern = '/#\{' . preg_replace('/([.*+?^${}()|[\]\\\])/', '\\\$1', $token) . '\}/';
      $replacement = '';

      if (is_object($object)) {
        preg_match('/\(([^)]+?)\)$/', $token, $args);
        $args = preg_split('/,\s*/', array_pop($args));
        $method = 'get' . ucfirst(preg_replace('/\([^)]+?\)$/', '', $token));

        if (method_exists($object, $method)) {
          $replacement = (string) call_user_func_array(array($object, $method), $args);
        } else if (isset($object->{$token})) {
          $replacement = (string) $object->{$token};
        }
      } else if (isset($object[$token])) {
        $replacement = (string) $object[$token];
      }
      $string = preg_replace($pattern, trim($replacement), $string);
    }
    return MarkdownGenerator::format($string);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Adds the given `$entries` to the `$result` array.
   *
   * @private
   * @memberOf MarkdownGenerator
   * @param {Array} $result The result array to modify.
   * @param {Array} $entries The entries to add to the `$result`.
   */
  private function addEntries( &$result, $entries ) {
    foreach ($entries as $entry) {
      // skip aliases
      if ($entry->isAlias()) {
        continue;
      }
      // name and description
      array_push(
        $result,
        $this->openTag,
        MarkdownGenerator::interpolate("### <a id=\"#{hash}\"></a>`#{member}#{separator}#{call}`\n<a href=\"##{hash}\">#</a> [&#x24C8;](#{href} \"View in source\") [&#x24C9;][1]\n\n#{desc}", array(
          'call' => $entry->getCall(),
          'desc' => $this->escape($entry->getDesc()),
          'hash' => $entry->hash,
          'href' => $entry->href,
          'member' => $entry->member,
          'separator' => $entry->separator
        ))
      );

      // @alias
      if (count($aliases = $entry->getAliases())) {
        array_push($result, '', '#### Aliases');
        foreach ($aliases as $index => $alias) {
          $aliases[$index] = MarkdownGenerator::interpolate('#{member}#{separator}#{name}', $alias);
        }
        $result[] = '*' . implode(', ', $aliases) . '*';
      }
      // @param
      if (count($params = $entry->getParams())) {
        array_push($result, '', '#### Arguments');
        foreach ($params as $index => $param) {
          $result[] = MarkdownGenerator::interpolate('#{num}. `#{name}` (#{type}): #{desc}', array(
            'desc' => $this->escape($param[2]),
            'name' => $param[1],
            'num'  => $index + 1,
            'type' => $this->escape($param[0])
          ));
        }
      }
      // @returns
      if (count($returns = $entry->getReturns())) {
        array_push(
          $result, '',
          '#### Returns',
          MarkdownGenerator::interpolate('(#{type}): #{desc}', array(
            'desc' => $this->escape($returns[1]),
            'type' => $this->escape($returns[0])
          ))
        );
      }
      // @example
      if ($example = $entry->getExample()) {
        array_push($result, '', '#### Example', $example);
      }
      array_push($result, "\n* * *", $this->closeTag);
    }
  }

  /**
   * Escapes special Markdown characters.
   *
   * @private
   * @memberOf Entry
   * @param {string} $string The string to escape.
   * @returns {string} Returns the escaped string.
   */
  private function escape( $string ) {
    $string = preg_replace_callback('/`.*?\`/', array($this, 'swapSnippetsToTokens'), $string);
    $string = preg_replace('/(?<!\\\)\*/', '&#42;', $string);
    $string = preg_replace('/(?<!\\\)\[/', '&#91;', $string);
    $string = preg_replace('/(?<!\\\)\]/', '&#93;', $string);
    $string = preg_replace_callback('/@@token@@/', array($this, 'swapTokensToSnippets'), $string);
    return $string;
  }

  /**
   * Resolves the entry's hash used to navigate the documentation.
   *
   * @private
   * @memberOf MarkdownGenerator
   * @param {number|Object} $entry The entry object.
   * @param {string} $member The name of the member.
   * @returns {string} The url hash.
   */
  private function getHash( $entry, $member = '' ) {
    $entry = is_numeric($entry) ? $this->entries[$entry] : $entry;
    $member = !$member ? $entry->getMembers(0) : $member;

    $result = ($member ? $member . ($entry->isPlugin() ? 'prototype' : '') : '') . $entry->getCall();
    $result = preg_replace('/\(\[|\[\]/', '', $result);
    $result = preg_replace('/[\t =|\'"{}.()\]]/', '', $result);
    $result = preg_replace('/[\[#,]+/', '-', $result);
    return strtolower($result);
  }

  /**
   * Resolves the entry's url for the specific line number.
   *
   * @private
   * @memberOf MarkdownGenerator
   * @param {number|Object} $entry The entry object.
   * @returns {string} The url.
   */
  private function getLineUrl( $entry ) {
    $entry = is_numeric($entry) ? $this->entries($entry) : $entry;
    return $this->options['url'] . '#L' . $entry->getLineNumber();
  }

  /**
   * Extracts the character used to separate the entry's name from its member.
   *
   * @private
   * @memberOf MarkdownGenerator
   * @param {number|Object} $entry The entry object.
   * @returns {string} The separator.
   */
  private function getSeparator( $entry ) {
    $entry = is_numeric($entry) ? $this->entries($entry) : $entry;
    return $entry->isPlugin() ? '.prototype.' : '.';
  }

  /**
   * Swaps code snippets with tokens as a `preg_replace_callback` callback
   * used by `escape`.
   *
   * @private
   * @memberOf Entry
   * @param {Array} $matches The array of regexp matches.
   * @returns {string} Returns the token.
   */
  private function swapSnippetsToTokens( $matches ) {
    $this->snippets[] = $matches[0];
    return '@@token@@';
  }

  /**
   * Swaps tokens with code snippets as a `preg_replace_callback` callback
   * used by `escape`.
   *
   * @private
   * @memberOf Entry
   * @returns {string} Returns the code snippet.
   */
  private function swapTokensToSnippets() {
    return array_shift($this->snippets);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Generates Markdown from JSDoc entries.
   *
   * @memberOf MarkdownGenerator
   * @returns {string} The rendered Markdown.
   */
  public function generate() {
    $api = array();
    $byCategory = $this->options['toc'] == 'categories';
    $categories = array();
    $closeTag = $this->closeTag;
    $compiling = false;
    $openTag = $this->openTag;
    $result = array('# ' . $this->options['title']);
    $toc = 'toc';

    // initialize $api array
    foreach ($this->entries as $entry) {
      // skip invalid or private entries
      $name = $entry->getName();
      if (!$name || $entry->isPrivate()) {
        continue;
      }

      $members = $entry->getMembers();
      $members = count($members) ? $members : array('');

      foreach ($members as $member) {
        // create api category arrays
        if ($member && !isset($api[$member])) {
          // create temporary entry to be replaced later
          $api[$member] = new stdClass;
          $api[$member]->static = array();
          $api[$member]->plugin = array();
        }

        // append entry to api member
        if (!$member || $entry->isCtor() || ($entry->getType() == 'Object' &&
            !preg_match('/[=:]\s*(?:null|undefined)\s*[,;]?$/', $entry->entry))) {

          // assign the real entry, replacing the temporary entry if it exist
          $member = ($member ? $member . ($entry->isPlugin() ? '#' : '.') : '') . $name;
          $entry->static = @$api[$member] ? $api[$member]->static : array();
          $entry->plugin = @$api[$member] ? $api[$member]->plugin : array();

          $api[$member] = $entry;
          foreach ($entry->getAliases() as $alias) {
            $api[$member]->static[] = $alias;
          }
        }
        else if ($entry->isStatic()) {
          $api[$member]->static[] = $entry;
          foreach ($entry->getAliases() as $alias) {
            $api[$member]->static[] = $alias;
          }
        }
        else if (!$entry->isCtor()) {
          $api[$member]->plugin[] = $entry;
          foreach ($entry->getAliases() as $alias) {
            $api[$member]->plugin[] = $alias;
          }
        }
      }
    }

    // add properties to each entry
    foreach ($api as $entry) {
      $entry->hash = $this->getHash($entry);
      $entry->href = $this->getLineUrl($entry);
      $entry->separator = '';

      $member = $entry->getMembers(0);
      $member = ($member ? $member . $this->getSeparator($entry) : '') . $entry->getName();
      $entry->member = preg_replace('/' . $entry->getName() . '$/', '', $member);

      // add properties to static and plugin sub-entries
      foreach (array('static', 'plugin') as $kind) {
        foreach ($entry->{$kind} as $subentry) {
          $subentry->hash = $this->getHash($subentry);
          $subentry->href = $this->getLineUrl($subentry);
          $subentry->member = $member;
          $subentry->separator = $this->getSeparator($subentry);
        }
      }
    }

    /*------------------------------------------------------------------------*/

    // custom sort for root level entries
    // TODO: see how well it handles deeper namespace traversal
    function sortCompare($a, $b) {
      $score = array( 'a' => 0, 'b' => 0);
      foreach (array( 'a' => $a, 'b' => $b) as $key => $value) {
        // capitalized properties are last
        if (preg_match('/[#.][A-Z]/', $value)) {
          $score[$key] = 0;
        }
        // lowercase prototype properties are next to last
        else if (preg_match('/#[a-z]/', $value)) {
          $score[$key] = 1;
        }
        // lowercase static properties next to first
        else if (preg_match('/\.[a-z]/', $value)) {
          $score[$key] = 2;
        }
        // root properties are first
        else if (preg_match('/^[^#.]+$/', $value)) {
          $score[$key] = 3;
        }
      }
      $score = $score['b'] - $score['a'];
      return $score ? $score : strcasecmp($a, $b);
    }

    uksort($api, 'sortCompare');

    // sort static and plugin sub-entries
    foreach ($api as $entry) {
      foreach (array('static', 'plugin') as $kind) {
        $sortBy = array( 'a' => array(), 'b' => array(), 'c' => array() );
        foreach ($entry->{$kind} as $subentry) {
          $name = $subentry->getName();
          // functions w/o ALL-CAPs names are last
          $sortBy['a'][] = $subentry->getType() == 'Function' && !preg_match('/^[A-Z_]+$/', $name);
          // ALL-CAPs properties first
          $sortBy['b'][] = preg_match('/^[A-Z_]+$/', $name);
          // lowercase alphanumeric sort
          $sortBy['c'][] = strtolower($name);
        }
        array_multisort($sortBy['a'], SORT_ASC,  $sortBy['b'], SORT_DESC, $sortBy['c'], SORT_ASC, $entry->{$kind});
      }
    }

    /*------------------------------------------------------------------------*/

    // add categories
    foreach ($api as $entry) {
      $categories[$entry->getCategory()][] = $entry;
      foreach (array('static', 'plugin') as $kind) {
        foreach ($entry->{$kind} as $subentry) {
          $categories[$subentry->getCategory()][] = $subentry;
        }
      }
    }

    // sort categories
    ksort($categories);

    foreach(array('Methods', 'Properties') as $category) {
      if (isset($categories[$category])) {
        $entries = $categories[$category];
        unset($categories[$category]);
        $categories[$category] = $entries;
      }
    }

    /*------------------------------------------------------------------------*/

    // compile TOC
    $result[] = $openTag;

    // compile TOC by categories
    if ($byCategory) {
      foreach ($categories as $category => $entries) {
        if ($compiling)  {
          $result[] = $closeTag;
        } else {
          $compiling = true;
        }
        // assign TOC hash
        if (count($result) == 2) {
          $toc = strtolower($category);
        }
        // add category
        array_push(
          $result,
          $openTag, '## ' . (count($result) == 2 ? '<a id="' . $toc . '"></a>' : '') . '`' . $category . '`'
        );
        // add entries
        foreach ($entries as $entry) {
          if ($entry->isAlias()) {
            $result[] = MarkdownGenerator::interpolate('* <a href="##{hash}" class="alias">`#{member}#{separator}#{name}` -> `#{realName}`</a>', array(
              'hash'      => $entry->hash,
              'member'    => $entry->member,
              'name'      => $entry->getName(),
              'realName'  => $entry->owner->getName(),
              'separator' => $entry->separator
            ));
          }
          else {
            $result[] = MarkdownGenerator::interpolate('* <a href="##{hash}">`#{member}#{separator}#{name}`</a>', $entry);
          }
        }
      }
    }
    // compile TOC by namespace
    else {
      foreach ($api as $entry) {
        if ($compiling) {
          $result[] = $closeTag;
        } else {
          $compiling = true;
        }
        $member = $entry->member . $entry->getName();

        // assign TOC hash
        if (count($result) == 2) {
          $toc = $member;
        }
        // add root entry
        array_push(
          $result,
          $openTag, '## ' . (count($result) == 2 ? '<a id="' . $toc . '"></a>' : '') . '`' . $member . '`',
          MarkdownGenerator::interpolate('* [`' . $member . '`](##{hash})', $entry)
        );

        // add static and plugin sub-entries
        foreach (array('static', 'plugin') as $kind) {
          if ($kind == 'plugin' && count($entry->plugin)) {
            array_push(
              $result,
              $closeTag,
              $openTag,
              '## `' . $member . ($entry->isCtor() ? '.prototype`' : '`')
            );
          }
          foreach ($entry->{$kind} as $subentry) {
            $subentry->member = $member;
            if ($subentry->isAlias()) {
              $result[] = MarkdownGenerator::interpolate('* <a href="##{hash}" class="alias">`#{member}#{separator}#{name}` -> `#{realName}`</a>', array(
                'hash'      => $subentry->hash,
                'member'    => $subentry->member,
                'name'      => $subentry->getName(),
                'realName'  => $subentry->owner->getName(),
                'separator' => $subentry->separator
              ));
            }
            else {
              $result[] = MarkdownGenerator::interpolate('* <a href="##{hash}">`#{member}#{separator}#{name}`</a>', $subentry);
            }
          }
        }
      }
    }

    array_push($result, $closeTag, $closeTag);

    /*------------------------------------------------------------------------*/

    // compile content
    $compiling = false;
    $result[] = $openTag;

    if ($byCategory) {
      foreach ($categories as $category => $entries) {
        if ($compiling)  {
          $result[] = $closeTag;
        } else {
          $compiling = true;
        }
        if ($category != 'Methods' && $category != 'Properties') {
          $category = '“' . $category . '” Methods';
        }
        array_push($result, $openTag, '## `' . $category . '`');
        $this->addEntries($result, $entries);
      }
    }
    else {
      foreach ($api as $entry) {
        // skip aliases
        if ($entry->isAlias()) {
          continue;
        }
        if ($compiling)  {
          $result[] = $closeTag;
        } else {
          $compiling = true;
        }
        // add root entry name
        $member = $entry->member . $entry->getName();
        array_push($result, $openTag, '## `' . $member . '`');

        foreach (array($entry, 'static', 'plugin') as $kind) {
          $subentries = is_string($kind) ? $entry->{$kind} : array($kind);

          // add sub-entry name
          if ($kind != 'static' && $entry->getType() != 'Object' &&
                count($subentries) && $subentries[0] != $kind) {
            if ($kind == 'plugin') {
              $result[] = $closeTag;
            }
            array_push(
              $result,
              $openTag,
              '## `' . $member . ($kind == 'plugin' ? '.prototype`' : '`')
            );
          }
          $this->addEntries($result, $subentries);
        }
      }
    }

    // close tags add TOC link reference
    array_push($result, $closeTag, $closeTag, '', '  [1]: #' . $toc . ' "Jump back to the TOC."');

    // cleanup whitespace
    return trim(preg_replace('/[\t ]+\n/', "\n", join($result, "\n")));
  }
}
?>