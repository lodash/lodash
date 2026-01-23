/**
 * Shared types and interfaces for numeric aggregation functions.
 *
 * These types enforce that aggregation functions like sum, sumBy, mean, meanBy,
 * min, minBy, max, and maxBy only operate on numeric values.
 *
 * @since 4.18.0
 */

/**
 * Extracts keys from type T where the value is a number, undefined, or null.
 * This is used to enforce that property shorthand iteratees only reference
 * numeric properties.
 *
 * @example
 * interface Product { name: string; price: number; quantity: number }
 * type NumericProductKeys = NumericKeys<Product> // 'price' | 'quantity'
 */
export type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number | undefined | null ? K : never
}[keyof T]

/**
 * Extracts keys from type T where the value is a number, undefined, or null.
 * Limited to string keys for use with property shorthand syntax.
 *
 * @example
 * interface Product { name: string; price: number }
 * const key: NumericPropertyShorthand<Product> = 'price' // OK
 * const key2: NumericPropertyShorthand<Product> = 'name' // Error
 */
export type NumericPropertyShorthand<T> = Extract<NumericKeys<T>, string>

/**
 * A function that extracts a numeric value from an element.
 * The function may return undefined or null for values that should be skipped.
 *
 * @template T The type of elements in the array
 *
 * @example
 * const getPrice: NumericIteratee<Product> = (p) => p.price
 */
export type NumericIteratee<T> = (value: T) => number | undefined | null

/**
 * Union type representing all valid iteratee types for numeric aggregation.
 * Can be either a callback function or a property shorthand string.
 *
 * @template T The type of elements in the array
 *
 * @example
 * // Function iteratee
 * const iteratee1: NumericIterateeInput<Product> = (p) => p.price
 *
 * // Property shorthand
 * const iteratee2: NumericIterateeInput<Product> = 'price'
 */
export type NumericIterateeInput<T> =
  | NumericIteratee<T>
  | NumericPropertyShorthand<T>

/**
 * Type for the result of numeric aggregation functions.
 * Always returns number (including NaN for empty/invalid inputs).
 */
export type NumericAggregationResult = number

/**
 * Type for the result of min/max aggregation functions.
 * Returns the element type or undefined for empty arrays.
 *
 * @template T The type of elements in the array
 */
export type ExtremumResult<T> = T | undefined

/**
 * Validates that a property key exists on type T and has a numeric value.
 * Used internally to provide better error messages when non-numeric
 * properties are used.
 *
 * @template T The type of elements in the array
 * @template K The property key to validate
 */
export type ValidateNumericKey<T, K extends keyof T> =
  T[K] extends number | undefined | null ? K : never

/**
 * Type guard signature for validating numeric values at runtime.
 */
export type IsNumericGuard = (value: unknown) => value is number

/**
 * Configuration for aggregation operations.
 * Used internally to configure the behavior of aggregation functions.
 */
export interface AggregationConfig {
  /** Whether to skip undefined/null values (default: true) */
  skipNullish?: boolean
  /** Initial value for reduction operations */
  initialValue?: number
}

/**
 * Helper type to ensure array elements match expected type.
 * Provides better type inference when working with arrays.
 *
 * @template T The expected element type
 */
export type ArrayLike<T> = readonly T[] | T[] | null | undefined

/**
 * Type for property accessor functions created from shorthand strings.
 *
 * @template T The type of the object
 * @template K The property key
 */
export type PropertyAccessor<T, K extends keyof T> = (obj: T) => T[K]
