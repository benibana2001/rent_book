// View
import * as React from 'react'
import '../scss/app.scss'
import { Calil, options, dataRow, data } from '../api/Calil'
// API
import { OpenBD, BookInfo } from '../OpenBD'
// Library
import { config, dom, library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import 'material-design-lite'
import 'material-design-lite/material.min.css'
//
export { Isbn }
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
                <div className='isbn-container'>
                    <div className='isbn-inner'>
                        <div className='leading-icon'>
                            <i className="fas fa-book fa-1x"></i>
                        </div>
                        <div className='label'>ISBN</div>
                        <div className='input-text'>
                            <input value={this.state.isbn} type="text" onChange={this.handleChange} placeholder='123456789012' />
                        </div>
                    </div>
                    <div className='trailing-icon'>
                        <div>
                            <i className='far fa-times-circle fa-2x font-trailing-icon'></i>
                        </div>
                    </div>
                </div>
                <div className='helper-text'>Enter ISBN which the book of you want to check.</div>
            </div>
        )
    }
}

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
            // <div id='systemid'>
            //     <input type="radio" name="system_id" value="Tokyo_Setagaya" id="system_id_setagaya" onChange={this.handleChange} /> <label htmlFor="system_id_setagaya">Setagaya</label>
            //     <input type="radio" name="system_id" value="Tokyo_Shibuya" id="system_id_shibuya" onChange={this.handleChange} /> <label htmlFor="system_id_shibuya">Shibuya</label>
            <div className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
                <select name="system_id" className="mdl-textfield__input" id='systemid' onChange={this.handleChangeSelect}>
                    <option></option>
                    <option value="Tokyo_Setagaya" >世田谷区</option>
                    <option value="Tokyo_Shibuya">渋谷区</option>
                </select>
                <label className="mdl-textfield__label" htmlFor="octane">区を選択</label>
            </div >
            // </div>
        )
    }
}

class Form extends React.Component<{ f: Function }, { o: options }> {
    constructor(props: { f: Function }) {
        super(props)
        this.state = {
            o: {
                'appkey': '',
                'isbn': '',
                'systemid': ''
            }
        }
        this.setAppkey = this.setAppkey.bind(this)
        this.setISBN = this.setISBN.bind(this)
        this.setSystemID = this.setSystemID.bind(this)
        this.fetchBook = this.fetchBook.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        let c: Calil = new Calil(o)
        let data: data = await c.search()
        if (!data) {
            console.log('Data is none')
        } else {
            this.props.f(data)
        }

        // Fetch OpenBD
        const O: OpenBD = new OpenBD()
        let bookInfo: BookInfo = await O.search(o.isbn)
        console.log(`bookInfo: ${JSON.stringify(bookInfo)}`)

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
            <form onSubmit={this.handleSubmit}>
                <FormFieldISBN f={this.setISBN} />
                <FormFieldSystemID f={this.setSystemID} />
                <div id='submit'>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

class Card extends React.Component<{ libData: { id: number, name: string, status: string }, reserveurl: string }> {
    constructor(props: { libData: { id: number, name: string, status: string }, reserveurl: string }) {
        super(props)
    }
    componentDidMount() {
        library.add(faUniversity)
        dom.i2svg()
    }
    card =
        <li className="card mdl-list__item mdl-list__item--two-line">
            <span className="mdl-list__item-primary-content">
                <i className="fas fa-university mdl-list__item-avatar fa-1x"></i>
                <span>{this.props.libData.name}</span>
                {/* <span className="mdl-list__item-sub-title">XX Episodes</span> */}
            </span>
            <span className="mdl-list__item-secondary-content">
                <span className="mdl-list__item-secondary-info">{this.props.libData.status}</span>
                <span className="mdl-list__item-secondary-action">
                    <i className="fas fa-book fa-2x"></i>
                </span>
            </span>
        </li>
    render() {
        if (this.props.reserveurl === '') {
            return this.card
        } else {
            return this.card
        }
    }
}

class CardList extends React.Component<{ data: dataRow[], reserveurl: string }, { data: dataRow[] }> {
    constructor(props: { data: dataRow[], reserveurl: string }) {
        super(props)
        this.state = {
            data: null
        }
    }

    componentDidMount() {
    }

    render() {
        if (this.props.data !== null) {
            return (
                <ul className='demo-list-two mdl-list'>
                    {this.props.data.map(data =>
                        <Card key={data.id} libData={data} reserveurl={this.props.reserveurl} />
                    )}
                </ul>
            )
        } else {
            return (
                // <div className='card-list'></div>
                <ul className="demo-list-two mdl-list">
                    <li className="mdl-list__item mdl-list__item--two-line">
                        <span className="mdl-list__item-primary-content">
                            {/* <i className="material-icons mdl-list__item-avatar">person</i> */}
                            <i className="fas fa-university mdl-list__item-avatar fa-1x"></i>
                            <span>世田谷</span>
                            <span className="mdl-list__item-sub-title">62 Episodes</span>
                        </span>
                        <span className="mdl-list__item-secondary-content">
                            <span className="mdl-list__item-secondary-info">蔵書あり</span>
                            <a className="mdl-list__item-secondary-action" href="#">
                                <i className="fas fa-book fa-2x"></i>
                            </a>
                        </span>
                    </li>
                </ul>
            )
        }
    }
}

class Isbn extends React.Component<{}, { libkey: dataRow[], reserveurl: string }> {
    constructor(props: {}) {
        super(props)
        this.state = {
            libkey: null,
            reserveurl: ''
        }
        this.setData = this.setData.bind(this)
    }
    setData(d: data): void {
        this.setState({ libkey: d.libkey })
        this.setState({ reserveurl: d.reserveurl })
        console.log(this.state.libkey)
    }
    render() {
        return (
            <div className='reference-libray'>
                <Form f={this.setData} />
                <CardList data={this.state.libkey} reserveurl={this.state.reserveurl} />
                <Reserve reserveurl={this.state.reserveurl} />
            </div>
        )
    }
}

// TODO: リンクを削除して蔵書アイコンにリンクを埋め込む
class Reserve extends React.Component<{ reserveurl: string }>{
    constructor(props: { reserveurl: string }) {
        super(props)
    }
    render() {
        if (this.props.reserveurl === '') {
            return (
                <div></div>
            )
        } else {
            return (
                <div>
                    <a href={this.props.reserveurl}>予約画面へ</a>
                </div>
            )
        }
    }

}

// class Isbn extends React.Component {
//     render() {
//         return (
//             <div>
//                 <ReferenceLibrary />
//             </div>
//         )
//     }
// }

/*
 * Data Sample
"books": {
            "4334926940": {
            "Tokyo_Setagaya": {"status": "OK", "reserveurl": "http://libweb.tokyo.jp/123",
"libkey": {"玉川台": "貸出可", "世田谷": "貸出中", "経堂": "館内のみ"}}
    },
"4088700104": {
            "Tokyo_Setagaya": {"status": "Running", "reserveurl": "",
"libkey": {}}
    }
  },
  */
