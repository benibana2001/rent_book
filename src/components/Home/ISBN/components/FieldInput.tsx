import * as React from 'react'
// Library
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

interface IProps {
    setISBN: Function
}

const FieldInput: React.FunctionComponent<IProps> = props => {
    // To use fontawsome, we need to replace <i> to <svg>, so that do these function.
    //   - https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core
    //   - https://fontawesome.com/how-to-use/with-the-api/setup/getting-started
    library.add(faBook, faTimesCircle, faUniversity)
    dom.i2svg()
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // If reference target in the async function, to do persit() is required.
        event.persist()
        props.setISBN(event.target.value)
    }
    return (
        <React.Fragment>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4" onChange={handleChange} />
                <label className="mdl-textfield__label" htmlFor="sample4">ISBNを入力</label>
                <span className="mdl-textfield__error">Input is not a number!</span>
            </div>
        </React.Fragment>
    )
}

export default FieldInput