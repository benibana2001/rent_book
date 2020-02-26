import * as React from 'react'

import ResultList from './components/ResultList'
import { LibData } from '../../api/Calil'

interface IProps {
    data: LibData[],
    reserveurl: string,
    setter: {
        data: Function
    }
}

const ResultView: React.SFC<IProps> = props => {
    // TODO: any型やめる
    const clearLibData = (): void => {
        const defaultData: any = {
            libkey: null,
            reserveurl: ''
        }
        props.setter.data(defaultData)
    }
    const isData = (): boolean => props.data !== null
    // TODO: 蔵書がない時
    const existBook = (): boolean => {
        const nullkey: string = 'xxx'
        return isData() && props.reserveurl !== nullkey
    }
    const moveTo = (): void => { location.href = props.reserveurl }
    return (
        <div id='result'>
            {existBook() && (
                <div>
                    <ResultList data={props.data} />
                    <button id="buttonReserve" type="button" className="mdl-button" onClick={moveTo}>予約</button>
                    <button type="button" className="mdl-button close" onClick={clearLibData}>とじる</button>
                </div>
            )}
        </div>
    )
}

// <Toast text='蔵書はありませんでした。' button={<button type="button" className="mdl-button close" onClick={this.clearLibData}>とじる</button>} />

export default ResultView