import * as React from 'react'
import './scss/app.scss'
import { Calil, options, dataRow } from './Calil'
export { View }

class InputISBN extends React.Component<{ f: Function }, { isbn: string }> {
    constructor(props: { f: Function }) {
        super(props)
        this.state = { isbn: '' }
        this.handleChange = this.handleChange.bind(this)
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
            <div>
                ISBN: <input id="isbn" value={this.state.isbn} type="text" onChange={this.handleChange} />
            </div>
        )
    }
}

class RadioSystemID extends React.Component<{ f: Function }> {
    constructor(props: { f: Function }) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        event.persist()
        this.props.f(event.target.value)
    }
    render() {
        return (
            <div>
                <input type="radio" name="system_id" value="Tokyo_Setagaya" id="system_id_setagaya" onChange={this.handleChange} /> <label htmlFor="system_id_setagaya">Setagaya</label>
                <input type="radio" name="system_id" value="Tokyo_Shibuya" id="system_id_shibuya" onChange={this.handleChange} /> <label htmlFor="system_id_shibuya">Shibuya</label>
            </div>
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
    public async fetchBook(o: options): Promise<dataRow[]> {
        let c: Calil = new Calil(o)
        let data: dataRow[] = await c.search()
        this.props.f(data)
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
                <InputISBN f={this.setISBN} />
                <RadioSystemID f={this.setSystemID} />
                <div>
                    <input type="submit" value="submit" />
                </div>
            </form>
        )
    }
}

class Card extends React.Component<{ libData: { id: number, name: string, status: string } }> {
    constructor(props: { libData: { id: number, name: string, status: string } }) {
        super(props)
    }
    render() {
        return (
            <fieldset>
                {this.props.libData.name}: {this.props.libData.status}
            </fieldset>
        )
    }
}

class ReferenceLibray extends React.Component<{}, { data: dataRow[] }> {
    constructor(props: {}) {
        super(props)
        this.state = {
            data: null
        }
        this.setData = this.setData.bind(this)
    }
    setData(d: dataRow[]): void {
        this.setState({ data: d })
        console.log(this.state.data)
    }
    render() {
        return (
            <div>
                <Form f={this.setData} />
                <CardList data={this.state.data} />
            </div>
        )
    }
}

class CardList extends React.Component<{ data: dataRow[] }, { data: dataRow[] }> {
    constructor(props: { data: dataRow[] }) {
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
                <div>
                    {this.props.data.map(data =>
                        < li key={data.id} >
                            <Card libData={data} />
                        </li>
                    )}
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

class View extends React.Component {
    render() {
        return (
            <div>
                <ReferenceLibray />
            </div>
        )
    }
}

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
