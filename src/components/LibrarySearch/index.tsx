import * as React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import FieldISBN from './FieldISBN'
import FieldPrefecture from './FieldPref'
import BookDataArea from './BookData'
import LoadingView from '../Loading'

import Calil, { LibRequest, LibResponse } from '../../api/Calil'
import OpenBD, { BookResponse } from '../../api/OpenBD'

import { BookStatus, defaultLibResponse } from '../../AppLayout'

import { ContentsArea } from '../Common'

interface IProps {
  setBookInfo: (bookInfo: BookResponse) => void
  setBookStatus: (bookStatus: BookStatus) => void
  setLibraryResponse: (libresponse: LibResponse) => void
}

const CALIL_KEY = process.env.APP_API_KEY

const defaultLibRequest: LibRequest = {
  appkey: CALIL_KEY,
  isbn: '',
  systemid: '',
}

const LibrarySearch: React.FunctionComponent<IProps> = (props) => {
  const history = useHistory()
  const [request, setRequest] = React.useState(defaultLibRequest)
  const [isLoading, setIsLoading] = React.useState(false)

  const calil = new Calil(request)

  return (
    <div>
      <LoadingView isLoading={isLoading} />

      <ContentsArea title={'図書館で本を予約する'}>
        <ContentsLibrarySearch>
          <FieldISBN setISBN={setISBN} />
          <FieldPrefecture setSystemID={setSystemID} />
        </ContentsLibrarySearch>
      </ContentsArea>
      <BookDataArea
        fetchBookInfo={fetchBookInfo}
        submit={handleClick}
        isbn={request.isbn}
      />
      {debugButton()}
    </div>
  )

  function setSystemID(value: string) {
    setRequest({
      ...request,
      systemid: value,
    })
  }

  function setISBN(value: string) {
    setRequest({
      ...request,
      isbn: value,
    })
  }

  async function fetchBookInfo(isbn: string): Promise<BookResponse> {
    const O: OpenBD = new OpenBD()
    const bookResponse: BookResponse = await O.search(isbn)
    return bookResponse
  }

  // TODO: 関数実行のたびにインスタンを作成するのは不要
  function dispatchLibraryInfo(res: LibResponse): void {
    if (!res) {
      console.log('Data is none')
      props.setBookStatus(BookStatus.NONE)
      props.setLibraryResponse(defaultLibResponse)
      return
    }

    props.setLibraryResponse(res)
    props.setBookStatus(BookStatus.EXIST)
  }

  // Fetch a book status about each library by using Calil API.
  async function handleClick(): Promise<void> {
    // TODO: Display loading view automatically.
    setIsLoading(true)

    const res = await calil.search(request)

    dispatchLibraryInfo(res)
    setIsLoading(false)

    history.push('/librarysearch/result')
  }
}

const ContentsLibrarySearch = styled.div`
  background-color: #ffffff;
  border-radius: 4px;

  width: calc(100% - (2 * 16px));
  margin: 16px;
  margin-top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

function debugButton() {
  const debug = () => {
    const isbn = document.getElementById('input-isbn') as HTMLInputElement
    isbn.value = '4334926940'
  }
  return <button onClick={debug}>debug</button>
}

export default LibrarySearch
