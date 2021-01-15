import { type } from "jquery";

function gcd(a, b) {
  if(typeof a !== 'number')
    return undefined;
  if(typeof b !== 'number')
    return undefined;
  return b < 0.0000001? a: this.gcd(b, Math.floor(a % b));
}

export default gcd;