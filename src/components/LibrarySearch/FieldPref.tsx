import * as React from 'react'
import styled from 'styled-components'

import { data as TokyoLibraryData } from '../../api/data_tokyo_library'

import { mdiMapMarker } from '@mdi/js'

import FieldWrapper from './FiledWrapper'

interface IProps {
  setSystemID: Function
}

const FieldPrefecture: React.FunctionComponent<IProps> = (props) => {
  return (
    <FieldWrapper icon={mdiMapMarker}>
      <PrefectureSelect
        name="system_id"
        id="systemid"
        onChange={handleChangeSelect}
      >
        {defaultPrefecture}
        {prefectures}
      </PrefectureSelect>
    </FieldWrapper>
  )

  function handleChangeSelect(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    event.persist()
    props.setSystemID(event.target.value)
  }
}

const prefectures = TokyoLibraryData.map((item, index) => (
  <option key={index} value={item[0]}>
    {item[1]}
  </option>
))

const defaultPrefecture = <option value="">市区町村を選択</option>

const targetSize = 250
const paddingSize = 34
const selectSize = targetSize - paddingSize

const PrefectureSelect = styled.select`
  width: ${selectSize}px;
  height: 31px;
  padding-left: ${paddingSize}px;
  font-size: 12px;
  color: #8e8e8e;

  border: 0.5px solid #dedede;
`
export default FieldPrefecture
