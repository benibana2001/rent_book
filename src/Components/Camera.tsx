import * as React from 'react'
// import Quagga from 'quagga'
// import Quagga from './node_modules/quagga/type-definitions/quagga.d.ts'
const Quagga = require('quagga')
export { Camera }
class Camera extends React.Component {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        console.log(document.getElementById('camera'))
        console.log(Quagga)
        Quagga.init({
            // inputStream: {
            //     name: 'Live',
            //     type: 'LiveStream',
            //     target: document.getElementById('camera')    // Or '#yourElement' (optional)
            // },
            // decoder: {
            //     readers: ['code_128_reader']
            // },
            inputStream: {
                type: 'LiveStream',
                target: document.getElementById('camera'),    // Or '#yourElement' (optional),
                constraints: {
                    width: { min: 640 },
                    height: { min: 480 },
                    facingMode: 'environment',
                    aspectRatio: { min: 1, max: 2 }
                }
            },
            locator: {
                patchSize: 'medium',
                halfSample: true
            },
            numOfWorkers: 2,
            frequency: 10,
            decoder: {
                readers: [{
                    format: 'code_128_reader',
                    config: {}
                }]
            },
            locate: true
        }, function (err: Error) {
            if (err) {
                console.log(err)
                return
            }
            console.log('Initialization finished. Ready to start')
            Quagga.start()
        })
        //
        Quagga.onDetected((success: any) => {
            console.log(`detected!: ${JSON.stringify(success)}`)
            alert(JSON.stringify(success))
        })
    }

    render() {
        return (
            <React.Fragment>
                Helloworld
                <div id="camera"></div>
            </React.Fragment>
        )
    }
}