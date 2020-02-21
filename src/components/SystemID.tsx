import * as React from 'react'

import { data as TokyoLibraryData } from '../api/data_tokyo_library'
import { Calil } from '../api/Calil'
import { LibRequest, LibResponse } from 'src/interfaces'
//
interface IProps {
    libRequest: LibRequest,
    setter: {
        isLoading: Function,
        systemID: Function,
        data: Function,
        inputtingPref: Function
    },
    inputtingPref: boolean
}
class SystemID extends React.Component<IProps>  {
    constructor(props: IProps) {
        super(props)
    }
    public componentDidUpdate(prevProps: any) {
        if (prevProps.inputtingPref !== this.props.inputtingPref) {
            if (this.props.inputtingPref) {
                this.displayModal()
            } else {
                console.log('close')
            }
        }
    }
    private displayModal = (): void => {
        const dialogLoading: HTMLDialogElement = document.getElementById('inputtingPref') as HTMLDialogElement
        dialogLoading.showModal()
    }
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.persist()
        this.props.setter.systemID(event.target.value)
    }
    private handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        event.persist()
        this.props.setter.systemID(event.target.value)
    }
    //
    private handleClick = (): void => {
        this.fetchLibrayInfo(this.props.libRequest)
        this.props.setter.inputtingPref(false)
    }
    /**
      * Use Calil API.
      */
    public fetchLibrayInfo = async (o: LibRequest): Promise<LibResponse> => {
        this.props.setter.isLoading(true)

        let c: Calil = new Calil(o)
        let res: LibResponse = await c.search()
        if (!res) {
            console.log('Data is none')
            // 伝搬のため、空のデータをセットする
            const nullkey: string = 'xxx'
            this.props.setter.data({
                'libkey': [],
                'reserveurl': nullkey
            })
        } else {
            this.props.setter.data(res)
        }

        // debug
        // await this.fetchBookInfo(o.isbn)

        this.props.setter.isLoading(false)
        console.log('delete isLoading')

        // dialog
        // this.initModal()

        return res
    }
    render() {
        if (this.props.inputtingPref) {
            return (
                <dialog id="inputtingPref">
                    調べる地域の選択
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
                        <select name="system_id" className="mdl-textfield__input" id='systemid' onChange={this.handleChangeSelect}>
                            <option></option>
                            {TokyoLibraryData.map((item, index) =>
                                <option key={index} value={item[0]}>{item[1]}</option>
                            )}
                        </select>
                        <label className="mdl-textfield__label" htmlFor="octane">区を選択</label>
                    </div >
                    <button onClick={this.handleClick} className="mdl-button mdl-js-button mdl-js-ripple-effect">
                        蔵書を検索
                    </button>
                </dialog>
            )
        } else return null
    }
}

export default SystemID