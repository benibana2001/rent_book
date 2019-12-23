import * as React from 'react'
import { BookInfo } from '../../api/OpenBD'
// OpenBD を使用してISBN入力時に自動で表示する
export { BookData }
class BookData extends React.Component<{ bookInfo: BookInfo }>{
    constructor(props: { bookInfo: BookInfo }) {
        super(props)
    }
    render() {
        if (this.props.bookInfo) {
            console.log(this.props.bookInfo)
            return (
                <div>
                    Title: {this.props.bookInfo.title}
                    <img src={this.props.bookInfo.coverurl} alt={this.props.bookInfo.coverurl} />
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }

    }
}
