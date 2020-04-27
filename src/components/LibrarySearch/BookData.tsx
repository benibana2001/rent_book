import * as React from 'react'
import styled from 'styled-components'

import { BookResponse } from '../../api/OpenBD'

import { Button } from '../Common'
interface IProps {
  isbn: string
  fetchBookInfo: (isbn: string) => Promise<BookResponse>
  submit: () => Promise<void>
}

const defaultBookResponse: BookResponse = {
  title: '',
  coverurl: '',
}

const BookTitle = styled.div`
  font-size: 22px;
  line-height: 22px;

  margin-bottom: 6px;
`

const BookContent = styled.div`
  display: inline-block;
  width: calc(100% - 106px);
  padding-left: 10px;
  padding-left: 6px;
  vertical-align: top;
  text-align: left;
`

const Book = styled.div`
  position: fixed;
  bottom: 83px;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.25);
  background: white;
  z-index: 1;
`

const BookInner = styled.a`
  display: block;
  width: calc(100% - 10px);
  padding: 10px 10px;
  padding-right: 60px;
`

const Cover = styled.img`
  display: inline-block;
  width: 100px;
`


const BookDataArea: React.FunctionComponent<IProps> = (props) => {
  const [bookResponse, setBookResponse] = React.useState(defaultBookResponse)

  React.useEffect(fetchBook, [props.isbn])

  const CoverURL: React.FunctionComponent = () => {
    return bookResponse.coverurl ? (
      <Cover src={bookResponse.coverurl} alt={bookResponse.coverurl} />
    ) : (
      <span>書影なし</span>
    )
  }

  const bookDataArea = (
    <Book>
      <BookInner>
        <CoverURL />
        <BookContent>
          <BookTitle>{bookResponse.title}</BookTitle>
          <div>{searchButton()}</div>
        </BookContent>
      </BookInner>
    </Book>
  )

  return isBookResponse() && bookDataArea

  function searchButton() {
    return <Button.MediumColored onClick={handleClick}>蔵書を調べる</Button.MediumColored>
  }

  async function handleClick() {
    return await props.submit()
  }

  function isBookResponse() {
    return bookResponse.title
  }

  function fetchBook() {
    validate() ? fetch() : setBookResponse(defaultBookResponse)
  }

  function validate(): boolean {
    return props.isbn.length === 13 || props.isbn.length === 10
  }

  async function fetch() {
    setBookResponse(await props.fetchBookInfo(props.isbn))
  }
}

export default BookDataArea
