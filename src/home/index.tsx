import * as React from 'react'
import { ISBN } from './ISBN'
import { Title } from './Title'
import { Camera } from './Camera'
import { BookData } from './BookData'
import { Result } from './Result'
import { Loading } from '../components/loading'
import { Calil, options, dataRow, data } from '../api/Calil'
import 'material-design-lite'
import 'material-design-lite/material.min.css'
import '../components/material_icon.scss'
import { BookInfo } from '../api/OpenBD'
import './home.scss'

export { Home }
class Home extends React.Component<{}, {
    libkey: dataRow[],
    reserveurl: string,
    options: options,
    isLoading: boolean,
    bookInfo: BookInfo
}>{
    constructor(props: {}) {
        super(props)
        this.state = {
            libkey: null,
            reserveurl: '',
            options: {
                'appkey': '',
                'isbn': '',
                'systemid': ''
            },
            isLoading: false,
            bookInfo: null
        }
        // bind
        this.setData = this.setData.bind(this)
        this.removeData = this.removeData.bind(this)
        this.setAppkey = this.setAppkey.bind(this)
        this.setISBN = this.setISBN.bind(this)
        this.setIsLoading = this.setIsLoading.bind(this)
        this.setSystemID = this.setSystemID.bind(this)
        // this.initModal = this.initModal.bind(this)
    }
    componentDidMount() {
        // Set API_KEY
        this.setAppkey(process.env.APP_API_KEY)
        // Init dialog
        // let dialog = document.querySelector('dialog')
        // dialog.querySelector('.close').addEventListener('click', () => {
        //     dialog.close()
        // })
        // Add link to reserve-button
        // const reserve: HTMLElement = document.getElementById('buttonReserve')
        // reserve.addEventListener('click', () => {
        //     location.href = this.state.reserveurl
        // })
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
            options: {
                'appkey': appkey,
                'isbn': this.state.options.isbn,
                'systemid': this.state.options.systemid
            }
        })
        console.log(`State was Changed: ${JSON.stringify(this.state)}`)
    }
    setISBN(isbn: string): void {
        this.setState({
            options: {
                'appkey': this.state.options.appkey,
                'isbn': isbn,
                'systemid': this.state.options.systemid
            }
        })
    }
    setSystemID(systemid: string): void {
        this.setState({
            options: {
                'appkey': this.state.options.appkey,
                'isbn': this.state.options.isbn,
                'systemid': systemid
            }
        })
    }
    //
    setBookInfo(bookInfo: BookInfo): void {
        this.setState({ bookInfo: bookInfo })
    }
    //
    setIsLoading(state: boolean): void {
        this.setState({ isLoading: state })
    }
    setData(d: data): void {
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

                <Camera />

                <BookData
                    setter={{
                        bookInfo: this.setBookInfo,
                        isLoading: this.setIsLoading,
                        data: this.setData
                    }}
                    isbn={this.state.options.isbn}
                    options={this.state.options} />
            </React.Fragment>
        )
    }
}
