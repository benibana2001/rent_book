import 'material-design-lite'
import 'material-design-lite/material.min.css'
import '../components/material_icon.scss'
import * as React from 'react'
import { Isbn } from './ISBN/Isbn'
import { Camera } from './Camera'

export { Home }
class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Isbn />
                <Camera />
            </React.Fragment>
        )
    }
}
