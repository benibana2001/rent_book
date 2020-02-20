export {
    LibRequest,
    LibData,
    LibResponse,
    BookResponse,
    ToastStatus
}

/**
 * For Calil API. Using for request library data.
 */
interface LibRequest {
    'appkey': string,
    'isbn': string,
    'systemid': string
}

/**
 * For Calil API. Using for response library data.
 */
interface LibData {
    'id': number,
    'name': string,
    'status': string
}

/**
 * For Calil API. Using for response library data.
 */
interface LibResponse {
    'libkey': LibData[],
    'reserveurl': string
}
/**
 * For OpenBD API. Using for request book data.
 */
interface BookResponse {
    title: string,
    coverurl?: string
}
/**
 * For manage Toast status
 */
interface ToastStatus {
    pref: boolean,
    load: boolean,
    result: {
        success: boolean,
        failed: boolean
    }
}