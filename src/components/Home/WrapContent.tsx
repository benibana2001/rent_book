import * as React from 'react'

const WrapContent: React.FunctionComponent = (props) => {
    return (
        <div className="content">
            <div>
                {props.children}
            </div>
        </div >
    )
}

export default WrapContent