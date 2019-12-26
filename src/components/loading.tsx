import * as React from 'react'
export { Loading }
/**
 * This class would be used while loading response of fetch api.
 */
class Loading extends React.Component<{ isLoading: boolean }, { value: boolean }> {
    constructor(props: { isLoading: boolean }) {
        super(props)
        this.state = { value: true }
        this.remove = this.remove.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.displayModal = this.displayModal.bind(this)
    }
    componentDidUpdate(prevProps: any) {
        if (prevProps.isLoading !== this.props.isLoading) {
            if (this.props.isLoading) {
                this.displayModal()
            } else {
                console.log('close')
                // this.closeModal()
            }
        }
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
        if (this.props.isLoading) {
            return (
                <dialog id='loading'>
                    <div className="outer">
                        <div className=""></div>
                        データを読み込んでいます。
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.remove}>キャンセル</button>
                    </div>
                </dialog>
            )
        } else {
            return <div>
                <dialog></dialog>
            </div>
        }
    }
}