import * as React from 'react'

import { ContentsArea } from '../Common'
import ComicArea from './ComicArea'

import * as Parser from '../../api/BookListParser'
import * as Util from '../../util'

interface Props {
  comics: Parser.comicData[]
  comicsPickup: Parser.comicData[]
}

const Home: React.FunctionComponent<Props> = (props) => {
  const [recentComics, setRecentComics] = React.useState([])

  const parse = () => {
    if (props.comics.length) {
      console.log('comics arimasu')
      const recentBookPubdate = Util.getRecentDays(5)

      const recentBooks: Parser.comicData[] = []

      props.comics.forEach((comic: Parser.comicData) => {
        for (let i = 0; i < recentBookPubdate.length; i++) {
          if (String(comic.pubdate) === recentBookPubdate[i]) {
            recentBooks.push(comic)
            return
          }
        }
      })
      console.log(recentBooks)
      return recentBooks
    }
  }

  const parsedItems = (() => {
    if (props.comics.length) {
      return parse()
    }
  })()

  return (
    <React.Fragment>
      <ContentsArea title={'新刊コミックピックアップ'}>
        <ComicArea comics={props.comicsPickup} />
      </ContentsArea>

      {parsedItems && (
        <ContentsArea title={'最近発売の新刊'}>
          <ComicArea comics={parsedItems} />
        </ContentsArea>
      )}
    </React.Fragment>
  )
}

export default Home
