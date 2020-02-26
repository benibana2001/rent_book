import * as React from 'react'
import { data as TokyoLibraryData } from '../../api/data_tokyo_library'

interface IProps {
    setter: {
        systemID: Function
    }
}
const PrefArea: React.SFC<IProps> = props => {
    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        event.persist()
        props.setter.systemID(event.target.value)
    }
    return (
        <div className="content">
            <div className="div-isbn">
                <p>市区町村を選んでね</p>
                {/* <select name="system_id" className="mdl-textfield__input" id='systemid' onChange={props.handleChangeSelect}> */}
                <select name="system_id" className="mdl-textfield__input" id='systemid' onChange={handleChangeSelect} >
                    <option value="">市区町村を選んでね</option>
                    {TokyoLibraryData.map((item, index) =>
                        <option key={index} value={item[0]}>{item[1]}</option>
                    )}
                </select>
                {/* <label className="mdl-textfield__label" htmlFor="octane">区を選択</label> */}
            </div>
        </div>
    )
}

export default PrefArea