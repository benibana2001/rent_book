import * as React from 'react'

import { LibData } from '../../../api/Calil'

import Icon from '@mdi/react'
import { mdiBank, mdiHome, mdiBookshelf, mdiBookSearch } from '@mdi/js'
import styled from 'styled-components'

interface IProps {
  data: LibData[]
}

const List = styled.li`
  display: flex;
  justify-content: space-between;

  margin-bottom: 8px;
`

const LibraryName = styled.span`
  font-size: 16px;
  padding-left: 6px;
  color: #3d3d3d;
`

const BookStatus = styled.span`
  font-size: 16px;
  margin-right: 16px;
  color: #9f9f9f;
`

const ResultList: React.FunctionComponent<IProps> = (props) => {
  return <ul>{list()}</ul>

  function list() {
    return props.data.map((data) => {
      const libraryName = data.name
      const bookStatus = data.status
      return (
        <List key={data.id}>
          <div>
            <Icon
              path={mdiBank}
              title="Library Icon"
              size="20px"
              color="#9F9F9F"
            />
            <LibraryName>{libraryName}</LibraryName>
          </div>

          <div>
            <span>
              <Icon
                path={mdiBookshelf}
                title="Tab Icon"
                size="20px"
                color="#9F9F9F"
              />
              <BookStatus>{bookStatus}</BookStatus>
            </span>
          </div>
        </List>
      )
    })
  }
}

export default ResultList
