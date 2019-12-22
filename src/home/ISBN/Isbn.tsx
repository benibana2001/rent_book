// View
import * as React from 'react'
import './styles.scss'
import { Calil, options, dataRow, data } from '../../api/Calil'
import { TitleSearch } from './components/ISBNTitleSearch'
import { Form} from './components/ISBNForm'
import { ResultList } from './components/ResultList'
// Library
import 'material-design-lite'
import 'material-design-lite/material.min.css'
//
import '../../components/loading.scss'
export { Isbn }

class Isbn extends React.Component<{}, { libkey: dataRow[], reserveurl: string }> {
    constructor(props: {}) {
        super(props)
        this.state = {
            libkey: null,
            reserveurl: ''
        }
        this.setData = this.setData.bind(this)
        this.removeData = this.removeData.bind(this)
    }
    setData(d: data): void {
        this.setState({ libkey: d.libkey })
        this.setState({ reserveurl: d.reserveurl })
        console.log(this.state.libkey)
    }
    removeData(): void {
        this.setState({libkey: null})
        this.setState({ reserveurl: '' })
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

                {/* DIALOG */}
                <div>
                    <dialog className="mdl-dialog">
                        <div className="mdl-dialog__content">
                            <ResultList data={this.state.libkey} reserveurl={this.state.reserveurl} />
                        </div>
                        <div className="mdl-dialog__actions">
                            <button id="buttonReserve" type="button" className="mdl-button">予約</button>
                            <button type="button" className="mdl-button close" onClick={this.removeData}>とじる</button>
                        </div>
                    </dialog>
                </div>
                {/* / DIALOG */}

                <Form f={this.setData} />
                <TitleSearch />
            </div>
        )
    }
}
