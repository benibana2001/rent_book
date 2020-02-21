import * as React from 'react'
// Library
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faUniversity } from '@fortawesome/free-solid-svg-icons'
//
interface IProps {
    libData: {
        id: number,
        name: string,
        status: string
    },
    reserveurl: string
}

const ResultList: React.SFC<IProps> = props => {
    library.add(faUniversity)
    dom.i2svg()
    return (
        <li className="card mdl-list__item ">
            <span className="mdl-list__item-primary-content">
                <i className="fas fa-university fa-1x"></i>
                <span>{props.libData.name}</span>
            </span>
            <span className="mdl-list__item-secondary-content">
                <span className="mdl-list__item-secondary-action">
                    {props.libData.status}<i className="fas fa-book fa-1x"></i>
                </span>
            </span>
        </li>
    )
}

export default ResultList