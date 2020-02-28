import * as React from 'react'

import ResultList from './components/ResultList'
import { LibResponse } from '../../api/Calil'
import { BookStatus } from '../../AppLayout'
import { useHistory } from 'react-router-dom'

interface IProps {
    bookStatus: BookStatus,
    response: LibResponse,
    setBookStatus: (bookStatus: BookStatus) => void
    setLibResponse: (res: LibResponse) => void,
}
const defaultResponse: LibResponse = {
    libkey: null,
    reserveurl: ''
}
const moveTo = (url: string) => () => { location.href = url }

const ResultView: React.FunctionComponent<IProps> = props => {
    const history = useHistory()
    const clearLibData = (): void => {
        props.setBookStatus(BookStatus.NOT_DONE)
        props.setLibResponse(defaultResponse)
    }
    return (
        <div id='result'>
            {props.bookStatus === BookStatus.EXIST
                ? (
                    <div>
                        <ResultList data={props.response.libkey} />
                        <button id="buttonReserve" type="button" className="mdl-button" onClick={moveTo(props.response.reserveurl)}>予約</button>
                        {/* <button type="button" className="mdl-button close" onClick={clearLibData}>とじる</button> */}
                        <button type="button" className="mdl-button close" onClick={() => history.push('/home')}>もどる</button>

                    </div>
                )
                : (
                    <div>検索結果はないです</div>
                )
            }
        </div>
    )
}

// <Toast text='蔵書はありませんでした。' button={<button type="button" className="mdl-button close" onClick={this.clearLibData}>とじる</button>} />

export default ResultView