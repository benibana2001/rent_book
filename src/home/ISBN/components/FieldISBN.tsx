import * as React from 'react'
import { FieldCamera } from './FieldCamera'
// Library
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

interface IProps {
    setISBN: Function
}

class FieldISBN extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }

    /**
     * To use fontawsome, we need to replace <i> to <svg>, so that do these function.
     *   Replace should be done after DOM rendering.
     *   - https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core
     *   - https://fontawesome.com/how-to-use/with-the-api/setup/getting-started
     */
    public componentDidMount() {
        library.add(faBook, faTimesCircle, faUniversity)
        dom.i2svg()
    }

    private handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // If reference target in the async function, to do persit() is required.
        event.persist()
        let value: string = event.target.value
        this.setState({ isbn: value })
        // Set value to parent class.
        this.props.setISBN(value)
    }

    render() {
        return (
            <div id='isbn'>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4" onChange={this.handleChange} />
                    <label className="mdl-textfield__label" htmlFor="sample4">ISBNを入力</label>
                    <span className="mdl-textfield__error">Input is not a number!</span>
                </div>
                <FieldCamera />
            </div>
        )
    }
}

const FieldISBN2: React.SFC<IProps> = props => {
    library.add(faBook, faTimesCircle, faUniversity)
    dom.i2svg()
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // If reference target in the async function, to do persit() is required.
        event.persist()
        let value: string = event.target.value
        // Set value to parent class.
        props.setISBN(value)
    }
    return (
        <div id='isbn'>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4" onChange={handleChange} />
                <label className="mdl-textfield__label" htmlFor="sample4">ISBNを入力</label>
                <span className="mdl-textfield__error">Input is not a number!</span>
            </div>
            <FieldCamera />
        </div>
    )
}

export default FieldISBN