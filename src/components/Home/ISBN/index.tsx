import * as React from 'react'

import WrapContent from '../WrapContent'
import FieldInput from './components/FieldInput'
import FieldBtnCamera from './components/FieldBtnCamera'

interface IProps {
  setISBN: Function
}

const ISBNArea: React.FunctionComponent<IProps> = (props) => {
  const handleSubmit = (event: React.FormEvent): void => event.preventDefault()

  return (
    <WrapContent>
      <p>探したい本</p>

      <form onSubmit={handleSubmit}>
        <FieldInput setISBN={props.setISBN} />
        <FieldBtnCamera />
      </form>
    </WrapContent>
  )
}

export default ISBNArea
