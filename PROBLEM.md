## Problem: _.chunk Invalid Size Handling

### Brief
The `_.chunk` function splits an array into groups of a specified size.  
Currently, the function implicitly coerces invalid `size` values such as `0`,
negative numbers, `NaN`, fractional numbers, or non-numeric inputs into
behaviors that return the original array or partial chunks.

This behavior can lead to silent logic errors when invalid input is passed.

### Expected Behavior
When `size` is invalid, `_.chunk` must return an empty array.

A `size` value is considered invalid if it is:
- `0`
- A negative number
- `NaN`
- A non-integer number
- A non-numeric value

### Valid Behavior (unchanged)
- Valid positive integers should behave exactly as before
- Existing chunking behavior must not change
- Existing tests must continue to pass

### Success Criteria
- Invalid `size` values return `[]`
- No existing behavior is broken
- All existing tests pass
- New tests pass only after implementation
