<?php

  // cleanup requested file path
  $filePath = isset($_GET['f']) ? $_GET['f'] : 'lodash';
  $filePath = preg_replace('#(\.*[\/])+#', '', $filePath);
  $filePath .= preg_match('/\.[a-z]+$/', $filePath) ? '' : '.js';

  // output filename
  if (isset($_GET['o'])) {
    $outputName = $_GET['o'];
  } else if (isset($_SERVER['argv'][1])) {
    $outputName = $_SERVER['argv'][1];
  } else {
    $outputName = basename($filePath);
  }

  /*--------------------------------------------------------------------------*/

  require('../vendor/docdown/docdown.php');

  // get package version
  $version = json_decode(file_get_contents('../package.json'))->version;

  // generate Markdown
  $markdown = docdown(array(
    'path'  => '../' . $filePath,
    'title' => '<a href="http://lodash.com/">Lo-Dash</a> <span>v' . $version . '</span>',
    'toc'   => 'categories',
    'url'   => 'https://github.com/lodash/lodash/blob/' . $version . '/lodash.js'
  ));

  // save to a `.md` file
  file_put_contents($outputName . '.md', $markdown);

  // print
  header('Content-Type: text/plain;charset=utf-8');
  echo $markdown . PHP_EOL;
?>
