import * as React from 'react'

import { ContentsArea } from '../Common'
import ComicArea from './ComicArea'

import * as Parser from '../../api/BookListParser'

const Home: React.FunctionComponent = () => {
  const [comics, setComics] = React.useState([])

  React.useEffect(() => {
    if (!comics.length) Parser.fetchBooksJSONPickup(setComics)
  })

  return (
    <React.Fragment>
      <ContentsArea title={'新刊コミックピックアップ'}>
        <ComicArea comics={comics} />
      </ContentsArea>

      <ContentsArea title={'最近発売の新刊'}>
        <ComicArea comics={comics} />
      </ContentsArea>
    </React.Fragment>
  )
}

export default Home
