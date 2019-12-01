import fetchJsonp = require('fetch-jsonp');
export { Calil, options }

class Calil {
    //----------------------------------------
    public api_timeout_timer: number = 0
    public api_call_count: number = 0
    public data_cache: string = ''
    //
    public systemid_list: number[] = []
    public isbn_list: number[] = []
    //
    private _options: options
    //----------------------------------------
    constructor(O: options) {
        // Set Arguments.
        this._options = O
        // Check Arguments.
        this.init()
    }
    //----------------------------------------
    /**
     * init
     */
    public init(): void {
        this.checkOptions()
        // THIS IS DEBUG FUNCTION TO BE ERASED!!
        // this.setTestOptions()
    }
    /**
     * setTestOptions
     */
    private setTestOptions(): void {
        this._options = {
            'appkey': process.env.APP_API_KEY,
            'isbn': '4834000826',
            'systemid': 'Tokyo_Setagaya'
        }
    }
    /**
     * checkOptions
     * Validate Options each value.
     */
    public checkOptions(): void {
        // Set AppKey
        if (!this._options.appkey) {
            alert('Please enter appkey')
        }
        // Set ISBN to property.

        // Set SystemID to property.
    }
    /**
     * search
     * 
     * Call api using XMLHttpRequest or fetch with JSONP.
     * If using fetch API, using third party library for JSONP is required 
     * because not supported in standard fetch API.
     * 
     * I dont' know why, but when I access Error was happend.
     * I think it occured because server judged my request as wrong one when I request many times by same isbn probably.
     * 
     */
    public async search(): Promise<any> {
        // Create url
        // https://api.calil.jp/check?appkey={}&isbn=4334926940&systemid=Tokyo_Setagaya&format=json
        // https://api.calil.jp/check?appkey={}&isbn=4834000826&systemid=Aomori_Pref&format=json
        let url: string = (
            'https://api.calil.jp/check' +
            '?appkey=' + this._options.appkey +
            '&isbn=' + this._options.isbn +
            '&systemid=' + this._options.systemid + '&format=json')
        console.log(url)
        // Request
        let json: any = await this.callApi(url)
        // Check data
        let status: number = this.checkServerStatus(json)
        // Check value 'continue' and decide next process.
        this.confirm(status)
        // DONE
        console.log('search() is finished.')
    }
    /**
    * poll
    */
    public poll(): void {
        console.log('Start polling.')
    }
    /**
     * callApi
     */
    public async callApi(url: string): Promise<any> {
        // fetch jsonp... I don't know why but fetch-jsonp package wrapp response twice by Promise.
        let res: fetchJsonp.Response = await fetchJsonp(url)
        let s: any = await res.json()
        console.log(`s: ${JSON.stringify(s)}`)
        return s
    }

    /**
     * checkServerStatus
     */
    private checkServerStatus(data: any): number {
        return data.continue
    }
    /**
     * confirm
     * Check All data was got or not.
     * And Do next process.
     */
    private confirm(status: number): void {
        if (status === 1) {
            // AB-NORMAL. If data.continue === 1, server is still running
            // console.log('Server is still runnning. So start polling...')
            // Do polling. This function should be loop until server process done.
            this.poll()
        } else if (status === 0) {
            // NORMAL. If data.continue === 0, server process is done.
            // console.log('Serve processe is done.')
            return
        } else {
            // console.log(`json.continue is wrong value.`)
        }
    }
}

interface options {
    'appkey': string,
    'isbn': string,
    'systemid': string
}