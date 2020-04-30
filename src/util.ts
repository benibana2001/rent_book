export const convertISBN13to10 = (isbn13: string): string => {
  const temp = substring(isbn13)
  const checkDigit = calcCheckDigit(sum(temp))
  const isbn10 = temp + checkDigit

  return isbn10
}

export const calcCheckDigit = (sumNum: number): string => {
  const divideNum = 11
  const digit = divideNum - (sumNum % divideNum)

  if (digit === 10) return 'X'
  if (digit === 11) return '0'
  return String(digit)
}

export const substring = (isbn13: string): string => {
  const start = 3
  const end = isbn13.length - 1
  return isbn13.substring(start, end)
}

export const sum = (isbn13: string): number => {
  let result = 0

  for (let i = 0; i < isbn13.length; i++) {
    const num: number = parseInt(isbn13[i])
    const multi = 10 - i
    const calc = num * multi

    result += calc
  }

  return result
}

export const shopUrl = (isbn13: number | string): string => {
  if (typeof isbn13 === 'number') isbn13 = String(isbn13)
  const HOST = 'https://www.amazon.co.jp/dp/'
  const isbn10 = convertISBN13to10(isbn13)

  return HOST + isbn10
}
