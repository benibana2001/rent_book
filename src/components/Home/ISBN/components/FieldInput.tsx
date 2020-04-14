import * as React from 'react'
// Library
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

interface IProps {
  setISBN: Function
}

const FieldInput: React.FunctionComponent<IProps> = (props) => {
  // To use fontawsome, we need to replace <i> to <svg>, so that do these function.
  //   - https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core
  //   - https://fontawesome.com/how-to-use/with-the-api/setup/getting-started
  library.add(faBook, faTimesCircle, faUniversity)
  dom.i2svg()

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // If reference target in the async function, to do persit() is required.
    event.persist()

    const isbn = event.target.value as string
    props.setISBN(isbn)
    console.log(isbn.split(''))
  }

  return (
    <React.Fragment>
      <div className="">
        <input
          id="input-isbn"
          className=""
          type="text"
          pattern="-?[0-9]*(\.[0-9]+)?"
          onChange={handleChange}
          placeholder="ISBNを入力"
        />
        {debugButton()}
      </div>
    </React.Fragment>
  )

  function debugButton() {
    const debug = () => {
      const isbn = document.getElementById('input-isbn') as HTMLInputElement
      isbn.value = '4334926940'
    }
    return <button onClick={debug}>debug</button>
  }
}

export default FieldInput
