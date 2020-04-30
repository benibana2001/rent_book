import * as Util from '../util'

describe('Util', () => {
  test('substr', () => {
    expect(Util.substring('9784480064707')).toBe('448006470')
  })

  test('sum', () => {
    expect(Util.sum('448006470')).toBe(207)
  })

  test('calcCheckDigit', () => {
    expect(Util.calcCheckDigit(211)).toBe('9')
    expect(Util.calcCheckDigit(210)).toBe('X')
    expect(Util.calcCheckDigit(209)).toBe('0')
    expect(Util.calcCheckDigit(208)).toBe('1')
    expect(Util.calcCheckDigit(207)).toBe('2')
    expect(Util.calcCheckDigit(206)).toBe('3')
  })

  test('convertISBN13to10', () => {
    expect(Util.convertISBN13to10('9784480064707')).toBe('4480064702')
    expect(Util.convertISBN13to10('9784047353374')).toBe('404735337X')
  })
})
