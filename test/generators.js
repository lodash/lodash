$(document).ready(function() {

  module("Generator functions (range...)");

  test("generators: range", function() {
    equals(_.range(0).join(''), '', 'range with 0 as a first argument generates an empty array');
    equals(_.range(4).join(' '), '0 1 2 3', 'range with a single positive argument generates an array of elements 0,1,2,...,n-1');
    equals(_.range(5, 8).join(' '), '5 6 7', 'range with two arguments a & b, a<b generates an array of elements a,a+1,a+2,...,b-2,b-1');
    equals(_.range(8, 5).join(''), '', 'range with two arguments a & b, b<a generates an empty array');
    equals(_.range(3, 10, 3).join(' '), '3 6 9', 'range with three arguments a & b & c, c < b-a, a < b generates an array of elements a,a+c,a+2c,...,b - (multiplier of a) < c');
    equals(_.range(3, 10, 15).join(''), '3', 'range with three arguments a & b & c, c > b-a, a < b generates an array with a single element, equal to a');
    equals(_.range(12, 7, -2).join(' '), '12 10 8', 'range with three arguments a & b & c, a > b, c < 0 generates an array of elements a,a-c,a-2c and ends with the number not less than b');
  });
});

