import styled from 'styled-components'

export const Medium = styled.div`
  width: 124px;
  height: 38px;

  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: bold;

  border-radius: 3px;
`

export const MediumColored = styled(Medium)`
  background: #51e9d7;
  color: #ffffff;
`

export const MediumColoredTransparent = styled(Medium)`
  background: rgba(81, 233, 215, 0.4);
  color: rgba(255, 255, 255, 0.8);
`
