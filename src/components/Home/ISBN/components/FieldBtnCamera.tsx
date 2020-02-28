import * as React from 'react'
const Quagga = require('quagga')

class FieldBtnCamera extends React.Component {
    constructor(props: any) {
        super(props)
    }
    //
    handleClick(): void {
        // Camera Init
        console.log(Quagga)
        //
        Quagga.init({
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
            // Quagga.start()
        })
    }
    componentDidMount() {
        Quagga.onDetected((success: any) => {
            console.log(`detected!: ${JSON.stringify(success)}`)
            alert(JSON.stringify(success))
        })
    }

    render() {
        return (
            <React.Fragment>
                {/* バーコードから調べる */}
                <button onClick={this.handleClick} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    カメラ起動
                </button>
                <div id="camera"></div>
            </React.Fragment>
        )
    }
}

export default FieldBtnCamera