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

class Home extends React.Component<{}, IState>{
    constructor(props: {}) {
        super(props)
        this.state = {
            response: defaultLibResponse,
            request: defaultLibRequest,
            isLoading: false,
            bookInfo: null
        }
    }
    componentDidMount() {
        this.setAppkey(process.env.APP_API_KEY)
    }

    private setRequest = (key: keyof LibRequest) => (value: string): void => {
        const request: LibRequest = { ...this.state.request }
        request[key] = value
        this.setState({ request: request })
    }
    private setAppkey: Function = this.setRequest('appkey')
    public setSystemID: Function = this.setRequest('systemid')
    public setISBN: Function = this.setRequest('isbn')
    public setBookInfo = (bookInfo: BookResponse): void => this.setState({ bookInfo: bookInfo })
    public setIsLoading = (state: boolean): void => this.setState({ isLoading: state })
    public setLibResponse = (res: LibResponse): void => this.setState({ response: { ...res } })
    public removeData = (): void => this.setState({ response: { ...defaultLibResponse } })
    // Use Calil API.
    private fetchLibrayInfo = async (o: LibRequest): Promise<LibResponse> => {
        let c: Calil = new Calil(o)
        let res: LibResponse = await c.search()
        return res
    }
    // Fetch OpenBD
    private fetchBookInfo = async (isbn: string): Promise<BookResponse> => {
        const O: OpenBD = new OpenBD()
        let bookResponse: BookResponse = await O.search(isbn)
        // console.log(`bookResponse: ${JSON.stringify(bookResponse)}`)
        return bookResponse
    }
    private dispatchLibraryInfo = (res: LibResponse): void => {
        let data = res
        if (!res) {
            console.log('Data is none')
            // 伝搬のため、空のデータをセットする
            const nullkey: string = 'xxx'
            data = {
                'libkey': [],
                'reserveurl': nullkey
            }
        }
        this.setLibResponse(data)
    }
    handleClick = async (): Promise<void> => {
        this.setState({ isLoading: true })
        this.dispatchLibraryInfo(await this.fetchLibrayInfo(this.state.request))
        this.setState({ isLoading: false })
    }
    //
    render() {
        return (
            <React.Fragment>

                {/* DIALOG */}
                <LoadingView isLoading={this.state.isLoading} />

                <ResultView
                    response={this.state.response}
                    setLibResponse={this.setLibResponse}
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