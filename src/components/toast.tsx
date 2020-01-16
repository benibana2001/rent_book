import * as React from 'react'
export { Toast }
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
class Toast extends React.Component<{ text: string, button?: React.ReactElement }> {
    constructor(props: { text: string, button?: React.ReactElement }) {
        super(props)
    }
    //
    render() {
        return (
            <dialog id='loading' className="loading" >
                <div className="outer">
                    {this.props.text}
                    <figure id="figureLoading" className="figureLoading"></figure>
                    {/* <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.remove}>キャンセル</button> */}
                </div>
                <Btn btn={this.props.button} />
            </dialog>
        )
    }
}

class Btn extends React.Component<{ btn?: React.ReactElement }> {
    constructor(props: { btn: React.ReactElement }) {
        super(props)
    }
    render() {
        if (!this.props.btn) return null
        return (
            <div>
                {this.props.btn}
            </div>
        )
    }
}