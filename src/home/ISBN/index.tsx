import * as React from 'react'
import { FieldISBN } from './components/FieldISBN'

export { ISBN }
class ISBN extends React.Component<{ setOptions: { isbn: Function, systemID: Function } }> {
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
    //
    render() {
        return (
            <div className="content">
                <div className="div-isbn">
                    <p>ISBNで調べる</p>
                    <form onSubmit={this.handleSubmit}>
                        <FieldISBN setISBN={this.props.setOptions.isbn} />
                        {/* <FieldSystemID setSystemID={this.props.setOptions.systemID} /> */}
                    </form>
                </div>
            </div>
        )
    }
}
