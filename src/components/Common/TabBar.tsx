import * as React from 'react'
import styled from 'styled-components'

const TabBar: React.FunctionComponent = () => {
  return (
    <Outer>
      <TabIcon />
      <TabIcon />
      <TabIcon />
      <TabIcon />
      <TabIcon />
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
  height: 83px;
  background: #ffffff;

  border-top: 1px solid #c7c7c7;

  display: flex;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: 0;
`

const TabIcon = styled.div`
  width: 48px;
  height: 49px;
  background: #c5c5c5;

`

const Button = styled.button<{ primary: boolean }>`
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.65em 1.6em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

export default TabBar
