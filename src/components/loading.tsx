import * as React from 'react'

import Toast from './toast'
import imgLoading from '../img/toast_loading.png'
import './loading.scss'

interface IProps {
    isLoading: boolean
}

// const Loading2: React.SFC<IProps> = props => {
//     const imgTarget: HTMLElement = document.getElementById('figureLoading')
//     const dialogLoading: HTMLDialogElement = document.getElementById('loading') as HTMLDialogElement
//     const displayDialog = (dialog: HTMLDialogElement) => (target: HTMLElement): void => {
//         dialog.showModal()
//         const elem: HTMLImageElement = document.createElement('img')
//         elem.src = imgLoading
//         target.appendChild(elem)
//     }
//     return (

//     )
// }

// This class would be used while loading response of fetch api.
class Loading extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }
    public componentDidUpdate = (prevProps: any) => {
        const imgTarget: HTMLElement = document.getElementById('figureLoading')
        const dialogElem: HTMLDialogElement = document.getElementById('loading') as HTMLDialogElement
        if (prevProps.isLoading !== this.props.isLoading) {
            if (this.props.isLoading) this.displayDialog(dialogElem)(imgTarget)
        }
    }
    //
    private displayDialog = (dialog: HTMLDialogElement) => (target: HTMLElement): void => {
        dialog.showModal()
        const elem: HTMLImageElement = document.createElement('img')
        elem.src = imgLoading
        target.appendChild(elem)
    }
    //
    render() {
        if (this.props.isLoading) {
            return (
                <Toast text={'通信中です。'} />
            )
        } else return null
    }
}

export default Loading