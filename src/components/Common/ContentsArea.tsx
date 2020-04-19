import * as React from 'react'
import styled from 'styled-components'

const ContentsArea: React.FunctionComponent<PropsContentsArea> = (
  props: PropsContentsArea
) => {
  return (
    <React.Fragment>
      <ContentsTitle>{props.title}</ContentsTitle>
      {props.children}
    </React.Fragment>
  )
}

interface PropsContentsArea {
  children: React.ReactNode
  title: string
}

const margin = {
  middle: 16,
  small: 10,
}

const ContentsTitle = styled.h3`
  font-size: 16px;
  margin-left: ${margin.middle}px;
  padding: ${margin.middle}px;
  padding-left: 0;
  padding-right: 0;
`

export default ContentsArea
