import * as React from 'react'
import { Toast } from './toast'
import imgLoading from '../img/toast_loading.png'
import './loading.scss'
export { Loading }
/**
 * This class would be used while loading response of fetch api.
 */
class Loading extends React.Component<{ isLoading: boolean }, { debug: boolean }> {
    constructor(props: { isLoading: boolean }) {
        super(props)
        this.state = { debug: false }
        this.closeModal = this.closeModal.bind(this)
        this.displayModal = this.displayModal.bind(this)
    }
    componentDidMount() {
        // this.setDebug(true)
    }
    componentDidUpdate(prevProps: any) {
        if (prevProps.isLoading !== this.props.isLoading) {
            if (this.props.isLoading) {
                this.displayModal()
                this.displayImg()
            } else {
                console.log('close')
                // this.closeModal()
            }
        }
        if (this.state.debug) {
            this.displayModal()
            this.displayImg()
        }
    }
    //
    setDebug(b: boolean) {
        this.setState({ debug: b })
    }
    //
    displayImg() {
        const newImage: Function = (): HTMLElement => {
            let elem: HTMLImageElement = document.createElement('img')
            elem.src = imgLoading
            return elem
        }
        const targetElement: Function = (): HTMLElement => {
            let target: HTMLElement = document.getElementById('figureLoading')
            return target
        }
        targetElement().appendChild(newImage())
    }
    //
    displayModal(): void {
        const dialogLoading: HTMLDialogElement = document.getElementById('loading') as HTMLDialogElement
        dialogLoading.showModal()
    }
    //
    closeModal(): void {
        const dialogLoading: HTMLDialogElement = document.querySelector('loading') as HTMLDialogElement
        dialogLoading.close()
    }
    //
    render() {
        if (this.props.isLoading || this.state.debug) {
            return (
                <Toast text={'通信中です。'} />
            )
        } else {
            return <div></div>
        }
    }
}