import * as React from 'react'

import ISBNArea from './ISBN'
import TitleArea from './Title'
import BookDataArea from './BookData'
import ResultView from '../Result'
import LoadingView from '../Loading'
import PrefectureView from '../Prefecture'
import { LibRequest, LibData, LibResponse, BookResponse } from '../interfaces'

import 'material-design-lite'
import 'material-design-lite/material.min.css'

interface IState {
    libkey: LibData[],
    reserveurl: string,
    request: LibRequest,
    isLoading: boolean,
    inputtingPref: boolean,
    bookInfo: BookResponse,
}

class Home extends React.Component<{}, IState>{
    constructor(props: {}) {
        super(props)
        this.state = {
            libkey: null,
            reserveurl: '',
            request: {
                'appkey': '',
                'isbn': '',
                'systemid': ''
            },
            isLoading: false,
            inputtingPref: false,
            bookInfo: null
        }
    }
    componentDidMount() {
        this.setAppkey(process.env.APP_API_KEY)
    }

    private setRequest = (key: keyof LibRequest) => (value: string): void => {
        const request: LibRequest = {
            'appkey': this.state.request.appkey,
            'isbn': this.state.request.isbn,
            'systemid': this.state.request.systemid
        }
        request[key] = value
        this.setState({ request: request })
    }

    public setSystemID: Function = this.setRequest('systemid')
    public setISBN: Function = this.setRequest('isbn')
    public setAppkey: Function = this.setRequest('appkey')
    //
    setInputtingPref = (status: boolean): void => this.setState({ inputtingPref: status })
    //
    setBookInfo = (bookInfo: BookResponse): void => this.setState({ bookInfo: bookInfo })
    //
    setIsLoading = (state: boolean): void => {
        this.setState({ isLoading: state })
    }
    setData = (d: LibResponse): void => {
        this.setState({ libkey: d.libkey })
        this.setState({ reserveurl: d.reserveurl })
        console.log(this.state.libkey)
    }
    removeData = (): void => {
        this.setState({ libkey: null })
        this.setState({ reserveurl: '' })
    }
    //
    render() {
        return (
            <React.Fragment>

                {/* DIALOG */}

                <LoadingView isLoading={this.state.isLoading} />

                <PrefectureView
                    libRequest={this.state.request}
                    setter={{
                        isLoading: this.setIsLoading,
                        systemID: this.setSystemID,
                        data: this.setData,
                        inputtingPref: this.setInputtingPref
                    }}
                    inputtingPref={this.state.inputtingPref}
                />

                <ResultView
                    data={this.state.libkey}
                    reserveurl={this.state.reserveurl}
                    setter={{
                        data: this.setData
                    }}
                />
                {/* / DIALOG */}

                <ISBNArea setOptions={{
                    isbn: this.setISBN,
                    systemID: this.setSystemID
                }} />

                <TitleArea />

                <BookDataArea
                    setter={{
                        bookInfo: this.setBookInfo,
                        isLoading: this.setIsLoading,
                        data: this.setData,
                        inputtingPref: this.setInputtingPref
                    }}
                    isbn={this.state.request.isbn}
                    request={this.state.request} />
            </React.Fragment>
        )
    }
}


export default Home