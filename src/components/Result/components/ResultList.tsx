import * as React from 'react'
// Library
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faUniversity } from '@fortawesome/free-solid-svg-icons'

import { LibData } from '../../../api/Calil'

interface IProps {
  data: LibData[]
}

const ResultList: React.FunctionComponent<IProps> = (props) => {
  library.add(faUniversity)
  dom.i2svg()

  return <ul className="mdl-list">{list()}</ul>

  function list() {
    return props.data.map((data) => (
      <li key={data.id} className="card mdl-list__item ">
        <span className="mdl-list__item-primary-content">
          <i className="fas fa-university fa-1x"></i>
          <span>{data.name}</span>
        </span>

        <span className="mdl-list__item-secondary-content">
          <span className="mdl-list__item-secondary-action">
            {data.status}
            <i className="fas fa-book fa-1x"></i>
          </span>
        </span>
      </li>
    ))
  }
}

export default ResultList
