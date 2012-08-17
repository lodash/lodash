<?php

/**
 * A class to simplify parsing a single JSDoc entry.
 */
class Entry {

  /**
   * The documentation entry.
   *
   * @memberOf Entry
   * @type String
   */
  public $entry = '';

  /**
   * The language highlighter used for code examples.
   *
   * @memberOf Entry
   * @type String
   */
  public $lang = '';

  /**
   * The source code.
   *
   * @memberOf Entry
   * @type String
   */
  public $source = '';

  /*--------------------------------------------------------------------------*/

  /**
   * The Entry constructor.
   *
   * @constructor
   * @param {String} $entry The documentation entry to analyse.
   * @param {String} $source The source code.
   * @param {String} $lang The language highlighter used for code examples.
   */
  public function __construct( $entry, $source, $lang = 'js' ) {
    $this->entry = $entry;
    $this->lang = $lang;
    $this->source = str_replace(PHP_EOL, "\n", $source);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Extracts the documentation entries from source code.
   *
   * @static
   * @memberOf Entry
   * @param {String} $source The source code.
   * @returns {Array} The array of entries.
   */
  public static function getEntries( $source ) {
    preg_match_all('#/\*\*(?![-!])[\s\S]*?\*/\s*[^\n]+#', $source, $result);
    return array_pop($result);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if the entry is a function reference.
   *
   * @private
   * @memberOf Entry
   * @returns {Boolean} Returns `true` if the entry is a function reference, else `false`.
   */
  private function isFunction() {
    return !!(
      $this->isCtor() ||
      count($this->getParams()) ||
      count($this->getReturns()) ||
      preg_match('/\*\s*@function\b/', $this->entry)
    );
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Extracts the function call from the entry.
   *
   * @memberOf Entry
   * @returns {String} The function call.
   */
  public function getCall() {
    preg_match('#\*/\s*(?:function ([^(]*)|(.*?)(?=[:=,]|return\b))#', $this->entry, $result);
    if ($result = array_pop($result)) {
      $result = array_pop(explode('var ', trim(trim(array_pop(explode('.', $result))), "'")));
    }
    // resolve name
    // avoid $this->getName() because it calls $this->getCall()
    preg_match('#\*\s*@name\s+([^\n]+)#', $this->entry, $name);
    if (count($name)) {
      $name = trim($name[1]);
    } else {
      $name = $result;
    }
    // compile function call syntax
    if ($this->isFunction()) {
      // compose parts
      $result = array($result);
      $params = $this->getParams();
      foreach ($params as $param) {
        $result[] = $param[1];
      }
      // format
      $result = $name .'('. implode(array_slice($result, 1), ', ') .')';
      $result = str_replace(', [', ' [, ', str_replace('], [', ', ', $result));
    }
    return $result ? $result : $name;
  }

  /**
   * Extracts the entry description.
   *
   * @memberOf Entry
   * @returns {String} The entry description.
   */
  public function getDesc() {
    preg_match('#/\*\*(?:\s*\*)?([\s\S]*?)(?=\*\s\@[a-z]|\*/)#', $this->entry, $result);
    if (count($result)) {
      $type = $this->getType();
      $result = trim(preg_replace('/(?:^|\n)\s*\* ?/', ' ', $result[1]));
      $result = ($type == 'Function' ? '' : '(' . str_replace('|', ', ', trim($type, '{}')) . '): ') . $result;
    }
    return $result;
  }

  /**
   * Extracts the entry `example` data.
   *
   * @memberOf Entry
   * @returns {String} The entry `example` data.
   */
  public function getExample() {
    preg_match('#\*\s*@example\s+([\s\S]*?)(?=\*\s\@[a-z]|\*/)#', $this->entry, $result);
    if (count($result)) {
      $result = trim(preg_replace('/(?:^|\n)\s*\* ?/', "\n", $result[1]));
      $result = '```' . $this->lang . "\n" . $result . "\n```";
    }
    return $result;
  }

  /**
   * Resolves the line number of the entry.
   *
   * @memberOf Entry
   * @returns {Number} The line number.
   */
  public function getLineNumber() {
    preg_match_all('/\n/', substr($this->source, 0, strrpos($this->source, $this->entry) + strlen($this->entry)), $lines);
    return count(array_pop($lines)) + 1;
  }

  /**
   * Extracts the entry `member` data.
   *
   * @memberOf Entry
   * @param {Number} $index The index of the array value to return.
   * @returns {Array|String} The entry `member` data.
   */
  public function getMembers( $index = null ) {
    preg_match('#\*\s*@member(?:Of)?\s+([^\n]+)#', $this->entry, $result);
    if (count($result)) {
      $result = trim(preg_replace('/(?:^|\n)\s*\* ?/', ' ', $result[1]));
      $result = preg_split('/,\s*/', $result);
    }
    return $index !== null ? @$result[$index] : $result;
  }

  /**
   * Extracts the entry `name` data.
   *
   * @memberOf Entry
   * @returns {String} The entry `name` data.
   */
  public function getName() {
    preg_match('#\*\s*@name\s+([^\n]+)#', $this->entry, $result);
    if (count($result)) {
      $result = trim(preg_replace('/(?:^|\n)\s*\* ?/', ' ', $result[1]));
    } else {
      $result = array_shift(explode('(', $this->getCall()));
    }
    return $result;
  }

  /**
   * Extracts the entry `param` data.
   *
   * @memberOf Entry
   * @param {Number} $index The index of the array value to return.
   * @returns {Array} The entry `param` data.
   */
  public function getParams( $index = null ) {
    preg_match_all('#\*\s*@param\s+\{([^}]+)\}\s+(\[.+\]|[$\w]+)\s+([\s\S]*?)(?=\*\s\@[a-z]|\*/)#i', $this->entry, $result);
    if (count($result = array_filter(array_slice($result, 1)))) {
      // repurpose array
      foreach ($result as $param) {
        foreach ($param as $key => $value) {
          if (!is_array($result[0][$key])) {
            $result[0][$key] = array();
          }
          $result[0][$key][] = trim(preg_replace('/(?:^|\n)\s*\* ?/', ' ', $value));
        }
      }
      $result = $result[0];
    }
    return $index !== null ? @$result[$index] : $result;
  }

  /**
   * Extracts the entry `returns` data.
   *
   * @memberOf Entry
   * @returns {String} The entry `returns` data.
   */
  public function getReturns() {
    preg_match('#\*\s*@returns\s+\{([^}]+)\}\s+([\s\S]*?)(?=\*\s\@[a-z]|\*/)#', $this->entry, $result);
    if (count($result)) {
      $result = array_map('trim', array_slice($result, 1));
      $result[0] = str_replace('|', ', ', $result[0]);
      $result[1] = preg_replace('/(?:^|\n)\s*\* ?/', ' ', $result[1]);
    }
    return $result;
  }

  /**
   * Extracts the entry `type` data.
   *
   * @memberOf Entry
   * @returns {String} The entry `type` data.
   */
  public function getType() {
    preg_match('#\*\s*@type\s+([^\n]+)#', $this->entry, $result);
    if (count($result)) {
      $result = trim(preg_replace('/(?:^|\n)\s*\* ?/', ' ', $result[1]));
    } else {
      $result = $this->isFunction() ? 'Function' : 'Unknown';
    }
    return $result;
  }

  /**
   * Checks if an entry is a constructor.
   *
   * @memberOf Entry
   * @returns {Boolean} Returns true if a constructor, else false.
   */
  public function isCtor() {
    return !!preg_match('/\*\s*@constructor\b/', $this->entry);
  }

  /**
   * Checks if an entry *is* assigned to a prototype.
   *
   * @memberOf Entry
   * @returns {Boolean} Returns true if assigned to a prototype, else false.
   */
  public function isPlugin() {
    return !$this->isCtor() && !$this->isPrivate() && !$this->isStatic();
  }

  /**
   * Checks if an entry is private.
   *
   * @memberOf Entry
   * @returns {Boolean} Returns true if private, else false.
   */
  public function isPrivate() {
    return !!preg_match('/\*\s*@private\b/', $this->entry) || strrpos($this->entry, '@') === false;
  }

  /**
   * Checks if an entry is *not* assigned to a prototype.
   *
   * @memberOf Entry
   * @returns {Boolean} Returns true if not assigned to a prototype, else false.
   */
  public function isStatic() {
    $public = !$this->isPrivate();
    $result = $public && !!preg_match('/\*\s*@static\b/', $this->entry);

    // set in cases where it isn't explicitly stated
    if ($public && !$result) {
      if ($parent = array_pop(preg_split('/[#.]/', $this->getMembers(0)))) {
        foreach (Entry::getEntries($this->source) as $entry) {
          $entry = new Entry($entry, $this->source);
          if ($entry->getName() == $parent) {
            $result = !$entry->isCtor();
            break;
          }
        }
      } else {
        $result = true;
      }
    }
    return $result;
  }
}
?>