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

const reachedAtPoint = (position: number) => (): boolean => {
  const elem: Element = document.body
  const crrntWndwY: number = window.scrollY
  const crrntWndwH: number = window.innerHeight
  const crrntElemH: number = elem.scrollHeight

  console.group()
  console.groupEnd()

  // marginTopの値を調整
  if (crrntWndwY + crrntWndwH >= crrntElemH * position) {
    return true
  }

  return false
}

export const reachedAtBottom = reachedAtPoint(1.0)
export const reachedAt80 = reachedAtPoint(0.8)

export const getDate = () => {
  const today = new Date()
  return {
    date: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    data: today,
  }
}

const singledigit = (num: number | string): boolean => {
  if (typeof num === 'number') num = String(num)
  return num.length === 1
}

const add0 = (num: number | string): string => {
  if (typeof num === 'number') num = String(num)
  if (singledigit(num)) return '0' + num
  return num
}

export const getRecentDays = (offset: number, today = ''): string[] => {
  let year: string, month: string, day: string

  if (today) {
    year = today.substring(0, 4)
    month = today.substring(4, 6)
    day = today.substring(6, 8)
  } else {
    const date = getDate()
    year = String(date.year)
    month = add0(date.month)
    day = String(date.date)
  }

  const limit: number = parseInt(day) + offset

  const recentDay = (n: string | number): string => {
    if (typeof n === `number`) n = String(n)
    return year + month + n
  }

  const recentDays = []
  for (let i = parseInt(day); i < limit; i++) {
    const day: string = add0(i)

    recentDays.push(recentDay(day))
  }

  return recentDays
}
