/** Used to match wrap detail comments. */
const reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/;
const reSplitDetails = /,? & /;

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  const match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

export default getWrapDetails;
