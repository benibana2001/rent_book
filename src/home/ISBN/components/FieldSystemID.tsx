import * as React from 'react'
import { data as TokyoLibraryData } from '../../../api/data_tokyo_library'

export { FieldSystemID}
/**
 * Systemid indicates Tokyo_XXX-Ku at Calil API
 * Systemid はCalilAPI において市区町村の指定に使用されます。
 */
class FieldSystemID extends React.Component<{ setSystemID: Function }> {
    constructor(props: { setSystemID: Function }) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        event.persist()
        this.props.setSystemID(event.target.value)
    }
    handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
        event.persist()
        this.props.setSystemID(event.target.value)
    }
    render() {
        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
                <select name="system_id" className="mdl-textfield__input" id='systemid' onChange={this.handleChangeSelect}>
                    <option></option>
                    {TokyoLibraryData.map((item, index) =>
                        <option key={index} value={item[0]}>{item[1]}</option>
                    )}
                </select>
                <label className="mdl-textfield__label" htmlFor="octane">区を選択</label>
            </div >
        )
    }
}
