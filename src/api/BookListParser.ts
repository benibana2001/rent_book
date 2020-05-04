import imgBackground from '../img/nocover-x2.jpg'

export const comics: comicData[] = []

export type comicData = {
  isbn: number
  author: string
  title: string
  publisher: string
  pubdate: string
  cover: string
}

const HOST = process.env.HOST
const IMAGEPATH = process.env.IMAGE_PATH
const JSONPATH = process.env.JSON_PATH
const JSONFILE = process.env.JSON_FILE
const JSONFILE_PICKUP = process.env.JSON_FILE_PICKUP

const booksJSONurl = HOST + JSONPATH + JSONFILE
const booksJSONPickupUrl = HOST + JSONPATH + JSONFILE_PICKUP

const getImagepath = (data: comicData) => {
  const hostpath = HOST + IMAGEPATH

  if (!data.cover) return imgBackground

  const imagefilename = () => {
    const ary = data.cover.split('/')
    const len = ary.length
    return ary[len - 1]
  }

  return hostpath + imagefilename()
}

export const fetchBooksJSON = fetchBooks(booksJSONurl)

export const fetchBooksJSONPickup = fetchBooks(booksJSONPickupUrl)

export const getRecentBooksJSON = (date: string) => {
    console.log(date)
}

function fetchBooks(url: string) {
  return async (callback: Function) => {
    const booksJSON = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    })

    const json = await booksJSON.json()
    console.log(json)

    // rewrite cover url
    json.forEach((comic: comicData) => {
      comic.cover = getImagepath(comic)
    })

    callback(json)
  }
}
