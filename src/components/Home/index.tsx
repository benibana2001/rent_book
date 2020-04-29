import * as React from 'react'

import { ContentsArea } from '../Common'
import ComicArea from './ComicArea'

import comicList from './comiclist'

const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <ContentsArea title={'新刊コミックピックアップ'}>
        <ComicArea comics={comicList} />
      </ContentsArea>

      <ContentsArea title={'最近発売の新刊'}>
        <ComicArea comics={comicList} />
      </ContentsArea>
    </React.Fragment>
  )
}

export default Home
