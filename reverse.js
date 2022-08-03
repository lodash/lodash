/**
 * @param {any[]} arr
 * @param {number} start?
 * @param {number} end?
 * @return reversed arr
 */
function myReverse(arr, start = 0, end = arr.length - 1) {
  while (start < end) {
    let tmp = arr[start];
    arr[start] = arr[end];
    arr[end] = tmp;
    start++;
    end--;
  }
  return arr;
}
