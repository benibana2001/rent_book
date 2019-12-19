import 'material-design-lite'
import 'material-design-lite/material.min.css'
import '../components/material_icon.scss'
import * as React from 'react'
import { Isbn } from './ISBN/Isbn'
import { Camera } from './Camera'

export { Tabs }
class Tabs extends React.Component {
    render() {
        return (
            <main className="mdl-layout__content">
                <section className="mdl-layout__tab-panel is-active" id="fixed-tab-1">
                    <div className="page-content">
                        <Isbn />
                        
                    </div>
                </section>
                <section className="mdl-layout__tab-panel" id="fixed-tab-2">
                    <div className="page-content">
                        <Camera />
                    </div>
                </section>
            </main>
        )
    }
}
