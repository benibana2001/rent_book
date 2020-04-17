import * as React from 'react'

import { ContentsArea } from '../Common'
import ComicArea from './ComicArea'

const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <ContentsArea title={'新刊コミックピックアップ'}>
        <ComicArea />
      </ContentsArea>

      <ContentsArea title={'図書館で本を予約する'}>
        <LibraryArea />
      </ContentsArea>
    </React.Fragment>
  )
}

const LibraryArea: React.FunctionComponent = () => {
  return <div>Library Search</div>
}

export default Home
