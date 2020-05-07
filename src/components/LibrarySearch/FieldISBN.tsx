import * as React from 'react'
import styled from 'styled-components'

import { mdiBookshelf } from '@mdi/js'
import FieldWrapper from './FiledWrapper'

interface IProps {
  setISBN: Function
}

const FieldISBN: React.FunctionComponent<IProps> = (props) => {
  const maxValueLength = 13
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // If reference target in the async function, to do persit() is required.
    event.persist()

    const isbn = event.target.value as string

    if (isbn.length >= maxValueLength) {
      blurKeyboard(event)
    }

    props.setISBN(isbn)
  }

  const blurKeyboard = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.blur()
  }

  return (
    <FieldWrapper icon={mdiBookshelf}>
      <Input
        id="input-isbn"
        type="number"
        pattern="-?[0-9]*(\.[0-9]+)?"
        onChange={handleChange}
        placeholder="ISBNを入力"
      />
    </FieldWrapper>
  )
}

const targetSize = 250
const paddingSize = 34
const inputSize = targetSize - paddingSize

const Input = styled.input`
  width: ${inputSize}px;
  height: 25px;
  padding-left: ${paddingSize}px;

  font-size: 24px;
  line-height: 24px;

  background-color: transparent;
  border: none;

  background-repeat: no-repeat;

  &:placeholder-shown {
    font-size: 18px;
  }
`

export default FieldISBN
