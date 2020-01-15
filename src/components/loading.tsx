import * as React from 'react'
import imgLoading from '../img/toast_loading.png'
import './loading.scss'
export { Loading }
/**
 * This class would be used while loading response of fetch api.
 */
class Loading extends React.Component<{ isLoading: boolean }, { value: boolean, debug: boolean }> {
    constructor(props: { isLoading: boolean }) {
        super(props)
        this.state = { value: true, debug: false }
        this.remove = this.remove.bind(this)
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
    // Renderd tag is below
    // ========================================
    // <dialog #loading .loading>
    //      <div .outer>
    //          <figure #figureLoading .figureLoading>
    //              <img>
    //          </figure>
    //      </div>
    // </dialog>
    // ========================================
    //
    displayImg() {
        let elem: HTMLImageElement = document.createElement('img')
        let parent: HTMLElement = document.getElementById('figureLoading')
        elem.src = imgLoading
        parent.appendChild(elem)
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
    remove(): void {
        console.log('remove')
        this.setState({ value: false })
    }
    render() {
        if (this.props.isLoading || this.state.debug) {
            return (
                <dialog id='loading' className="loading">
                    <div className="outer">
                        {/* <div className=""></div> */}
                        データを読み込んでいます。
                        <figure id="figureLoading" className="figureLoading"></figure>
                        {/* <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.remove}>キャンセル</button> */}
                    </div>
                </dialog>
            )
        } else {
            return <div></div>
        }
    }
}