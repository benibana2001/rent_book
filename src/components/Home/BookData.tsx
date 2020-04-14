import * as React from 'react'
import { BookResponse } from '../../api/OpenBD'

interface IProps {
  isbn: string
  fetchBookInfo: (isbn: string) => Promise<BookResponse>
  submit: () => Promise<void>
}

const defaultBookResponse: BookResponse = {
  title: '',
  coverurl: '',
}

const BookDataArea: React.FunctionComponent<IProps> = (props) => {
  const [bookResponse, setBookResponse] = React.useState(defaultBookResponse)

  React.useEffect(fetchBook, [props.isbn])

  const bookDataArea = (
    <div className="bookdata">
      <a className="bookdata__inner">
        {coverURL()}

        <div className="bookdata__content">
          <div className="bookdata__title">{bookResponse.title}</div>

          <div>{searchButton()}</div>
        </div>
      </a>
    </div>
  )

  return isBookResponse() && bookDataArea

  function coverURL() {
    return bookResponse.coverurl ? (
      <img
        className="bookdata__thumbnail"
        src={bookResponse.coverurl}
        alt={bookResponse.coverurl}
      />
    ) : (
      <span>書影なし</span>
    )
  }

  function searchButton() {
    return (
      <button
        onClick={handleClick}
        className=""
      >
        蔵書を調べる
      </button>
    )
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
