import chunk from "./chunk.js";

/**
 * This method is like Chunk except that
 * takes in the number of chunks to return to evenly distribute the items over.
 *
 * @category Array
 * @param {Array} Array to chunk
 * @param {Number} Number of Chunks
 * @returns {Array} Returns array of chunks that are evenly distributed
 * @example
 *
 * _.group([1, 2, 3, 4, 5, 6], 3);
 *
 */
function group(array, amount) {
  return chunk(array, Math.ceil(array.length/amount));
}

export default group;
