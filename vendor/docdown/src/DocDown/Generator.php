<?php

require(dirname(__FILE__) . "/Entry.php");

/**
 * Generates Markdown from JSDoc entries.
 */
class Generator {

  /**
   * An array of JSDoc entries.
   *
   * @memberOf Generator
   * @type Array
   */
  public $entries = array();

  /**
   * An options array used to configure the generator.
   *
   * @memberOf Generator
   * @type Array
   */
  public $options = array();

  /**
   * The entire file's source code.
   *
   * @memberOf Generator
   * @type String
   */
  public $source = '';

  /*--------------------------------------------------------------------------*/

  /**
   * The Generator constructor.
   *
   * @constructor
   * @param {String} $source The source code to parse.
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
   * @memberOf Generator
   * @param {String} $string The string to format.
   * @returns {String} The formatted string.
   */
  private static function format($string) {
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
    $string = preg_replace('/ (-?\d+(?:.\d+)?)(?!\.[^\n])/', ' `$1`', $string);

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
   * @memberOf Generator
   * @param {String} $string The string to modify.
   * @param {Array|Object} $object The template object.
   * @returns {String} The modified string.
   */
  private static function interpolate($string, $object) {
    preg_match_all('/#\{([^}]+)\}/', $string, $tokens);
    $tokens = array_unique(array_pop($tokens));

    foreach ($tokens as $token) {
      $pattern = '/#\{' . $token . '\}/';
      $replacement = '';

      if (is_object($object)) {
        preg_match('/\(([^)]+?)\)$/', $token, $args);
        $args = preg_split('/,\s*/', array_pop($args));
        $method = 'get' . ucfirst(str_replace('/\([^)]+?\)$/', '', $token));

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
    return Generator::format($string);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Resolves the entry's hash used to navigate the documentation.
   *
   * @private
   * @memberOf Generator
   * @param {Number|Object} $entry The entry object.
   * @param {String} $member The name of the member.
   * @returns {String} The url hash.
   */
  private function getHash( $entry, $member = '' ) {
    $entry = is_numeric($entry) ? $this->entries[$entry] : $entry;
    $member = !$member ? $entry->getMembers(0) : $member;
    $result = ($member ? $member . ($entry->isPlugin() ? 'prototype' : '') : '') . $entry->getCall();
    $result = preg_replace('/\(\[|\[\]/', '', $result);
    $result = preg_replace('/[ =\'"{}.()\]]/', '', $result);
    $result = preg_replace('/[[#,]/', '-', $result);
    return strtolower($result);
  }

  /**
   * Resolves the entry's url for the specific line number.
   *
   * @private
   * @memberOf Generator
   * @param {Number|Object} $entry The entry object.
   * @returns {String} The url.
   */
  private function getLineUrl( $entry ) {
    $entry = is_numeric($entry) ? $this->entries($entry) : $entry;
    return $this->options['url'] . '#L' . $entry->getLineNumber();
  }

  /**
   * Extracts the character used to separate the entry's name from its member.
   *
   * @private
   * @memberOf Generator
   * @param {Number|Object} $entry The entry object.
   * @returns {String} The separator.
   */
  private function getSeparator( $entry ) {
    $entry = is_numeric($entry) ? $this->entries($entry) : $entry;
    return $entry->isPlugin() ? '.prototype.' : '.';
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Generates Markdown from JSDoc entries.
   *
   * @memberOf Generator
   * @returns {String} The rendered Markdown.
   */
  public function generate() {
    $api = array();
    $compiling = false;
    $openTag = "\n<!-- div -->\n";
    $closeTag = "\n<!-- /div -->\n";
    $result = array('# ' . $this->options['title']);
    $toc = 'toc';

    // initialize $api array
    foreach ($this->entries as $entry) {

      if (!$entry->isPrivate()) {
        $name = $entry->getName();
        $members = $entry->getMembers();
        $members = count($members) ? $members : array('');

        foreach ($members as $member) {
          // create api category arrays
          if (!isset($api[$member]) && $member) {
            $api[$member] = new Entry('', '', $entry->lang);
            $api[$member]->static = array();
            $api[$member]->plugin = array();
          }
          // append entry to api category
          if (!$member || $entry->isCtor() || ($entry->getType() == 'Object' &&
              !preg_match('/[=:]\s*null\s*[,;]?$/', $entry->entry))) {
            $member = ($member ? $member . ($entry->isPlugin() ? '#' : '.') : '') . $name;
            $entry->static = @$api[$member] ? $api[$member]->static : array();
            $entry->plugin = @$api[$member] ? $api[$member]->plugin : array();
            $api[$member]  = $entry;
          }
          else if ($entry->isStatic()) {
            $api[$member]->static[] = $entry;
          } else if (!$entry->isCtor()) {
            $api[$member]->plugin[] = $entry;
          }
        }
      }
    }

    /*------------------------------------------------------------------------*/

    // custom sort for root level entries
    // TODO: see how well it handles deeper namespace traversal
    function sortCompare($a, $b) {
      $score = array( 'a' => 0, 'b' => 0);
      foreach (array( 'a' => $a, 'b' => $b) as $key => $value) {
        // capitalized keys that represent constructor properties are last
        if (preg_match('/[#.][A-Z]/', $value)) {
          $score[$key] = 0;
        }
        // lowercase keys with prototype properties are next to last
        else if (preg_match('/#[a-z]/', $value)) {
          $score[$key] = 1;
        }
        // lowercase keys with static properties next to first
        else if (preg_match('/\.[a-z]/', $value)) {
          $score[$key] = 2;
        }
        // lowercase keys with no properties are first
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

    // compile TOC
    $result[] = $openTag;

    foreach ($api as $key => $entry) {
      $entry->hash = $this->getHash($entry);
      $entry->href = $this->getLineUrl($entry);

      $member = $entry->getMembers(0);
      $member = ($member ? $member . ($entry->isPlugin() ? '.prototype.' : '.') : '') . $entry->getName();

      $entry->member = preg_replace('/' . $entry->getName() . '$/', '', $member);

      $compiling = $compiling ? ($result[] = $closeTag) : true;

      // assign TOC hash
      if (count($result) == 2) {
        $toc = $member;
      }

      // add root entry
      array_push(
        $result,
        $openTag, '## ' . (count($result) == 2 ? '<a id="' . $toc . '"></a>' : '') . '`' . $member . '`',
        Generator::interpolate('* [`' . $member . '`](##{hash})', $entry)
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
          $subentry->hash = $this->getHash($subentry);
          $subentry->href = $this->getLineUrl($subentry);
          $subentry->member = $member;
          $subentry->separator = $this->getSeparator($subentry);
          $result[] = Generator::interpolate('* [`#{member}#{separator}#{name}`](##{hash})', $subentry);
        }
      }
    }

    array_push($result, $closeTag, $closeTag);

    /*------------------------------------------------------------------------*/

    // compile content
    $compiling = false;
    $result[] = $openTag;

    foreach ($api as $entry) {
      // add root entry
      $member = $entry->member . $entry->getName();
      $compiling = $compiling ? ($result[] = $closeTag) : true;

      array_push($result, $openTag, '## `' . $member . '`');

      foreach (array($entry, 'static', 'plugin') as $kind) {
        $subentries = is_string($kind) ? $entry->{$kind} : array($kind);

        // title
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

        // body
        foreach ($subentries as $subentry) {
          // description
          array_push(
            $result,
            $openTag,
            Generator::interpolate("### <a id=\"#{hash}\"></a>`#{member}#{separator}#{call}`\n<a href=\"##{hash}\">#</a> [&#x24C8;](#{href} \"View in source\") [&#x24C9;][1]\n\n#{desc}", $subentry)
          );

          // @param
          if (count($params = $subentry->getParams())) {
            array_push($result, '', '#### Arguments');
            foreach ($params as $index => $param) {
              $result[] = Generator::interpolate('#{num}. `#{name}` (#{type}): #{desc}', array(
                'desc' => $param[2],
                'name' => $param[1],
                'num'  => $index + 1,
                'type' => $param[0]
              ));
            }
          }
          // @returns
          if (count($returns = $subentry->getReturns())) {
            array_push(
              $result, '',
              '#### Returns',
              Generator::interpolate('(#{type}): #{desc}', array('desc' => $returns[1], 'type' => $returns[0]))
            );
          }
          // @example
          if ($example = $subentry->getExample()) {
            array_push($result, '', '#### Example', $example);
          }
          array_push($result, "\n* * *", $closeTag);
        }
      }
    }

    // close tags add TOC link reference
    array_push($result, $closeTag, $closeTag, '', '  [1]: #' . $toc . ' "Jump back to the TOC."');

    // cleanup whitespace
    return trim(preg_replace('/ +\n/', "\n", join($result, "\n")));
  }
}
?>
