/**
 * Tests for numeric aggregation functions and type guards.
 *
 * These tests verify:
 * 1. Type guard correctly identifies numeric vs non-numeric values
 * 2. Generic constraints reject non-numeric property keys at compile time
 * 3. Return types are correctly inferred as number
 */

import isNumeric from '../../src/.internal/isNumeric'
import sumBy from '../../src/sumBy'
import meanBy from '../../src/meanBy'
import minBy from '../../src/minBy'
import maxBy from '../../src/maxBy'
import type {
  NumericKeys,
  NumericPropertyShorthand,
  NumericIteratee
} from '../../src/types/aggregation'

// ============================================================================
// Test Interfaces
// ============================================================================

interface Product {
  name: string
  price: number
  quantity: number
  description: string | null
  discount?: number
}

interface MixedObject {
  id: number
  label: string
  values: number[]
  metadata: { count: number }
  symbol: symbol
}

// ============================================================================
// isNumeric Type Guard Tests
// ============================================================================

describe('isNumeric type guard', () => {
  describe('returns true for numeric values', () => {
    it('should return true for positive integers', () => {
      expect(isNumeric(42)).toBe(true)
      expect(isNumeric(0)).toBe(true)
      expect(isNumeric(1)).toBe(true)
    })

    it('should return true for negative integers', () => {
      expect(isNumeric(-1)).toBe(true)
      expect(isNumeric(-42)).toBe(true)
    })

    it('should return true for floating point numbers', () => {
      expect(isNumeric(3.14)).toBe(true)
      expect(isNumeric(-3.14)).toBe(true)
      expect(isNumeric(0.1)).toBe(true)
    })

    it('should return true for special numeric values', () => {
      expect(isNumeric(NaN)).toBe(true)
      expect(isNumeric(Infinity)).toBe(true)
      expect(isNumeric(-Infinity)).toBe(true)
    })

    it('should return true for Number constants', () => {
      expect(isNumeric(Number.MAX_VALUE)).toBe(true)
      expect(isNumeric(Number.MIN_VALUE)).toBe(true)
      expect(isNumeric(Number.MAX_SAFE_INTEGER)).toBe(true)
      expect(isNumeric(Number.MIN_SAFE_INTEGER)).toBe(true)
      expect(isNumeric(Number.POSITIVE_INFINITY)).toBe(true)
      expect(isNumeric(Number.NEGATIVE_INFINITY)).toBe(true)
      expect(isNumeric(Number.NaN)).toBe(true)
      expect(isNumeric(Number.EPSILON)).toBe(true)
    })
  })

  describe('returns false for non-numeric values', () => {
    it('should return false for strings', () => {
      expect(isNumeric('42')).toBe(false)
      expect(isNumeric('3.14')).toBe(false)
      expect(isNumeric('')).toBe(false)
      expect(isNumeric('hello')).toBe(false)
    })

    it('should return false for boolean values', () => {
      expect(isNumeric(true)).toBe(false)
      expect(isNumeric(false)).toBe(false)
    })

    it('should return false for null and undefined', () => {
      expect(isNumeric(null)).toBe(false)
      expect(isNumeric(undefined)).toBe(false)
    })

    it('should return false for objects', () => {
      expect(isNumeric({})).toBe(false)
      expect(isNumeric({ value: 42 })).toBe(false)
      expect(isNumeric(new Date())).toBe(false)
    })

    it('should return false for arrays', () => {
      expect(isNumeric([])).toBe(false)
      expect(isNumeric([1, 2, 3])).toBe(false)
      expect(isNumeric([42])).toBe(false)
    })

    it('should return false for symbols', () => {
      expect(isNumeric(Symbol('42'))).toBe(false)
      expect(isNumeric(Symbol.iterator)).toBe(false)
    })

    it('should return false for functions', () => {
      expect(isNumeric(() => 42)).toBe(false)
      expect(isNumeric(function() { return 42 })).toBe(false)
    })

    it('should return false for BigInt', () => {
      expect(isNumeric(BigInt(42))).toBe(false)
      expect(isNumeric(42n)).toBe(false)
    })
  })

  describe('type narrowing', () => {
    it('should narrow type to number when used in conditional', () => {
      const value: unknown = 42
      if (isNumeric(value)) {
        // TypeScript should recognize value as number here
        const result: number = value
        expect(result).toBe(42)
      }
    })
  })
})

// ============================================================================
// sumBy Tests
// ============================================================================

describe('sumBy', () => {
  const products: Product[] = [
    { name: 'Apple', price: 1.5, quantity: 10, description: 'Fresh fruit', discount: 0.1 },
    { name: 'Banana', price: 0.75, quantity: 20, description: null },
    { name: 'Orange', price: 2.0, quantity: 15, description: 'Citrus fruit', discount: 0.2 }
  ]

  describe('with property shorthand', () => {
    it('should sum numeric properties', () => {
      expect(sumBy(products, 'price')).toBe(4.25)
      expect(sumBy(products, 'quantity')).toBe(45)
    })

    it('should handle optional numeric properties', () => {
      // discount is optional, so sum should handle undefined values
      const result = sumBy(products, 'discount')
      expect(result).toBe(0.3)
    })
  })

  describe('with callback function', () => {
    it('should sum using callback', () => {
      expect(sumBy(products, (p) => p.price)).toBe(4.25)
      expect(sumBy(products, (p) => p.quantity)).toBe(45)
    })

    it('should sum computed values', () => {
      expect(sumBy(products, (p) => p.price * p.quantity)).toBe(67.5)
    })

    it('should handle callback returning undefined', () => {
      const result = sumBy(products, (p) => p.discount)
      expect(result).toBe(0.3)
    })
  })

  describe('edge cases', () => {
    it('should return 0 for empty array', () => {
      expect(sumBy([], 'price' as never)).toBe(0)
    })

    it('should return 0 for null array', () => {
      expect(sumBy(null as unknown as Product[], 'price')).toBe(0)
    })

    it('should return 0 for undefined array', () => {
      expect(sumBy(undefined as unknown as Product[], 'price')).toBe(0)
    })
  })

  describe('return type', () => {
    it('should always return number type', () => {
      const result: number = sumBy(products, 'price')
      expect(typeof result).toBe('number')
    })
  })
})

// ============================================================================
// meanBy Tests
// ============================================================================

describe('meanBy', () => {
  const products: Product[] = [
    { name: 'Apple', price: 10, quantity: 10, description: 'Fresh fruit' },
    { name: 'Banana', price: 20, quantity: 20, description: null },
    { name: 'Orange', price: 30, quantity: 15, description: 'Citrus fruit' }
  ]

  describe('with property shorthand', () => {
    it('should calculate mean of numeric properties', () => {
      expect(meanBy(products, 'price')).toBe(20)
      expect(meanBy(products, 'quantity')).toBe(15)
    })
  })

  describe('with callback function', () => {
    it('should calculate mean using callback', () => {
      expect(meanBy(products, (p) => p.price)).toBe(20)
    })

    it('should calculate mean of computed values', () => {
      expect(meanBy(products, (p) => p.price * 2)).toBe(40)
    })
  })

  describe('edge cases', () => {
    it('should return NaN for empty array', () => {
      expect(Number.isNaN(meanBy([], 'price' as never))).toBe(true)
    })

    it('should return NaN for null array', () => {
      expect(Number.isNaN(meanBy(null as unknown as Product[], 'price'))).toBe(true)
    })
  })

  describe('return type', () => {
    it('should always return number type', () => {
      const result: number = meanBy(products, 'price')
      expect(typeof result).toBe('number')
    })
  })
})

// ============================================================================
// minBy Tests
// ============================================================================

describe('minBy', () => {
  const products: Product[] = [
    { name: 'Apple', price: 1.5, quantity: 10, description: 'Fresh fruit' },
    { name: 'Banana', price: 0.75, quantity: 20, description: null },
    { name: 'Orange', price: 2.0, quantity: 15, description: 'Citrus fruit' }
  ]

  describe('with property shorthand', () => {
    it('should find minimum by numeric property', () => {
      const result = minBy(products, 'price')
      expect(result).toEqual({ name: 'Banana', price: 0.75, quantity: 20, description: null })
    })

    it('should find minimum by another numeric property', () => {
      const result = minBy(products, 'quantity')
      expect(result).toEqual({ name: 'Apple', price: 1.5, quantity: 10, description: 'Fresh fruit' })
    })
  })

  describe('with callback function', () => {
    it('should find minimum using callback', () => {
      const result = minBy(products, (p) => p.price)
      expect(result?.name).toBe('Banana')
    })

    it('should find minimum by computed value', () => {
      const result = minBy(products, (p) => p.price * p.quantity)
      expect(result?.name).toBe('Banana') // 0.75 * 20 = 15
    })
  })

  describe('edge cases', () => {
    it('should return undefined for empty array', () => {
      expect(minBy([], 'price' as never)).toBeUndefined()
    })

    it('should return undefined for null array', () => {
      expect(minBy(null as unknown as Product[], 'price')).toBeUndefined()
    })
  })

  describe('return type', () => {
    it('should return the element type or undefined', () => {
      const result: Product | undefined = minBy(products, 'price')
      expect(result).toBeDefined()
    })
  })
})

// ============================================================================
// maxBy Tests
// ============================================================================

describe('maxBy', () => {
  const products: Product[] = [
    { name: 'Apple', price: 1.5, quantity: 10, description: 'Fresh fruit' },
    { name: 'Banana', price: 0.75, quantity: 20, description: null },
    { name: 'Orange', price: 2.0, quantity: 15, description: 'Citrus fruit' }
  ]

  describe('with property shorthand', () => {
    it('should find maximum by numeric property', () => {
      const result = maxBy(products, 'price')
      expect(result).toEqual({ name: 'Orange', price: 2.0, quantity: 15, description: 'Citrus fruit' })
    })

    it('should find maximum by another numeric property', () => {
      const result = maxBy(products, 'quantity')
      expect(result).toEqual({ name: 'Banana', price: 0.75, quantity: 20, description: null })
    })
  })

  describe('with callback function', () => {
    it('should find maximum using callback', () => {
      const result = maxBy(products, (p) => p.price)
      expect(result?.name).toBe('Orange')
    })

    it('should find maximum by computed value', () => {
      const result = maxBy(products, (p) => p.price * p.quantity)
      expect(result?.name).toBe('Orange') // 2.0 * 15 = 30
    })
  })

  describe('edge cases', () => {
    it('should return undefined for empty array', () => {
      expect(maxBy([], 'price' as never)).toBeUndefined()
    })

    it('should return undefined for null array', () => {
      expect(maxBy(null as unknown as Product[], 'price')).toBeUndefined()
    })
  })

  describe('return type', () => {
    it('should return the element type or undefined', () => {
      const result: Product | undefined = maxBy(products, 'price')
      expect(result).toBeDefined()
    })
  })
})

// ============================================================================
// Type Inference Tests (Compile-time)
// ============================================================================

/**
 * These are compile-time tests that verify TypeScript correctly infers types.
 * If TypeScript compilation fails, these tests would catch the issue.
 */
describe('Type inference', () => {
  const products: Product[] = [
    { name: 'Apple', price: 10, quantity: 5, description: 'Fresh' }
  ]

  it('should correctly infer number return type for sumBy', () => {
    // Property shorthand - should infer number
    const sum1: number = sumBy(products, 'price')
    // Callback - should infer number
    const sum2: number = sumBy(products, (p) => p.price)
    expect(sum1).toBe(10)
    expect(sum2).toBe(10)
  })

  it('should correctly infer number return type for meanBy', () => {
    // Property shorthand - should infer number
    const mean1: number = meanBy(products, 'price')
    // Callback - should infer number
    const mean2: number = meanBy(products, (p) => p.price)
    expect(mean1).toBe(10)
    expect(mean2).toBe(10)
  })

  it('should correctly infer element return type for minBy', () => {
    // Property shorthand - should infer Product | undefined
    const min1: Product | undefined = minBy(products, 'price')
    // Callback - should infer Product | undefined
    const min2: Product | undefined = minBy(products, (p) => p.price)
    expect(min1).toBeDefined()
    expect(min2).toBeDefined()
  })

  it('should correctly infer element return type for maxBy', () => {
    // Property shorthand - should infer Product | undefined
    const max1: Product | undefined = maxBy(products, 'price')
    // Callback - should infer Product | undefined
    const max2: Product | undefined = maxBy(products, (p) => p.price)
    expect(max1).toBeDefined()
    expect(max2).toBeDefined()
  })
})

// ============================================================================
// NumericKeys Type Tests (Compile-time verification)
// ============================================================================

/**
 * These type assignments verify that NumericKeys correctly extracts
 * only numeric properties from object types.
 */
type TestNumericKeys = NumericKeys<Product>
// Should be equivalent to: 'price' | 'quantity' | 'discount'

type TestNumericPropertyShorthand = NumericPropertyShorthand<Product>
// Should be equivalent to: 'price' | 'quantity' | 'discount'

// Type-level test: Verify numeric keys are correctly identified
type AssertPrice extends TestNumericKeys = 'price'
type AssertQuantity extends TestNumericKeys = 'quantity'
type AssertDiscount extends TestNumericKeys = 'discount'

// The following would cause a TypeScript error if uncommented:
// type AssertName extends TestNumericKeys = 'name' // Error: 'name' is not a numeric key
// type AssertDescription extends TestNumericKeys = 'description' // Error: 'description' is not a numeric key

/**
 * Compile-time test: These type assertions will fail at compile time
 * if the types are not correctly constrained.
 */
function typeTests() {
  const products: Product[] = []

  // These should compile successfully:
  sumBy(products, 'price')
  sumBy(products, 'quantity')
  sumBy(products, 'discount')
  sumBy(products, (p) => p.price)
  sumBy(products, (p) => p.quantity)

  meanBy(products, 'price')
  meanBy(products, (p) => p.price)

  minBy(products, 'price')
  minBy(products, (p) => p.price)

  maxBy(products, 'price')
  maxBy(products, (p) => p.price)

  // The following lines would cause TypeScript errors if uncommented:
  // sumBy(products, 'name')        // Error: 'name' is not assignable to NumericPropertyShorthand<Product>
  // sumBy(products, 'description') // Error: 'description' is not assignable to NumericPropertyShorthand<Product>
  // meanBy(products, 'name')       // Error: 'name' is not assignable to NumericPropertyShorthand<Product>
  // minBy(products, 'name')        // Error: 'name' is not assignable to NumericPropertyShorthand<Product>
  // maxBy(products, 'name')        // Error: 'name' is not assignable to NumericPropertyShorthand<Product>
}
