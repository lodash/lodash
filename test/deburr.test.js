import assert from 'assert'
import lodashStable from 'lodash'
import { burredLetters, deburredLetters, comboMarks } from './utils.js'
import deburr from '../deburr.js'

describe('deburr', () => {
  it('should convert Latin Unicode letters to basic Latin', () => {
    const actual = lodashStable.map(burredLetters, deburr)
    assert.deepStrictEqual(actual, deburredLetters)
  })

  it('should not deburr Latin mathematical operators', () => {
    let operators = ['\xd7', '\xf7'],
      actual = lodashStable.map(operators, deburr)

    assert.deepStrictEqual(actual, operators)
  })

  it('should deburr combining diacritical marks', () => {
    const expected = lodashStable.map(comboMarks, lodashStable.constant('ei'))

    const actual = lodashStable.map(comboMarks, (chr) => deburr(`e${chr}i`))

    assert.deepStrictEqual(actual, expected)
  })
})
