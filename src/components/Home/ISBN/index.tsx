import * as React from 'react'
import FieldISBN from './components/FieldISBN'

interface IProps {
    setISBN: Function
}

class ISBNArea extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }
    //
    public componentDidMount() {
        let form = document.querySelector('form')
        form.addEventListener('submit', (event) => {
            event.preventDefault()
        })
    }
    //
    private handleSubmit = (event: React.FormEvent): void => event.preventDefault()
    //
    render() {
        return (
            <div className="content">
                <div className="div-isbn">
                    <p>A. ISBNから調べる</p>
                    <form onSubmit={this.handleSubmit}>
                        <FieldISBN setISBN={this.props.setISBN} />
                    </form>
                </div>
            </div>
        )
    }
}

export default ISBNArea