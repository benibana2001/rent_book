import fetchJsonp = require('fetch-jsonp');
export { Calil, options, dataRow, data }

class Calil {
    //----------------------------------------
    public api_timeout_timer: number = 0
    public api_call_count: number = 0
    public data_cache: string = ''
    //
    private readonly HOST: string = 'https://api.calil.jp/check'
    //
    private _options: options
    //
    private _server_status: number = 0
    set server_status(status: number) { this._server_status = status }
    get server_status() { return this._server_status }
    //
    private _session: string = ''
    set session(session: string) { this._session = session }
    get session() { return this._session }
    //
    private _data: data | null = null
    set data(data: data) { this._data = data }
    get data() { return this._data }
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
    private init(): void {
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
    private checkOptions(): void {
        // Set AppKey
        if (!this._options.appkey) {
            alert('Please enter appkey')
        }
        // Set ISBN to property.
        /**
         * ISBN would be passed as string everytime.
         */
        // Set SystemID to property.
        /**
         * User wouldn't enter SystemID by theirself, and SystemID would be assumed inputted by App, so omit validataion.
         */
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
    public async search(): Promise<data> {
        // Create url
        // https://api.calil.jp/check?appkey={}&isbn=4334926940&systemid=Tokyo_Setagaya&format=json
        // https://api.calil.jp/check?appkey={}&isbn=4834000826&systemid=Aomori_Pref&format=json
        let url: string = (
            this.HOST +
            '?appkey=' + this._options.appkey +
            '&isbn=' + this._options.isbn +
            '&systemid=' + this._options.systemid + '&format=json')
        console.log(url)
        // Request
        let json: any = await this.callApi(url)
        // Check server status
        /**
         * Calis server return status as a number.
         * We should judge server process would be done or not by checking this status.
         * If not finished, we should proceed polling process.
         */
        await this.checkServerStatus(json)
        // Check value 'continue' and decide next process.
        // this.confirm()
        // DONE
        console.log('search() is finished.')
        // Parse Data
        return this._data
    }
    /**
     * checkServerStatus
     */
    private async checkServerStatus(json: any): Promise<any> {
        // Set server status
        this.server_status = this.getServerStatus(json)
        // Set session
        this.session = this.getSession(json)
        //
        if (this.server_status === 1) {
            // Polling
            await this.sleep(2000)
            await this.poll()

        } else if (this.server_status === 0) {
            // Done
            // Parse
            const data: data = this.parse(json)
            // Set data
            this.data = data
            return

        } else {
            if (this.server_status === -2) {
                console.log('Error - book is not exist')
            } else if (this.server_status === -1) {
                console.log(`Error - server.status: ${this.server_status}`)
            }
            return
        }
    }
    /**
     * poll
     */
    public async poll(): Promise<any> {
        console.log('Start polling.')
        const url: string = (
            this.HOST +
            '?appkey=' + this._options.appkey +
            '&session=' + this._session + '&format=json')
        // request polling
        let json: any = await this.callApi(url)
        console.log(`Polling url: ${url}`)
        console.log(`Fetch from polling: ${JSON.stringify(json)}`)
        // Check server status
        await this.checkServerStatus(json)
    }

    /**
     * parse
     * 
     * Parse JSON data to use React JSX easily. 
     * When display some data in JSX, you are recommended to use Array.map() function, 
     * and raw JSON data is difficult to display. So that this function parse JSON data to array.
     */
    public parse(json: any): data {
        let libkey: any = json.books[this._options.isbn][this._options.systemid].libkey
        let reserveurl: string = json.books[this._options.isbn][this._options.systemid].reserveurl
        let data: data = { libkey: [], reserveurl: reserveurl }
        let i: number = 1
        for (let key in libkey) {
            let d: dataRow = { id: i, name: key, status: libkey[key] }
            data.libkey.push(d)
            i++
        }
        return data
    }
    /**
     * callApi
     */
    public async callApi(url: string): Promise<any> {
        // fetch jsonp... I don't know why but fetch-jsonp package wrapp response twice by Promise.
        let res: fetchJsonp.Response = await fetchJsonp(url)
        let s: any = await res.json()
        return s
    }

    /**
     * getServerStatus
     * 
     * 0: success
     * 1: polling
     * -1: server error
     * -2: boo isn't exist
     */
    private getServerStatus(data: any): number {
        let c = data.continue
        let status = data.books[this._options.isbn][this._options.systemid].status
        if (c === 1) {
            return 1
        } else if (c === 0) {
            if (status === 'OK' || status === 'Cache') {
                let libkey: any = data.books[this._options.isbn][this._options.systemid].libkey
                if (!libkey || !Object.keys(libkey).length) {
                    return -2
                } else {
                    return 0
                }
            } else {
                return -1
            }
        }
    }
    /**
     * getSession
     */
    private getSession(data: any): string {
        return data.session
    }

    /**
     * sleep
     */
    private sleep(ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

interface options {
    'appkey': string,
    'isbn': string,
    'systemid': string
}

interface dataRow {
    'id': number,
    'name': string,
    'status': string
}

interface data {
    'libkey': dataRow[],
    'reserveurl': string
}
