import * as React from 'react'
import styled from 'styled-components'

import { ContentsArea } from '../Common'

import imgBackground from '../../img/comic_sample_01.png'

import { comicProps } from '../../api/BookListParser'

const NewBooks: React.FunctionComponent = () => {
  return (
    <ContentsArea title={'今月の新刊コミック'}>
      <WriteComics />
    </ContentsArea>
  )
}

const WriteComics = () => {
  const [comics, setComics] = React.useState([])

  const booksJSONurl =
    'http://tk2-255-37178.vs.sakura.ne.jp/rent_book_server/json/booklist.json'

  React.useEffect(() => {
    const fetchBooksJSON = async () => {
      const booksJSON = await fetch(booksJSONurl, {
        method: 'GET',
        mode: 'cors',
      })

      const json = await booksJSON.json()
      console.log(json)
      setComics(json)
    }

    if (!comics.length) fetchBooksJSON()
  })

  const chunk = comics.slice(0, 19)

  const isComics = comics.length

  let comicsChunk

  if (isComics) {
    comicsChunk = chunk.map((comic: comicProps, index) => (
      <Comics
        key={index}
        isbn={comic.isbn}
        title={comic.title}
        pubdate={comic.pubdate}
        author={comic.author}
        publisher={comic.publisher}
        cover={comic.cover}
      />
    ))
  }

  return <React.Fragment>{comicsChunk && comicsChunk}</React.Fragment>
}

const Comics: React.FunctionComponent<comicProps> = (props) => {
  const hostpath =
    'http://tk2-255-37178.vs.sakura.ne.jp/rent_book_server/downloadimage/'

  const imagefile = (): string | null => {
    if (!props.cover) return null

    const imagefilename = () => {
      const ary = props.cover.split('/')
      const len = ary.length
      return ary[len - 1]
    }

    return hostpath + imagefilename()
  }

  return (
    <Comic>
      <ComicCover imageurl={imagefile()} />
      {/* <ComicCover imageurl={imgBackground}/> */}
      <ComicContext>
        <ContextDate>{props.pubdate}</ContextDate>
        <ContextTitle>{props.title}</ContextTitle>
        <ContextAppendix>{props.publisher}</ContextAppendix>
        <ContextAppendix>{props.author}</ContextAppendix>
        <ContextAppendix>{props.cover}</ContextAppendix>
      </ComicContext>
    </Comic>
  )
}

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
