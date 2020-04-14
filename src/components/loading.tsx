import * as React from 'react'

import Toast from './Common/Toast'
import imgLoading from '../img/toast_loading.png'

interface IProps {
  isLoading: boolean
}

const LoadingView: React.FunctionComponent<IProps> = (props) => {
  const isLoading = props.isLoading
  return (
    <React.Fragment>
      {isLoading && <Toast text={'通信中です。'} img={imgLoading} />}
    </React.Fragment>
  )
}

export default LoadingView
