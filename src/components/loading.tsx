import * as React from 'react'
import 'material-design-lite'
import 'material-design-lite/material.min.css'
export { Loading }
/**
 * This class would be used while loading response of fetch api.
 */
class Loading extends React.Component<{ isLoading: boolean }, { value: boolean }> {
    constructor(props: { isLoading: boolean }) {
        super(props)
        this.state = { value: true }
        this.remove = this.remove.bind(this)
    }
    remove() {
        console.log('remove')
        this.setState({ value: false })
    }
    render() {
        if (this.props.isLoading) {
            return (
                <div className="outer">
                    <div className="mdl-spinner mdl-js-spinner is-active"></div>
                    データを読み込んでいます。
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.remove}>クリア</button>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}