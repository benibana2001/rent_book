import * as React from 'react'
import styled from 'styled-components'

import { ContentsArea } from '../Common'

import imgBackground from '../../img/comic_sample_01.png'

import { comics } from '../../api/BookListParser'
import { comicProps } from '../../api/BookListParser'

const NewBooks: React.FunctionComponent = () => {
  return (
    <ContentsArea title={'今月の新刊コミック'}>
      <WriteComics />
    </ContentsArea>
  )
}

const WriteComics = () => {
  React.useEffect(() => {
    const fetchBooksJSON = async () => {
      const booksJSONurl =
        'http://tk2-255-37178.vs.sakura.ne.jp/rent_book_server/json/booklist.json'
      const booksJSON = await fetch(booksJSONurl, {
        method: 'GET',
        mode: 'cors',
      })
      console.log(await booksJSON.json())
    }

    fetchBooksJSON()
  })
  const chunk = comics.slice(0, 19)
  const comicsChunk = chunk.map((comic: comicProps, index) => (
    <Comics
      key={index}
      isbn={comic.isbn}
      title={comic.title}
      date={comic.date}
      author={comic.author}
      maker={comic.maker}
    />
  ))
  return <React.Fragment>{comicsChunk}</React.Fragment>
}

const Comics: React.FunctionComponent<comicProps> = (props) => (
  <Comic>
    <ComicCover
      imageurl={
        'http://tk2-255-37178.vs.sakura.ne.jp/rent_book_server/downloadimage/9784040645070.jpg'
      }
    />
    {/* <ComicCover imageurl={imgBackground}/> */}
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

const ComicCover = styled.div<{ imageurl: string }>`
  width: ${coverSize.w}px;
  height: ${coverSize.h}px;
  background: top url(${(props) => props.imageurl});
  /* background: top url(${imgBackground}); */
  background-size: cover;

  border-radius: 4px 0 0 4px;
`

export default NewBooks
