import * as React from 'react'
import styled from 'styled-components'

import { ContentsArea } from '../Common'

import imgBackground from '../../img/comic_sample_01.png'

import { comics } from '../../api/BookListParser'
import { comicProps } from '../../api/BookListParser'

const NewBooks: React.FunctionComponent = () => {
  return (
    <ContentsArea title={'今月の新刊コミック'}>{WriteComics()}</ContentsArea>
  )
}

const WriteComics = () =>
  comics.map((comic: comicProps, index) => (
    <Comics
      key={index}
      isbn={comic.isbn}
      title={comic.title}
      date={comic.date}
      author={comic.author}
      maker={comic.maker}
    />
  ))

const Comics: React.FunctionComponent<comicProps> = (props) => (
  <Comic>
    <ComicCover />
    <ComicContext>
      <ContextDate>{props.date}</ContextDate>
      <ContextTitle>{props.title}</ContextTitle>
      <ContextAppendix>{props.maker}</ContextAppendix>
      <ContextAppendix>{props.author}</ContextAppendix>
    </ComicContext>
  </Comic>
)

const Comic = styled.div`
  width: calc(100% - 32px);
  height: 110px;
  background: #ffffff;
  border-radius: 4px;

  display: flex;

  margin-left: 16px;
  margin-bottom: 10px;
`

const coverSize = { w: 89, h: 110 }

const ComicContext = styled.div`
  margin-left: 10px;
  margin-top: 10px;
`

const ContextDate = styled.p`
  color: #ee9cc3;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 0px;
`

const ContextTitle = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
`

const ContextAppendix = styled.p`
  font-size: 10px;
  line-height: 14px;
  color: #6f6f6f;

  margin-bottom: 1px;
`

const ComicCover = styled.div`
  width: ${coverSize.w}px;
  height: ${coverSize.h}px;
  background: top url(${imgBackground});
  background-size: cover;

  border-radius: 4px 0 0 4px;
`

export default NewBooks
