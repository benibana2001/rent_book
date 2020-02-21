import * as React from 'react'

import { data as TokyoLibraryData } from '../api/data_tokyo_library'
import { Calil } from '../api/Calil'
import { LibRequest, LibResponse } from './interfaces'
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
// Use Calil API.
const fetchLibrayInfo = async (o: LibRequest): Promise<LibResponse> => {
    let c: Calil = new Calil(o)
    let res: LibResponse = await c.search()
    return res
}
//
const PrefectureView: React.SFC<IProps> = props => {
    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        event.persist()
        props.setter.systemID(event.target.value)
    }
    const handleClick = async(): Promise<void> => {
        props.setter.isLoading(true)
        dispatchLibraryInfo(await fetchLibrayInfo(props.libRequest))
        props.setter.inputtingPref(false)
        props.setter.isLoading(false)
    }
    const dispatchLibraryInfo = (res: LibResponse): void => {
        let data = res
        if (!res) {
            console.log('Data is none')
            // 伝搬のため、空のデータをセットする
            const nullkey: string = 'xxx'
            data = {
                'libkey': [],
                'reserveurl': nullkey
            }
        }
        props.setter.data(data)
    }
    return (
        <React.Fragment>
            {props.inputtingPref && (
                <div id="inputtingPref">
                    調べる地域の選択
                    <Pref
                        handleChangeSelect={handleChangeSelect} />
                    <button onClick={handleClick} className="mdl-button mdl-js-button mdl-js-ripple-effect">蔵書を検索</button>
                </div>
            )}
        </React.Fragment>
    )
}

interface IPrefProps {
    handleChangeSelect: (event: React.ChangeEvent<HTMLElement>) => void
}

const Pref: React.SFC<IPrefProps> = props => {
    return (
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
            <select name="system_id" className="mdl-textfield__input" id='systemid' onChange={props.handleChangeSelect}>
                <option></option>
                {TokyoLibraryData.map((item, index) =>
                    <option key={index} value={item[0]}>{item[1]}</option>
                )}
            </select>
            <label className="mdl-textfield__label" htmlFor="octane">区を選択</label>
        </div >
    )
}

export default PrefectureView