import * as React from 'react'
import ISBN from './ISBN'
import Title from './Title'
import BookData from './BookData'
import Result from './Result'
import Loading from '../components/loading'
import SystemID from '../components/SystemID'
import { LibRequest, LibData, LibResponse, BookResponse, ToastStatus } from '../interfaces'
import 'material-design-lite'
import 'material-design-lite/material.min.css'
import '../components/material_icon.scss'
import './home.scss'

class Home extends React.Component<{}, {
    libkey: LibData[],
    reserveurl: string,
    request: LibRequest,
    isLoading: boolean,
    inputtingPref: boolean,
    bookInfo: BookResponse,
    status: {
        toast: ToastStatus
    },
    test: boolean
}>{
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
            bookInfo: null,
            status: {
                toast: {
                    pref: false,
                    load: false,
                    result: {
                        success: false,
                        failed: false
                    }
                }
            },
            test: false
        }
        // bind
        this.setData = this.setData.bind(this)
        this.removeData = this.removeData.bind(this)
        this.setAppkey = this.setAppkey.bind(this)
        this.setISBN = this.setISBN.bind(this)
        this.setIsLoading = this.setIsLoading.bind(this)
        this.setInputtingPref = this.setInputtingPref.bind(this)
        this.setSystemID = this.setSystemID.bind(this)
        // this.initModal = this.initModal.bind(this)
    }
    componentDidMount() {
        // Set API_KEY
        this.setAppkey(process.env.APP_API_KEY)
    }
    // BOokinfo が変わったらモーダルを表示する
    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.libkey !== this.state.libkey) {
            if (this.state.libkey !== null) {
                this.displayModal()
            }
        }
    }
    // modal
    displayModal(): void {
        // const dialog = document.querySelector('dialog')
        // dialog.showModal()
    }
    //
    setAppkey(appkey: string): void {
        this.setState({
            request: {
                'appkey': appkey,
                'isbn': this.state.request.isbn,
                'systemid': this.state.request.systemid
            }
        })
        console.log(`State was Changed: ${JSON.stringify(this.state)}`)
    }
    setISBN(isbn: string): void {
        this.setState({
            request: {
                'appkey': this.state.request.appkey,
                'isbn': isbn,
                'systemid': this.state.request.systemid
            }
        })
    }
    setSystemID(systemid: string): void {
        this.setState({
            request: {
                'appkey': this.state.request.appkey,
                'isbn': this.state.request.isbn,
                'systemid': systemid
            }
        })
    }
    //
    setInputtingPref(status: boolean): void {
        this.setState({
            inputtingPref: status
        })
    }
    //
    setBookInfo(bookInfo: BookResponse): void {
        this.setState({ bookInfo: bookInfo })
    }
    //
    setIsLoading(state: boolean): void {
        this.setState({ isLoading: state })
        this.setState({ test: true})
    }
    setData(d: LibResponse): void {
        this.setState({ libkey: d.libkey })
        this.setState({ reserveurl: d.reserveurl })
        console.log(this.state.libkey)
    }
    removeData(): void {
        this.setState({ libkey: null })
        this.setState({ reserveurl: '' })
    }

    //
    render() {
        return (
            <React.Fragment>

                {/* DIALOG */}

                <Loading isLoading={this.state.isLoading} />

                <SystemID
                    libRequest={this.state.request}
                    setter={{
                        isLoading: this.setIsLoading,
                        systemID: this.setSystemID,
                        data: this.setData,
                        inputtingPref: this.setInputtingPref
                    }}
                    inputtingPref={this.state.inputtingPref}
                />

                {/* <Failed 
                    setter={{
                        data: this.setData
                    }}
                /> */}

                <Result
                    data={this.state.libkey}
                    reserveurl={this.state.reserveurl}
                    setter={{
                        data: this.setData
                    }}
                />
                {/* / DIALOG */}

                <ISBN setOptions={{
                    isbn: this.setISBN,
                    systemID: this.setSystemID
                }} />

                <Title />

                {/* <FigureGuide /> */}

                <BookData
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