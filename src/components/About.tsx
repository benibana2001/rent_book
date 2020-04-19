import * as React from 'react'
import styled from 'styled-components'

import imgBackground01 from '../img/background_about_01.png'
import imgBackground02 from '../img/background_about_02.png'

const About: React.FunctionComponent = () => {
  return (
    <Outer>
      <OverflowDiv>
        <Inner>
          <InnerH2>このアプリについて</InnerH2>
          <InnerPhrase>
            書籍のISBN（アイエスビーエヌ、International Standard Book
            Number）を元に、図書館別の蔵書情報および貸し出し状況の確認から貸出/予約までを行うことを可能とするアプリです。
            2020年4月現在, 開発中です。
          </InnerPhrase>

          <InnerH2>使っている技術</InnerH2>
          <InnerPhrase>
            TypeScript, React Hooks
            <br />
            webpack
            <br />
            ESLint, Prettier, Jest
            <br />
            styled components, Sass
            <br />
            Firebase Hosting
            <br />
            Fetch API
            <br />
            各種Web API（カーリル、OpenBDなど）
          </InnerPhrase>

          <InnerH2>製作者</InnerH2>
          <InnerPhrase>
            xxx@github.com
            <br />
            All Rights Reserved,
          </InnerPhrase>
        </Inner>
        <ImageDiv01 image={imgBackground01} width={330} height={226} />
        <ImageDiv02 image={imgBackground02} width={293} height={293} />
      </OverflowDiv>
    </Outer>
  )
}

const margin = 16

const InnerH2 = styled.h2`
  font-size: 20px;

  margin: ${margin}px;
  margin-bottom: ${margin}px;

  &:first-child {
    padding-top: ${margin * 2}px;
  }
`

const OverflowDiv = styled.div`
    overflow: hidden;
    height: 100vh;
`

const InnerPhrase = styled.p`
  font-size: 14px;
  margin: ${margin}px;
  margin-bottom: ${margin * 1.6}px;
  /* text-indent: 1em; */
`

const Outer = styled.div`
  position: relative;
`

const Inner = styled.div`
  position: absolute;
  z-index: 100;

  width: calc(100% - 32px);
  top: 36px;
  left: 16px;
  padding-bottom: ${margin * 2}px;

  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;

  color: #3d3d3d;
`

const ImageDiv = styled.div<{ image: string; width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: top no-repeat url(${(props) => props.image});
  background-size: cover;

  position: relative;
  z-index: -1;
`

const ImageDiv01 = styled(ImageDiv)`
  top: 10em;
  right: -30%;
`

const ImageDiv02 = styled(ImageDiv)`
  top: 10em;
  left: -10%
`

export default About
