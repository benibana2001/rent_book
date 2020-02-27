import * as React from 'react'

import ResultList from './components/ResultList'
import { LibResponse } from '../../api/Calil'

interface IProps {
    response: LibResponse,
    setLibResponse: Function
}

const defaultData: any = {
    libkey: null,
    reserveurl: ''
}

const ResultView: React.SFC<IProps> = props => {
    const clearLibData = (): void => props.setLibResponse(defaultData)
    const isData = (): boolean => props.response.libkey !== null
    // TODO: 蔵書がない時
    const existBook = (): boolean => {
        const nullkey: string = 'xxx'
        return isData() && props.response.reserveurl !== nullkey
    }
    const moveTo = (): void => { location.href = props.response.reserveurl }
    return (
        <div id='result'>
            {existBook() && (
                <div>
                    <ResultList data={props.response.libkey} />
                    <button id="buttonReserve" type="button" className="mdl-button" onClick={moveTo}>予約</button>
                    <button type="button" className="mdl-button close" onClick={clearLibData}>とじる</button>
                </div>
            )}
        </div>
    )
}

// <Toast text='蔵書はありませんでした。' button={<button type="button" className="mdl-button close" onClick={this.clearLibData}>とじる</button>} />

export default ResultView