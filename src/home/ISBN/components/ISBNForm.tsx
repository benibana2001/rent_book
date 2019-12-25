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

export { Form }
class FormFieldISBN extends React.Component<{ setISBN: Function }> {
    constructor(props: { setISBN: Function }) {
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
     */
    async handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        // If reference target in the async function, to do persit() is required.
        event.persist()
        let value: string = event.target.value
        this.setState({ isbn: value })
        // Set value to parent class.
        this.props.setISBN(value)
    }
    
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
class FormFieldSystemID extends React.Component<{ setSystemID: Function }> {
    constructor(props: { setSystemID: Function }) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        event.persist()
        this.props.setSystemID(event.target.value)
    }
    handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
        event.persist()
        this.props.setSystemID(event.target.value)
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

class Form extends React.Component<{ setOptions: { isbn: Function, systemID: Function } }> {
    constructor(props: { setOptions: { isbn: Function, systemID: Function } }) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //
    componentDidMount() {
        let form = document.querySelector('form')
        form.addEventListener('submit', (event) => {
            // let data: FormData = new FormData(form)
            event.preventDefault()
        })
    }
    
    //
    handleSubmit(event: React.FormEvent): void {
        event.preventDefault()
    }
    
    render() {
        return (
            <div className="">
                <div className="div-isbn">
                    ISBNで調べる
                    <form onSubmit={this.handleSubmit}>
                        <FormFieldISBN setISBN={this.props.setOptions.isbn} />
                        <FormFieldSystemID setSystemID={this.props.setOptions.systemID} />
                    </form>
                </div>
            </div>
        )
    }
}
