import * as React from 'react'

import Toast from './toast'
import imgLoading from '../img/toast_loading.png'
import './loading.scss'

interface IProps {
    isLoading: boolean
}

const Loading: React.SFC<IProps> = props => {
    const isLoading = props.isLoading
    return (
        <React.Fragment>
            {isLoading &&
                <Toast
                    text={'通信中です。'}
                    img={imgLoading} />}
        </React.Fragment>
    )
}

export default Loading