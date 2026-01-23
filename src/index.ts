/**
 * Lodash TypeScript aggregation functions.
 *
 * @module lodash
 */

// Type guard
export { default as isNumeric } from './.internal/isNumeric'

// Aggregation functions
export { default as sum } from './sum'
export { default as sumBy } from './sumBy'
export { default as mean } from './mean'
export { default as meanBy } from './meanBy'
export { default as min } from './min'
export { default as minBy } from './minBy'
export { default as max } from './max'
export { default as maxBy } from './maxBy'

// Types
export type {
  NumericKeys,
  NumericPropertyShorthand,
  NumericIteratee,
  NumericIterateeInput,
  NumericAggregationResult,
  ExtremumResult,
  ValidateNumericKey,
  IsNumericGuard,
  AggregationConfig,
  ArrayLike,
  PropertyAccessor
} from './types/aggregation'
