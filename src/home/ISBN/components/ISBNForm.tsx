// View
import * as React from 'react'
import { Calil, options, dataRow, data } from '../../../api/Calil'
// API
import { OpenBD, BookInfo } from '../../../api/OpenBD'
import { data as TokyoLibraryData } from '../../../api/data_tokyo_library'
// Library
import { config, dom, library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import 'material-design-lite'
import 'material-design-lite/material.min.css'

import { Loading } from '../../../components/loading'

export { Form }
class FormFieldISBN extends React.Component<{ f: Function, setBookInfo: Function }, { isbn: string }> {
    constructor(props: { f: Function, setBookInfo: Function }) {
        super(props)
        this.state = { isbn: '' }
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * To use fontawsome, we need to replace <i> to <svg>, so that
     * do these function.
     * Replace should be done after DOM rendering.
     * 
     * More detail: 
     *   - https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core
     *   - https://fontawesome.com/how-to-use/with-the-api/setup/getting-started
     */
    componentDidMount() {
        library.add(faBook, faTimesCircle, faUniversity)
        dom.i2svg()
    }

    /**
     * 
     * @param event 
     */
    async handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // If reference target in the async function, to do persit().
        event.persist()
        let value: string = event.target.value
        this.setState({ isbn: value })
        // Set value to parent class.
        this.props.f(value)
        // Use OpenBD API.
        // Stateへの入力値反映には若干の遅延があるため, eventの値を使用してAPI通信を行う
        if (value.length === 10 || value.length === 13) {
            let bookInfo: BookInfo = await this.fetchBookInfo(event.target.value)
            this.props.setBookInfo(bookInfo)
        } else {
            this.props.setBookInfo(null)
        }
    }
    /**
     * 
     */
    public async fetchBookInfo(isbn: string): Promise<BookInfo> {
        // Fetch OpenBD
        const O: OpenBD = new OpenBD()
        let bookInfo: BookInfo = await O.search(isbn)
        console.log(`bookInfo: ${JSON.stringify(bookInfo)}`)
        return bookInfo
    }
    /**
     * 
     */
    render() {
        return (
            <div id='isbn'>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4" onChange={this.handleChange} />
                    <label className="mdl-textfield__label" htmlFor="sample4">ISBNを入力</label>
                    <span className="mdl-textfield__error">Input is not a number!</span>
                </div>
            </div>
        )
    }
}

/**
 * Systemid indicates Tokyo_XXX-Ku at Calil API
 * Systemid はCalilAPI において市区町村の指定に使用されます。
 */
class FormFieldSystemID extends React.Component<{ f: Function }> {
    constructor(props: { f: Function }) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        event.persist()
        this.props.f(event.target.value)
    }
    handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
        event.persist()
        this.props.f(event.target.value)
    }
    render() {
        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
                <select name="system_id" className="mdl-textfield__input" id='systemid' onChange={this.handleChangeSelect}>
                    <option></option>
                    {TokyoLibraryData.map((item, index) =>
                        <option key={index} value={item[0]}>{item[1]}</option>
                    )}

                </select>
                <label className="mdl-textfield__label" htmlFor="octane">区を選択</label>
            </div >
        )
    }
}

class Form extends React.Component<{ f: Function }, { o: options, isLoading: boolean, bookInfo: BookInfo }> {
    constructor(props: { f: Function }) {
        super(props)
        this.state = {
            o: {
                'appkey': '',
                'isbn': '',
                'systemid': ''
            },
            isLoading: false,
            bookInfo: null
        }
        this.setAppkey = this.setAppkey.bind(this)
        this.setISBN = this.setISBN.bind(this)
        this.setSystemID = this.setSystemID.bind(this)
        this.fetchLibrayInfo = this.fetchLibrayInfo.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.initModal = this.initModal.bind(this)
        this.setBookInfo = this.setBookInfo.bind(this)
    }
    //
    componentDidMount() {
        let form = document.querySelector('form')
        form.addEventListener('submit', (event) => {
            // let data: FormData = new FormData(form)
            event.preventDefault()
        })
        this.setAppkey(process.env.APP_API_KEY)
    }
    //
    // modal
    initModal(): void {
        const dialog = document.querySelector('dialog')
        dialog.showModal()
    }
    //
    setAppkey(appkey: string): void {
        this.setState({
            o: {
                'appkey': appkey,
                'isbn': this.state.o.isbn,
                'systemid': this.state.o.systemid
            }
        })
        console.log(`State was Changed: ${JSON.stringify(this.state)}`)
    }
    //
    setISBN(isbn: string): void {
        this.setState({
            o: {
                'appkey': this.state.o.appkey,
                'isbn': isbn,
                'systemid': this.state.o.systemid
            }
        })
    }
    //
    setSystemID(systemid: string): void {
        this.setState({
            o: {
                'appkey': this.state.o.appkey,
                'isbn': this.state.o.isbn,
                'systemid': systemid
            }
        })
    }
    //
    setBookInfo(bookInfo: BookInfo): void {
        this.setState({bookInfo: bookInfo})
    }
    /**
     * Use Calil API.
     */
    public async fetchLibrayInfo(o: options): Promise<data> {
        this.setState({ isLoading: true })

        let c: Calil = new Calil(o)
        let data: data = await c.search()
        if (!data) {
            console.log('Data is none')
        } else {
            this.props.f(data)
        }

        // debug
        // await this.fetchBookInfo(o.isbn)

        this.setState({ isLoading: false })

        // dialog
        this.initModal()

        return data
    }

    /**
     * 
     */
    handleSubmit(event: React.FormEvent): void {
        this.fetchLibrayInfo(this.state.o)
        event.preventDefault()
    }
    /**
 * 
 */
    render() {
        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--4-col div-isbn">
                    ISBNで調べる
                    <form onSubmit={this.handleSubmit}>
                        <FormFieldISBN f={this.setISBN} setBookInfo={this.setBookInfo} />
                        <FormFieldSystemID f={this.setSystemID} />
                        <div id='submit'>
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                Submit
                            </button>
                        </div>
                        <FormBookInfo bookInfo={this.state.bookInfo} />
                    </form>
                </div>
                <Loading isLoading={this.state.isLoading} />
            </div>
        )
    }
}

// OpenBD を使用してISBN入力時に自動で表示するエリア
class FormBookInfo extends React.Component<{ bookInfo: BookInfo }>{
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
