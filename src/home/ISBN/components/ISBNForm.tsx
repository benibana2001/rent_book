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
class FormFieldISBN extends React.Component<{ f: Function }, { isbn: string }> {
    constructor(props: { f: Function }) {
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
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // If reference target in the async function, to do persit().
        event.persist()
        this.setState({ isbn: event.target.value })
        this.props.f(event.target.value)
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
        console.log(TokyoLibraryData)
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

class Form extends React.Component<{ f: Function }, { o: options, isLoading: boolean }> {
    constructor(props: { f: Function }) {
        super(props)
        this.state = {
            o: {
                'appkey': '',
                'isbn': '',
                'systemid': ''
            },
            isLoading: false
        }
        this.setAppkey = this.setAppkey.bind(this)
        this.setISBN = this.setISBN.bind(this)
        this.setSystemID = this.setSystemID.bind(this)
        this.fetchBook = this.fetchBook.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.initModal = this.initModal.bind(this)
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
    /**
     * Use Calil API.
     */
    public async fetchBook(o: options): Promise<data> {
        this.setState({ isLoading: true})
        
        let c: Calil = new Calil(o)
        let data: data = await c.search()
        if (!data) {
            console.log('Data is none')
        } else {
            this.props.f(data)
        }

        this.setState({ isLoading: false})

        // Fetch OpenBD
        const O: OpenBD = new OpenBD()
        let bookInfo: BookInfo = await O.search(o.isbn)
        console.log(`bookInfo: ${JSON.stringify(bookInfo)}`)

        // dialog
        this.initModal()

        return data
    }
    /**
     * 
     */
    handleSubmit(event: React.FormEvent): void {
        this.fetchBook(this.state.o)
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
                        <FormFieldISBN f={this.setISBN} />
                        <FormFieldSystemID f={this.setSystemID} />
                        <div id='submit'>
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <Loading isLoading={this.state.isLoading} />
            </div>
        )
    }
}
