import * as React from 'react'
import { ResultList } from './components/ResultList'
import { LibData } from '../../interfaces'
import imgFailed from '../../img/toast_loading.png'
import { Toast } from '../../components/toast'
export { Result }

class Result extends React.Component<{ data: LibData[], reserveurl: string, setter: { data: Function } }> {
    constructor(props: { data: LibData[], reserveurl: string, setter: { data: Function } }) {
        super(props)
        // bind
        this.moveTo = this.moveTo.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount() { }

    componentDidUpdate(prevProps: any) {
        if (prevProps.data !== this.props.data) {
            if (this.isData()) {
                this.displayModal()
            }
            // 蔵書なしToast表示
            // SetStateでnullkeyが渡る前に、DidUpdate()判定がかかってしまう。
            // そのため、notExistのスコープに入らない。
            // HOME画面でcomponentDidUpdateすれば、setterでnullkeyを渡されたのちに、発火イベントを実行できるj
            if (!this.existBook()) {
                const dialogLoading: HTMLDialogElement = document.getElementById('loading') as HTMLDialogElement
                console.log('NO book!!!')
                console.log(dialogLoading)
                // dialogLoading.showModal()
            } else {
                console.log('EXIST book!!!')
            }
        }
    }

    displayModal(): void {
        const dialog: HTMLDialogElement = document.getElementById('result') as HTMLDialogElement
        dialog.showModal()
    }

    closeModal(): void {
        const dialog = document.querySelector('dialog')
        dialog.close()
        //
        this.clearLibData()
    }

    clearLibData(): void {
        let defaultData: any = {
            libkey: null,
            reserveurl: ''
        }
        this.props.setter.data(defaultData)
    }

    isData(): boolean {
        if (this.props.data !== null) return true
        return false
    }

    existBook(): boolean {
        const nullkey: string = 'xxx'
        return this.isData() && this.props.reserveurl !== nullkey
    }

    moveTo(): void {
        location.href = this.props.reserveurl
    }

    render() {
        if (this.isData()) {
            if (this.existBook()) {
                console.log(JSON.stringify(this.props.data))
                return (
                    <div>
                        <dialog id='result' >
                            <div >
                                <ul className='mdl-list'>
                                    {this.props.data.map(data =>
                                        <ResultList key={data.id} libData={data} reserveurl={this.props.reserveurl} />
                                    )}
                                </ul>
                                <button id="buttonReserve" type="button" className="mdl-button" onClick={this.moveTo}>予約</button>
                                <button type="button" className="mdl-button close" onClick={this.closeModal}>とじる</button>
                            </div>
                        </dialog>
                    </div>
                )
            } else {
                return (
                    <Toast text='蔵書はありませんでした。' button={<button type="button" className="mdl-button close" onClick={this.closeModal}>とじる</button>} />
                    // <div>
                    //     <dialog id='result' >
                    //         <p>蔵書はありませんでした。</p>
                    //         <img src={imgFailed} alt=""/>
                    //         <button type="button" className="mdl-button close" onClick={this.closeModal}>とじる</button>
                    //     </dialog>
                    // </div>
                )
            }
        } else {
            return (
                <div></div>
            )
        }
    }
}
