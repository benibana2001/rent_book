import * as React from 'react'

import { LibData } from '../../../../api/Calil'

import Icon from '@mdi/react'
import { mdiBank, mdiHome, mdiBookshelf, mdiBookSearch } from '@mdi/js'

interface IProps {
  data: LibData[]
}

const ResultList: React.FunctionComponent<IProps> = (props) => {
  return <ul>{list()}</ul>

  function list() {
    return props.data.map((data) => (
      <li key={data.id}>
        <span>
          <Icon path={mdiBank} title="Tab Icon" size="16px" />
          <span>{data.name}</span>
        </span>

        <span>
          <span>
            {data.status}
            <Icon path={mdiBookshelf} title="Tab Icon" size="16px" />
          </span>
        </span>
      </li>
    ))
  }
}

export default ResultList
