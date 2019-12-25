import * as React from 'react'
import { OpenBD, BookInfo } from '../../api/OpenBD'
import { Calil, options, dataRow, data } from '../../api/Calil'
import './bookData.scss'
// OpenBD を使用してISBN入力時に自動で表示する
export { BookData }
class BookData extends React.Component<
    {
        isbn: string,
        setter: {
            bookInfo: Function,
            isLoading: Function,
            data: Function
        },
        options: options
    },
    {
        bookInfo: BookInfo
    }
    >{
    constructor(props: {
        isbn: string, 
        setter: {
            bookInfo: Function,
            isLoading: Function,
            data: Function
        },
        options: options
    }) {
        super(props)
        this.state = {
            bookInfo: {
                title: ''
            }
        }
        // bind
        this.fetchBookInfo = this.fetchBookInfo.bind(this)
        this.handleClick = this.handleClick.bind(this)
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

    /**
      * Use Calil API.
      */
    public async fetchLibrayInfo(o: options): Promise<data> {
        this.props.setter.isLoading(true)

        let c: Calil = new Calil(o)
        let data: data = await c.search()
        if (!data) {
            console.log('Data is none')
        } else {
            this.props.setter.data(data)
        }

        // debug
        // await this.fetchBookInfo(o.isbn)

        this.props.setter.isLoading(false)

        // dialog
        // this.initModal()

        return data
    }

    /**
     * When Submit button clicked
     */
    handleClick(): void {
        this.fetchLibrayInfo(this.props.options)
    }

    render() {
        if (this.state.bookInfo.title !== '') {
            console.log(this.state.bookInfo)
            return (
                <div className="snack-container">
                    <a className="snack-inner">
                        <img className="thumbnail" src={this.state.bookInfo.coverurl} alt={this.state.bookInfo.coverurl} />
                        <div className="snack-content">
                            {/* Fetched content */}
                            <div className="snack-title">
                                {this.state.bookInfo.title}
                            </div>
                            {/* Button */}
                            <div>
                                <button onClick={this.handleClick} className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    Submit
                                </button>
                            </div>
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
