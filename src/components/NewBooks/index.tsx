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

const LazyLoadClassName = 'lazy-load'

const Comics: React.FunctionComponent<PropsComics> = (props) => {
  // 全データ管理用
  const [stack, setStack] = React.useState(props.comics)
  // 読み込み済みのチャンクを保持するState
  const [chunk, setChunk] = React.useState([])
  const chunkSize = 20

  React.useEffect(consumeStack, [props.comics])
  React.useEffect(observeStart, [chunk])

  const comicsChunk = chunk.map((comic: Parser.comicData, index) => {
    const last = index === chunk.length - 1

    if (last) {
      return <Comic key={index} comic={comic} lazyLoadFlag={true} />
    }
    return <Comic key={index} comic={comic} lazyLoadFlag={false} />
  })

  // イベント: 新たなデータチャンクを読み込み、Stateにセットする
  function consumeStack() {
    setChunk([...chunk, ...stack.slice(0, chunkSize)])
    setStack(stack.slice(chunkSize))
  }

  function observeStart() {
    const options = {
      root: document.querySelector('#root'),
      rootMargin: '0px',
      threshold: 1.0,
    }

    const callback = () => {
      console.group('callback')
      console.log('fire')
      const removalTarget = document.querySelector(`.${LazyLoadClassName}`)
      console.log(removalTarget)
      console.log(removalTarget.className)
        removalTarget.className = 'removed'
      console.groupEnd()
    }

    const observer = new IntersectionObserver(callback, options)

    console.log('observe start')
    if (document.querySelector(`.${LazyLoadClassName}`)) {
      const target = document.querySelector(`.${LazyLoadClassName}`)
      observer.observe(target)
    }
  }

  return (
    <React.Fragment>
      <TestEvent handler={consumeStack}></TestEvent>
      {comicsChunk}
    </React.Fragment>
  )
}

const TestEvent: React.FunctionComponent<{ handler: Function }> = (props) => {
  return (
    <div>
      <button onClick={() => props.handler()}> Click</button>
    </div>
  )
}

type PropsComic = {
  comic: Parser.comicData
  lazyLoadFlag: boolean
}

const Comic: React.FunctionComponent<PropsComic> = (props) => {
  const comic = props.comic
  const lazyLoadFlag = props.lazyLoadFlag

  const moveToShop = () => {
    location.href = Util.shopUrl(comic.isbn)
  }

  return (
    <div className={lazyLoadFlag ? LazyLoadClassName : ''}>
      <ComicOuter onClick={moveToShop}>
        <ComicCover imageurl={comic.cover} />
        <ComicContext>
          <ContextDate>{comic.pubdate}</ContextDate>
          <ContextTitle>{comic.title}</ContextTitle>
          <ContextAppendix>{comic.publisher}</ContextAppendix>
          <ContextAppendix>{comic.author}</ContextAppendix>
        </ComicContext>
      </ComicOuter>
    </div>
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
