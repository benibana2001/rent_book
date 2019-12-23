import * as React from 'react'
import { OpenBD, BookInfo } from '../../api/OpenBD'
import './bookData.scss'
// OpenBD を使用してISBN入力時に自動で表示する
export { BookData }
class BookData extends React.Component<{ setBookInfo: Function, isbn: string }, { bookInfo: BookInfo }>{
    constructor(props: { setBookInfo: Function, isbn: string }) {
        super(props)
        this.state = {
            bookInfo: {
                title: ''
            }
        }
        this.fetchBookInfo = this.fetchBookInfo.bind(this)
    }
    componentDidMount() {
        // this.setState({ bookInfo: { title: 'a' } })
    }
    // ISBNがprops経由で渡ってきた場合はfetch API を使用する
    componentDidUpdate(prevProps: any) {
        if (prevProps !== this.props) {
            // console.log('change')
            if (this.props.isbn.length === 13 || this.props.isbn.length === 10) {
                this.fetchBookInfo(this.props.isbn)
            } else {
                this.setState({ bookInfo: { title: '' } })
            }
        } else {
            // console.log('no-change')
        }
    }
    //
    public async fetchBookInfo(isbn: string): Promise<BookInfo> {
        // Fetch OpenBD
        const O: OpenBD = new OpenBD()
        let bookInfo: BookInfo = await O.search(isbn)
        this.setState({ bookInfo: bookInfo })
        console.log(`bookInfo: ${JSON.stringify(bookInfo)}`)

        return bookInfo
    }

    //
    render() {
        if (this.state.bookInfo.title !== '') {
            console.log(this.state.bookInfo)
            return (
                <div className="snack-container">
                    <a className="snack-inner">
                        <div className="snack-image">
                            <img className="thumbnail" src={this.state.bookInfo.coverurl} alt={this.state.bookInfo.coverurl} />
                        </div>
                        <div className="snack-title">
                            {this.state.bookInfo.title}
                        </div>
                    </a>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}
