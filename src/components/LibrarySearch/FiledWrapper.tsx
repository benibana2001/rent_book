import * as React from 'react'

import styled from 'styled-components'
import Icon from '@mdi/react'

interface WrapperProps {
  children: React.ReactNode
  icon: string
}

const FieldWrapper: React.FunctionComponent<WrapperProps> = (
  props: WrapperProps
) => {
  return (
    <Outer>
      {BackgroundIcon(props.icon)}
      {props.children}
    </Outer>
  )
}

const Outer = styled.div`
  display: inline-flex;
  justify-content: center;
  padding-top: 16px;

  &:first-child{
      padding-top: 20px;
  }

  &:last-child{
      padding-bottom: 20px;
  }
`

const BackgroundIcon = (icon: string) => (
  <Icon path={icon} title="icon" size="24px" color="#9f9f9f" />
)

export default FieldWrapper