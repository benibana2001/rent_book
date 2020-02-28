import * as React from 'react'

const WrapContent: React.SFC = (props) => {
    return (
        <div className="content">
            <div>
                {props.children}
            </div>
        </div >
    )
}

export default WrapContent