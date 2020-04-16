import * as React from 'react'
import styled from 'styled-components'

import ComicArea from './ComicArea'

const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <ContentsArea
        title={'新刊コミックピックアップ'}
        component={<ComicArea />}
      />

      <ContentsArea
        title={'図書館で本を予約する'}
        component={<LibraryArea />}
      />
    </React.Fragment>
  )
}

const LibraryArea: React.FunctionComponent = () => {
  return <div>Library Search</div>
}

interface PropsContentsArea {
  component: React.ReactElement
  title: string
}

const ContentsArea: React.FunctionComponent<PropsContentsArea> = (
  props: PropsContentsArea
) => {
  return (
    <React.Fragment>
      <ContentsTitle>{props.title}</ContentsTitle>
      {props.component}
    </React.Fragment>
  )
}

const margin = {
  middle: 16,
  small: 10,
}

const ContentsTitle = styled.h3`
  font-size: 12px;
  margin-left: ${margin.middle}px;
  padding: ${margin.middle}px;
  padding-left: 0;
  padding-right: 0;
`
export default Home
