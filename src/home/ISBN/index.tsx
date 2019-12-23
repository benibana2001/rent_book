// View
import * as React from 'react'
import './styles.scss'
import { Form } from './components/ISBNForm'
// Library
import 'material-design-lite'
import 'material-design-lite/material.min.css'
//
import '../../components/loading.scss'
export { Isbn }

class Isbn extends React.Component<{ f: { removeData: Function }, setOptions: {isbn: Function, systemID: Function} }> {
    constructor(props: { f: { removeData: Function }, setOptions: { isbn: Function, systemID: Function} }) {
        super(props)
    }
    //
    removeData(){
        this.props.f.removeData()
    }
    //
    render() {
        return (
            <div className='reference-libray'>

                {/* DIALOG */}
                <div>
                    <dialog className="mdl-dialog">
                        <div className="mdl-dialog__actions">
                            <button id="buttonReserve" type="button" className="mdl-button">予約</button>
                            <button type="button" className="mdl-button close" onClick={this.removeData}>とじる</button>
                        </div>
                    </dialog>
                </div>
                {/* / DIALOG */}

                <Form setOptions={this.props.setOptions} />
            </div>
        )
    }
}
