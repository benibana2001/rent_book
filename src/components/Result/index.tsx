import * as React from 'react'
import { useHistory } from 'react-router-dom'

import ResultList from './components/ResultList'

import { LibResponse } from '../../api/Calil'
import { BookStatus } from '../../AppLayout'

interface IProps {
  bookStatus: BookStatus
  response: LibResponse
  setBookStatus: (bookStatus: BookStatus) => void
  setLibResponse: (res: LibResponse) => void
}

const ResultView: React.FunctionComponent<IProps> = (props) => {
  const history = useHistory()

  return (
    <div id="result">
      {existBook() ? resultView() : <div>検索結果はありません</div>}
    </div>
  )

  function resultView() {
    return (
      <div>
        <ResultList data={props.response.libkey} />
        {reserveButton()}
        {backButton()}
      </div>
    )
  }

  function existBook() {
    return props.bookStatus === BookStatus.EXIST
  }

  function reserveButton() {
    return (
      <button
        id="buttonReserve"
        type="button"
        className=""
        onClick={moveTo(props.response.reserveurl)}
      >
        予約
      </button>
    )
  }

  function backButton() {
    return (
      <button
        type="button"
        className=""
        onClick={() => history.push('/home')}
      >
        もどる
      </button>
    )
  }
}

const moveTo = (url: string) => () => (location.href = url)

export default ResultView
