import * as React from 'react'
import { dataRow } from '../../api/Calil'
// Library
import { config, dom, library } from '@fortawesome/fontawesome-svg-core'
import { faUniversity } from '@fortawesome/free-solid-svg-icons'
export { Result }
class Card extends React.Component<
    {
        libData: { id: number, name: string, status: string },
        reserveurl: string
    }
    >
{
    constructor(props: { libData: { id: number, name: string, status: string }, reserveurl: string }) {
        super(props)
    }
    componentDidMount() {
        library.add(faUniversity)
        dom.i2svg()
    }
    card =
        <li className="card mdl-list__item ">
            <span className="mdl-list__item-primary-content">
                <i className="fas fa-university fa-1x"></i>
                <span>{this.props.libData.name}</span>
            </span>
            <span className="mdl-list__item-secondary-content">
                <span className="mdl-list__item-secondary-action">
                    {this.props.libData.status}<i className="fas fa-book fa-1x"></i>
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

class Result extends React.Component<{ data: dataRow[], reserveurl: string }> {
    constructor(props: { data: dataRow[], reserveurl: string }) {
        super(props)
        // bind
        this.moveTo = this.moveTo.bind(this)
    }

    componentDidMount() {}

    componentDidUpdate(prevProps: any) {
        if (prevProps.data !== this.props.data) {
            this.displayModal()
        }    }

    displayModal(): void {
        const dialog = document.querySelector('dialog')
        dialog.showModal()
    }

    closeModal(): void {
        const dialog = document.querySelector('dialog')
        dialog.close()
    }

    isData(): boolean {
        if (this.props.data !== null) return true
        return false
    }

    moveTo(): void {
        location.href = this.props.reserveurl
    }

    render() {
        if (this.isData()) {
            console.log(JSON.stringify(this.props.data))
            return (
                <div>
                    <dialog >
                        <div >
                            <ul className='mdl-list'>
                                {this.props.data.map(data =>
                                    <Card key={data.id} libData={data} reserveurl={this.props.reserveurl} />
                                )}
                            </ul>
                            <button id="buttonReserve" type="button" className="mdl-button" onClick={this.moveTo}>予約</button>
                            <button type="button" className="mdl-button close" onClick={this.closeModal}>とじる</button>
                        </div>
                    </dialog>
                </div>
            )
        } else {
            // Dummy Data
            return (
                <div></div>
            )
        }
    }
}
