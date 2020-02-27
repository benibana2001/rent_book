import * as React from 'react'

import ISBNArea from './ISBN'
import PrefArea from './Pref'
import BookDataArea from './BookData'
import LoadingView from '../Loading'
import Calil, { LibRequest, LibResponse } from '../../api/Calil'
import OpenBD, { BookResponse } from '../../api/OpenBD'

import 'material-design-lite'
import 'material-design-lite/material.min.css'
import { BookStatus, defaultLibResponse } from '../../Routes'

interface IProps {
    setBookInfo: (bookInfo: BookResponse) => void
    setBookStatus: (bookStatus: BookStatus) => void
    setLibraryResponse: (libresponse: LibResponse) => void
}
interface IState {
    request: LibRequest,
    isLoading: boolean,
}
const defaultLibRequest: LibRequest = {
    appkey: '',
    isbn: '',
    systemid: ''
}
const defaultState: IState = {
    request: defaultLibRequest,
    isLoading: false,
}

class Home extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = defaultState
    }
    componentDidMount() {
        this.setState(defaultState)
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
    public setIsLoading = (state: boolean): void => this.setState({ isLoading: state })
    private fetchBookInfo = async (isbn: string): Promise<BookResponse> => {
        const O: OpenBD = new OpenBD()
        let bookResponse: BookResponse = await O.search(isbn)
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
            this.props.setBookStatus(BookStatus.NONE)
            this.props.setLibraryResponse(defaultLibResponse)
            return
        }
        this.props.setLibraryResponse(res)
        this.props.setBookStatus(BookStatus.EXIST)
    }
    handleClick = async (): Promise<void> => {
        // TODO: Display loading view automatically.
        this.setState({ isLoading: true })
        const res = await this.fetchLibrayInfo(this.state.request)
        this.dispatchLibraryInfo(res)
        this.setState({ isLoading: false })
    }
    
    render() {
        return (
            <React.Fragment>
                <LoadingView isLoading={this.state.isLoading} />
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