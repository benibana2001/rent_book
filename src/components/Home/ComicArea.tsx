import * as React from 'react'
import styled from 'styled-components'

import comicList from './comiclist'

const ComicArea: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <ContentsOuter>
        <ContentsInner>
          <WriteComicContents />
        </ContentsInner>
      </ContentsOuter>
    </React.Fragment>
  )
}

const WriteComicContents: React.FunctionComponent = () => {
  const comics = comicList.map((comic, index) => (
    <ComicContents key={index} title={comic.title} image={comic.image} />
  ))
  return <React.Fragment>{comics}</React.Fragment>
}

const ComicContents = (props: {
  key: number
  image: string
  title: string
}) => {
  return (
    <ComicOuter image={props.image}>
      <ComicFooter>
        <ComicTitle>{props.title}</ComicTitle>
      </ComicFooter>
    </ComicOuter>
  )
}

const margin = {
  middle: 16,
  small: 10,
}

const comicStyle = {
  x: 200,
  y: 300,
  marginRight: margin.small,
}

const ContentsOuter = styled.div`
  overflow: scroll;
`

const innerWidth = () => {
  const len = comicList.length

  const comicsWidth = comicStyle.x * len
  const comicsSpan = comicStyle.marginRight * (len - 1)
  const padding = margin.middle

  return comicsWidth + comicsSpan + padding
}

const ContentsInner = styled.div`
  display: flex;
  width: ${innerWidth()}px;
`

const ComicOuter = styled.div<{ image: string }>`
  width: ${comicStyle.x}px;
  height: ${comicStyle.y}px;
  margin-right: ${comicStyle.marginRight}px;

  background: top no-repeat url(${(props) => props.image});
  background-size: cover;
  border-radius: 0.8em;

  position: relative;

  &:first-child {
    margin-left: 16px;
  }

  &:hover {
    opacity: 0.8;
  }
`

const ComicFooter = styled.div`
  width: 100%;
  height: 40px;
  background: white;

  border-bottom-left-radius: 0.8em;
  border-bottom-right-radius: 0.8em;

  position: absolute;
  bottom: 0;
`

const ComicTitle = styled.p`
  font-size: 14px;
  margin: ${margin.small}px;
  margin-top: ${margin.small}px;
`

export default ComicArea
