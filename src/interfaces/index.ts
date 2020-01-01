export {
    options,
    dataRow,
    data,
    BookInfo
}

/**
 * For Calil API
 */
interface options {
    'appkey': string,
    'isbn': string,
    'systemid': string
}

/**
 * For Calil API
 */
interface dataRow {
    'id': number,
    'name': string,
    'status': string
}

/**
 * For Calil API
 */
interface data {
    'libkey': dataRow[],
    'reserveurl': string
}
/**
 * For OpenBD API
 */
interface BookInfo {
    title: string,
    coverurl?: string
}