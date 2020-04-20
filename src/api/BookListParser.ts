const json = require('./booklist_2020_04.json')

const list = json.list

export const comics: comicProps[] = []

export type comicProps = {
    isbn: number,
    author: string,
    title: string,
    maker: string,
    date: string
}

list.map((item: any[]) => {
  const comic: comicProps = {
    isbn: item[3],
    author: item[7],
    title: item[5],
    maker: item[10],
    date: item[20],
  }

  comics.push(comic)
})

