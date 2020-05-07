import * as React from 'react'
import styled from 'styled-components'

import { ContentsArea } from '../Common/index'

import * as Parser from '../../api/BookListParser'

import * as Util from '../../util'

interface Props {
  comics: Parser.comicData[]
}

const NewBooks: React.FunctionComponent<Props> = (props) => {
  return (
    <ContentsArea title={'今月の新刊コミック'}>
      <Comics comics={props.comics} />
    </ContentsArea>
  )
}

interface PropsComics {
  comics: Parser.comicData[]
}

const Comics: React.FunctionComponent<PropsComics> = (props) => {
  const temp = props.comics

  const comics: Parser.comicData[] = temp.slice(0, 20)

  const comicsSliced = () => {
    const comicsChunk = comics.map((comic: Parser.comicData, index) => (
      <Comic key={index} comic={comic} />
    ))
    return <React.Fragment>{comicsChunk}</React.Fragment>
  }

  return <React.Fragment>{comicsSliced()}</React.Fragment>
}

type PropsComic = {
  comic: Parser.comicData
}

const Comic: React.FunctionComponent<PropsComic> = (props) => {
  const comic = props.comic

  const moveToShop = () => {
    location.href = Util.shopUrl(comic.isbn)
  }

  return (
    <ComicOuter onClick={moveToShop}>
      <ComicCover imageurl={comic.cover} />
      <ComicContext>
        <ContextDate>{comic.pubdate}</ContextDate>
        <ContextTitle>{comic.title}</ContextTitle>
        <ContextAppendix>{comic.publisher}</ContextAppendix>
        <ContextAppendix>{comic.author}</ContextAppendix>
      </ComicContext>
    </ComicOuter>
  )
}

const ComicOuter = styled.div`
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

const ComicCover = styled.div<{ imageurl: string }>`
  width: ${coverSize.w}px;
  height: ${coverSize.h}px;
  background: top url(${(props) => props.imageurl});
  background-size: cover;

  border-radius: 4px 0 0 4px;
`

export default NewBooks
