import * as React from 'react'
import { useHistory } from 'react-router-dom'

import ResultList from './ResultList'

import { LibResponse } from '../../../api/Calil'
import { BookStatus } from '../index'

import ContentsArea from '../../Common/ContentsArea'
import styled from 'styled-components'

import { Button } from '../../Common'

interface IProps {
  bookStatus: BookStatus
  response: LibResponse
  setBookStatus: (bookStatus: BookStatus) => void
  setLibResponse: (res: LibResponse) => void
}

const ResultView: React.FunctionComponent<IProps> = (props) => {
  const history = useHistory()

  return (
    <ContentsArea title={'本の検索結果'}>
      {/* {resultView()} */}
      {existBook() ? resultView() : <div>検索結果はありません</div>}
    </ContentsArea>
  )

  function resultView() {
    const dummyData = [
      { id: 1, name: '新田', status: '貸出可' },
      { id: 2, name: '鹿浜', status: '貸出可' },
      { id: 3, name: '竹の塚', status: '貸出可' },
      { id: 4, name: '江南', status: '貸出可' },
      { id: 5, name: '中央', status: '貸出可' },
      { id: 6, name: '保塚', status: '貸出可' },
      { id: 7, name: '興本', status: '貸出中' },
    ]

    return (
      <div>
        <Outer>
          {/* <ResultList data={dummyData} /> */}
          <ResultList data={props.response.libkey} />
        </Outer>
        <ButtonWrapper>
          {backButton()}
          {reserveButton()}
        </ButtonWrapper>
      </div>
    )
  }

  function existBook() {
    console.log(props.bookStatus)
    return props.bookStatus === BookStatus.EXIST
  }

  function reserveButton() {
    return (
      <ButtonGoTo
        id="buttonReserve"
        onClick={moveTo(props.response.reserveurl)}
      >
        予約画面へ
      </ButtonGoTo>
    )
  }

  function backButton() {
    return (
      <ButtonBack onClick={() => history.push('/librarysearch')}>
        もどる
      </ButtonBack>
    )
  }
}

const moveTo = (url: string) => () => (location.href = url)

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 16px;
  border-radius: 3px;
`

const ButtonBack = styled(Button.Medium)`
  background: #ffffff;
  color: #9d9d9d;
  margin-right: 6px;
`

const ButtonGoTo = styled(Button.MediumColored)`
  margin-left: 6px;
`

const Outer = styled.div`
  background: #ffffff;
  margin-left: 16px;
  border-radius: 3px;

  width: calc(100% - 32px);
  padding: 14px 0px;
`

export default ResultView
