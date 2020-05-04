import * as React from 'react'

import { ContentsArea } from '../Common'
import ComicArea from './ComicArea'

import * as Parser from '../../api/BookListParser'

interface Props {
    comics: Parser.comicData[],
    comicsPickup: Parser.comicData[]
}

const Home: React.FunctionComponent<Props> = props => {

  return (
    <React.Fragment>
      <ContentsArea title={'新刊コミックピックアップ'}>
        <ComicArea comics={props.comicsPickup} />
      </ContentsArea>

      <ContentsArea title={'最近発売の新刊'}>
        <ComicArea comics={props.comicsPickup} />
      </ContentsArea>
    </React.Fragment>
  )
}

export default Home
