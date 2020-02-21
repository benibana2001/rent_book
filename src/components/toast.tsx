import * as React from 'react'
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

interface IProps {
    text: string,
    button?: React.ReactElement
}

const Toast: React.SFC<IProps> = props => {
    return (
        <dialog id='loading' className="loading" >
            <div className="outer">
                {props.text}
                <figure id="figureLoading" className="figureLoading"></figure>
                {/* <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.remove}>キャンセル</button> */}
            </div>
            {props.button && (
                <div>{props.button}</div>
            )}
        </dialog>
    )
}

export default Toast