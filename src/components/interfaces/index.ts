/**
 * For Calil API. Using for request library data.
 */
export interface LibRequest {
    'appkey': string,
    'isbn': string,
    'systemid': string
}

/**
 * For Calil API. Using for response library data.
 */
export interface LibData {
    'id': number,
    'name': string,
    'status': string
}

/**
 * For Calil API. Using for response library data.
 */
export interface LibResponse {
    'libkey': LibData[],
    'reserveurl': string
}
/**
 * For OpenBD API. Using for request book data.
 */
export interface BookResponse {
    title: string,
    coverurl?: string
}