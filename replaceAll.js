import replace from './replace';

function replaceAll(text, pattern, replacement) {
  return replace(text,new RegExp(pattern,'g'), replacement);
}

export default replaceAll;