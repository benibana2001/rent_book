import * as React from 'react'
import { BookResponse } from '../../api/OpenBD'

interface IProps {
    isbn: string,
    fetchBookInfo: (isbn: string) => Promise<BookResponse>,
    submit: () => Promise<void>
}
const defaultBookResponse: BookResponse = {
    title: '',
    coverurl: ''
}

const BookDataArea: React.SFC<IProps> = props => {
    const [bookResponse, setBookResponse] = React.useState(defaultBookResponse)
    React.useEffect(() => {
        const validate = (): boolean => (props.isbn.length === 13 || props.isbn.length === 10)
        const fetch = async () => {
            const res: BookResponse = await props.fetchBookInfo(props.isbn)
            setBookResponse(res)
        }
        validate() ? fetch() : setBookResponse(defaultBookResponse)
    }, [props.isbn])

    const handleClick = async () => await props.submit()

    return (
        bookResponse.title && (
            <div className="snack-container">
                <a className="snack-inner">
                    {bookResponse.coverurl
                        ? (<img className="thumbnail" src={bookResponse.coverurl} alt={bookResponse.coverurl} />)
                        : (<span>書影なし</span>)
                    }
                    <div className="snack-content">
                        <div className="snack-title">
                            {bookResponse.title}
                        </div>
                        <div>
                            <button onClick={handleClick} className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                蔵書を調べる
                            </button>
                        </div>
                    </div>
                </a>
            </div>
        )
    )
}

export default BookDataArea