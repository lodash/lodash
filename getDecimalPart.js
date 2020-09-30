import isEmpty from './isEmpty';
function getDecimalPart(number) {
  let numberString;
  if(typeof number === 'string' && !isEmpty(number) && !isNaN(number))
    numberString = number;
  else if (typeof number === 'number')
    numberString = number.toString();
  else 
    return null;
  if(numberString.includes('.')) {
    const numberSplit = numberString.split('.');
    const decimal = numberSplit[1]||0;
    return parseFloat(`0.${decimal}`);
  }
  return 0;
}

export default getDecimalPart;