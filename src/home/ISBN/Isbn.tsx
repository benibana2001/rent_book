// View
import * as React from 'react'
import './styles.scss'
import { Calil, options, dataRow, data } from '../../api/Calil'
import { TitleSearch } from './components/ISBNTitleSearch'
import { Form, CardList } from './components/ISBNForm'
// Library
import 'material-design-lite'
import 'material-design-lite/material.min.css'
//
export { Isbn }

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
    componentDidMount() {
        let dialog = document.querySelector('dialog')
        dialog.querySelector('.close').addEventListener('click', () => {
            dialog.close()
        })
        // Add link to reserve-button
        // TODO: Cardクラス を dialogにする
        const reserve: HTMLElement = document.getElementById('buttonReserve')
        reserve.addEventListener('click', () => {
            location.href = this.state.reserveurl
        })
    }
    render() {
        return (
            <div className='reference-libray'>
                <div>
                    <dialog className="mdl-dialog">
                        <div className="mdl-dialog__content">
                            <CardList data={this.state.libkey} reserveurl={this.state.reserveurl} />
                        </div>
                        <div className="mdl-dialog__actions">
                            <button id="buttonReserve" type="button" className="mdl-button">予約</button>
                            <button type="button" className="mdl-button close">とじる</button>
                        </div>
                    </dialog>
                </div>
                <Form f={this.setData} />
                <TitleSearch />
            </div>
        )
    }
}
