import * as React from 'react'

import { data as TokyoLibraryData } from '../../api/data_tokyo_library'
import WrapContent from './WrapContent'

interface IProps {
    setSystemID: Function
}
const PrefArea: React.SFC<IProps> = props => {
    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        event.persist()
        props.setSystemID(event.target.value)
    }
    return (
        <WrapContent>
            <p>市区町村を選んでね</p>
            <select name="system_id" className="mdl-textfield__input" id='systemid' onChange={handleChangeSelect} >
                <option value="">市区町村を選択</option>
                {TokyoLibraryData.map((item, index) =>
                    <option key={index} value={item[0]}>{item[1]}</option>
                )}
            </select>
        </WrapContent>
    )
}

export default PrefArea