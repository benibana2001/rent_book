import * as Util from '../util'

describe('Util', () => {
  const dummy = {
    isbn: [
      {
        13: '9784480064707',
        10: '4480064702',
      },
      {
        13: '9784047353374',
        10: '404735337X',
      },
    ],

    url: [
      'https://www.amazon.co.jp/dp/4480064702',
      'https://www.amazon.co.jp/dp/404735337X',
    ],
  }

  test('substr', () => {
    expect(Util.substring('9784480064707')).toBe('448006470')
  })

  test('sum', () => {
    expect(Util.sum('448006470')).toBe(207)
  })

  test.each([
    [211, '9'],
    [210, 'X'],
    [209, '0'],
    [208, '1'],
    [207, '2'],
  ])('calcCheckDigit(%i, %s)', (a, expected) => {
    expect(Util.calcCheckDigit(a)).toEqual(expected)
  })

  test('convertISBN13to10', () => {
    expect(Util.convertISBN13to10(dummy.isbn[0][13])).toBe(dummy.isbn[0][10])
    expect(Util.convertISBN13to10(dummy.isbn[1][13])).toBe(dummy.isbn[1][10])
  })

  test('shopUrl', () => {
    expect(Util.shopUrl(dummy.isbn[0][13])).toBe(dummy.url[0])
    expect(Util.shopUrl(dummy.isbn[1][13])).toBe(dummy.url[1])
  })

  test('Util.getRecentDays', () => {
    const count = 3
    const dummy = '20200101'
    const expected = ['20200101', '20200102', '20200103']

    expect(Util.getRecentDays(count, dummy)).toEqual(expected)
  })
})
