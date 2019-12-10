import * as React from 'react'
import Quagga from 'quagga'
export { Camera }
class Camera extends React.Component {
    constructor(props: any){
        super(props)
        console.log(Quagga)
    }
    componentDidMount() {
        console.log(document.getElementById('camera'))
        console.log(Quagga)
        // Quagga.init({
        //     inputStream: {
        //         name: 'Live',
        //         type: 'LiveStream',
        //         target: document.getElementById('camera')    // Or '#yourElement' (optional)
        //     },
        //     decoder: {
        //         readers: ['code_128_reader']
        //     }
        // }, function (err: Error) {
        //     if (err) {
        //         console.log(err)
        //         return
        //     }
        //     console.log('Initialization finished. Ready to start')
        //     Quagga.start()
        // })
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