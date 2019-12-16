// Library
import { config, dom, library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import 'material-design-lite'
import 'material-design-lite/material.min.css'
import '../scss/material_icon.scss'
import * as React from 'react'
import { Isbn } from './Isbn'
import { Camera } from './Camera'

export { App }
class App extends React.Component {
    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">
                            Rent Book Whasse
                        </span>
                    </div>
                    <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                        <a href="#fixed-tab-1" className="mdl-layout__tab is-active">ISBN</a>
                        <a href="#fixed-tab-2" className="mdl-layout__tab">Camera</a>
                        {/* <a href="#fixed-tab-3" className="mdl-layout__tab">Result</a> */}
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Title</span>
                </div>
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
                    {/* <section className="mdl-layout__tab-panel" id="fixed-tab-3">
                        <div className="page-content">

                        </div>
                    </section> */}
                </main>
            </div>
        )
    }
}