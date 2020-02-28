import * as React from 'react'

interface IProps {
    text: string,
    button?: React.ReactElement,
    img?: string
}

const Toast: React.FunctionComponent<IProps> = props => {
    return (
        <div id='toastArea' className="toastArea" >
            <div className="outer">
                {props.text}
                {props.img &&
                    <figure id="figureArea" className="figureArea">
                        <img src={props.img} alt={props.img} />
                    </figure>
                }
            </div>
            {props.button && (
                <div>{props.button}</div>
            )}
        </div>
    )
}

export default Toast