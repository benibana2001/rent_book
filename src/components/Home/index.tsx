import * as React from 'react'

import ISBNArea from './ISBN'
import PrefArea from './Pref'
// import TitleArea from './Title'
import BookDataArea from './BookData'
import ResultView from '../Result'
import LoadingView from '../Loading'
import Calil from '../../api/Calil'
import OpenBD from '../../api/OpenBD'
import { LibRequest, LibData, LibResponse } from '../../api/Calil'
import { BookResponse } from '../../api/OpenBD'

import 'material-design-lite'
import 'material-design-lite/material.min.css'

interface IState {
    response: LibResponse,
    request: LibRequest,
    isLoading: boolean,
    bookInfo: BookResponse,
    bookStatus: BookStatus
}
const defaultLibRequest: LibRequest = {
    appkey: '',
    isbn: '',
    systemid: ''
}
const defaultLibResponse: LibResponse = {
    libkey: null,
    reserveurl: '',
}
export enum BookStatus {
    EXIST = 'EXIST',
    NONE = 'NONE',
    NOT_DONE = 'NOT_DONE'
}
const defaultState: IState = {
    response: defaultLibResponse,
    request: defaultLibRequest,
    isLoading: false,
    bookInfo: null,
    bookStatus: BookStatus.NOT_DONE
}

class Home extends React.Component<{}, IState>{
    constructor(props: {}) {
        super(props)
        this.state = defaultState
    }
    componentDidMount() {
        const setAppkey = (value: string) => this.setState({
            request: { ...this.state.request, 'appkey': value },
        })
        setAppkey(process.env.APP_API_KEY)
    }

    public setSystemID = (value: string) => this.setState({
        request: { ...this.state.request, 'systemid': value }
    })
    public setISBN = (value: string) => this.setState({
        request: { ...this.state.request, 'isbn': value }
    })
    public setBookInfo = (bookInfo: BookResponse): void => this.setState({ bookInfo: bookInfo })
    public setBookStatus = (bookStatus: BookStatus): void => this.setState({ bookStatus: bookStatus })
    public setIsLoading = (state: boolean): void => this.setState({ isLoading: state })
    public setLibResponse = (res: LibResponse): void => this.setState({ response: { ...res } })
    public removeData = (): void => this.setState({ response: { ...defaultLibResponse } })
    // Fetch Book Data(title, coverurl) from OpneBD server.
    private fetchBookInfo = async (isbn: string): Promise<BookResponse> => {
        const O: OpenBD = new OpenBD()
        let bookResponse: BookResponse = await O.search(isbn)
        // console.log(`bookResponse: ${JSON.stringify(bookResponse)}`)
        return bookResponse
    }
    // Fetch a book status about each library by using Calil API.
    private fetchLibrayInfo = async (o: LibRequest): Promise<LibResponse> => {
        let c: Calil = new Calil(o)
        let res: LibResponse = await c.search()
        return res
    }
    private dispatchLibraryInfo = (res: LibResponse): void => {
        if (!res) {
            console.log('Data is none')
            this.setState({ bookStatus: BookStatus.NONE })
            this.setLibResponse(defaultLibResponse)
            return
        }
        this.setLibResponse(res)
        this.setState({ bookStatus: BookStatus.EXIST })
    }
    handleClick = async (): Promise<void> => {
        // TODO: Display loading view automatically.
        this.setState({ isLoading: true })
        const res = await this.fetchLibrayInfo(this.state.request)
        this.dispatchLibraryInfo(res)
        this.setState({ isLoading: false })
    }
    //
    render() {
        return (
            <React.Fragment>

                {/* DIALOG */}
                <LoadingView isLoading={this.state.isLoading} />
                {/* TODO: Create single page for ResultView */}
                <ResultView
                    bookStatus={this.state.bookStatus}
                    response={this.state.response}
                    setLibResponse={this.setLibResponse}
                    setBookStatus={this.setBookStatus}
                />

                <ISBNArea setISBN={this.setISBN} />

                <PrefArea setSystemID={this.setSystemID} />

                <BookDataArea
                    fetchBookInfo={this.fetchBookInfo}
                    submit={this.handleClick}
                    isbn={this.state.request.isbn} />
            </React.Fragment>
        )
    }
}


export default Home