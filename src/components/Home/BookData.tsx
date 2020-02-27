import * as React from 'react'
import { BookResponse } from '../../api/OpenBD'

interface IProps {
    isbn: string,
    fetchBookInfo: (isbn: string) => Promise<BookResponse>,
    submit: () => Promise<void>
}
interface IState {
    bookResponse: BookResponse
}
const defaultState: IState = {
    bookResponse: {
        title: '',
        coverurl: ''
    }
}

class BookDataArea extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = defaultState
    }
    // ISBNがprops経由で渡ってきた場合はfetch API を使用する
    public async componentDidUpdate(prevProps: any) {
        if (prevProps !== this.props) {
            if (this.props.isbn.length === 13 || this.props.isbn.length === 10) {
                const res: BookResponse = await this.props.fetchBookInfo(this.props.isbn)
                this.setState({ bookResponse: res })
            } else {
                this.setState(defaultState)
            }
        }
    }
    // When Submit button clicked
    private handleClick = async () => await this.props.submit()

    render() {
        return (
            this.state.bookResponse.title && (
                <div className="snack-container">
                    <a className="snack-inner">
                        {this.state.bookResponse.coverurl
                            ? (<img className="thumbnail" src={this.state.bookResponse.coverurl} alt={this.state.bookResponse.coverurl} />)
                            : (<span>書影なし</span>)
                        }
                        <div className="snack-content">
                            {/* Fetched content */}
                            <div className="snack-title">
                                {this.state.bookResponse.title}
                            </div>
                            {/* Button */}
                            <div>
                                <button onClick={this.handleClick} className="mdl-button mdl-js-button mdl-js-ripple-effect">
                                    蔵書を調べる
                                </button>
                            </div>
                        </div>
                    </a>
                </div>
            )
        )
    }
}

export default BookDataArea