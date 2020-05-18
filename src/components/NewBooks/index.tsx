import * as React from 'react'
import styled from 'styled-components'

import { ContentsArea } from '../Common/index'
import Observer from './Observer'

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
  const stack = props.comics

  // 読み込み済みのチャンクを保持するState
  const [chunks, setChunks] = React.useState([])
  const chunkSize = 40

  // 監視対象のrefを保持
  const options = {
    root: document.querySelector('#root'),
    rootMargin: '0px',
    threshold: 1.0,
  }

  const observeCallback: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry) => {
      const intersecting = entry.intersectionRatio !== 0
      if (intersecting && loadingObserver.existRef()) consumeStack()
    })
  }

  const loadingObserver = new Observer(options, observeCallback)

  React.useEffect(consumeStack, [props.comics])
  React.useEffect(observeStart, [chunks])

  const comicsChunk = chunks.map((comic: Parser.comicData, index) => {
    const last = index === chunks.length - 1

    let ref: React.RefObject<HTMLDivElement> = null
    if (last) ref = loadingObserver.createRef()

    return (
      <div key={index} ref={ref}>
        <Comic comic={comic} />
      </div>
    )
  })

  // イベントハンドラ: 新たなデータチャンクを読み込み、Stateにセットする
  function consumeStack() {
    setChunks([
      ...chunks,
      ...stack.slice(chunks.length, chunks.length + chunkSize),
    ])
    console.log(`stackSize, chunksSize: ${stack.length}, ${chunks.length}`)
  }

  function observeStart() {
    if (!loadingObserver.existRef()) return

    const remainingStack = chunks.length < stack.length
    loadingObserver.start()
    // 描画の情報がない場合は、監視を停止
    if (!remainingStack) loadingObserver.stop()
  }

  return <React.Fragment>{comicsChunk}</React.Fragment>
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
