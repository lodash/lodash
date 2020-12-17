function joinWithDifferentSeperators(array, normalSeperator, lastSeperator) {
	var i;
	var result = ""
	for (i = 0; i < array.length; i++) {
		result += array[i];
		if (i < array.length - 2) {
			result += normalSeperator;
		}
		else if (i == array.length - 2) {
			result += lastSeperator;
		}
	}
	return result;
}

export default joinWithDifferentSeperators;