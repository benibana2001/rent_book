import * as React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import FieldISBN from './FieldISBN'
import FieldPrefecture from './FieldPref'
import BookDataArea from './BookData'
import LoadingView from './Loading'

import Calil, { LibRequest, LibResponse } from '../../api/Calil'
import OpenBD, { BookResponse } from '../../api/OpenBD'

import { BookStatus, defaultLibResponse } from './index'

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

const Search: React.FunctionComponent<IProps> = (props) => {
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
        submit={handleSubmit}
        request={request}
        isbn={request.isbn}
      />
      <DebugButton
        isbn={'4334926940'}
        pref={'Tokyo_Adachi'}
        func={{ isbn: setISBN, pref: setSystemID }}
      />
    </div>
  )

  function setSystemID(value: string) {
    console.group('setPref')

    const obj = {
      ...request,
      systemid: value,
    }

    console.log(obj)
    setRequest(obj)

    console.groupEnd()
  }

  function setISBN(value: string) {
    console.group('setISBN')

    const obj = {
      ...request,
      isbn: value,
    }

    console.log(obj)
    setRequest(obj)
    console.groupEnd()
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
  async function handleSubmit(): Promise<void> {
    const condition = request.systemid && request.isbn && request.appkey
    if (!condition) return

    await fetchCalil()
    moveToResultView()
  }

  async function fetchCalil() {
    setIsLoading(true)
    const res = await calil.search(request)
    dispatchLibraryInfo(res)
    setIsLoading(false)
  }

  function moveToResultView() {
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

interface DebugProps {
  isbn: string
  pref: string
  func: { isbn: Function; pref: Function }
}

const DebugButton: React.FunctionComponent<DebugProps> = (
  props: DebugProps
) => {
  const setPrefecture = async () => {
    const testPref = props.pref
    props.func.pref(testPref)
  }

  const setISBN = () => {
    const isbn = document.getElementById('input-isbn') as HTMLInputElement
    isbn.value = props.isbn
    props.func.isbn(props.isbn)
  }

  return (
    <React.Fragment>
      <button onClick={setISBN}>debug-setISBN</button>
      <button onClick={setPrefecture}>debug-setPrefecture</button>
    </React.Fragment>
  )
}

export default Search
