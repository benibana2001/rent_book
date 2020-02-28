import * as React from 'react'
import { useEffect, useState } from 'react'

import ISBNArea from './ISBN'
import PrefArea from './Pref'
import BookDataArea from './BookData'
import LoadingView from '../Loading'
import Calil, { LibRequest, LibResponse } from '../../api/Calil'
import OpenBD, { BookResponse } from '../../api/OpenBD'

import 'material-design-lite'
import 'material-design-lite/material.min.css'
import { BookStatus, defaultLibResponse } from '../../Routes'

interface IProps {
    setBookInfo: (bookInfo: BookResponse) => void
    setBookStatus: (bookStatus: BookStatus) => void
    setLibraryResponse: (libresponse: LibResponse) => void
}
const CALIL_KEY = process.env.APP_API_KEY
const defaultLibRequest: LibRequest = {
    appkey: CALIL_KEY,
    isbn: '',
    systemid: ''
}

const Home: React.FunctionComponent<IProps> = props => {
    const [request, setRequest] = useState(defaultLibRequest)
    const [isLoading, setIsLoading] = useState(false)
    const setSystemID = (value: string) => setRequest({ ...request, 'systemid': value })
    const setISBN = (value: string) => setRequest({ ...request, 'isbn': value })
    const fetchBookInfo = async (isbn: string): Promise<BookResponse> => {
        const O: OpenBD = new OpenBD()
        let bookResponse: BookResponse = await O.search(isbn)
        return bookResponse
    }
    // Fetch a book status about each library by using Calil API.
    // TODO: 関数実行のたびにインスタンを作成するのは不要
    const fetchLibrayInfo = async (o: LibRequest): Promise<LibResponse> => {
        let c: Calil = new Calil(o)
        let res: LibResponse = await c.search()
        return res
    }
    const dispatchLibraryInfo = (res: LibResponse): void => {
        if (!res) {
            console.log('Data is none')
            props.setBookStatus(BookStatus.NONE)
            props.setLibraryResponse(defaultLibResponse)
            return
        }
        props.setLibraryResponse(res)
        props.setBookStatus(BookStatus.EXIST)
    }
    const handleClick = async (): Promise<void> => {
        // TODO: Display loading view automatically.
        setIsLoading(true)
        const res = await fetchLibrayInfo(request)
        dispatchLibraryInfo(res)
        setIsLoading(false)
    }
    return (
        <React.Fragment>
            <LoadingView isLoading={isLoading} />
            <ISBNArea setISBN={setISBN} />
            <PrefArea setSystemID={setSystemID} />
            <BookDataArea
                fetchBookInfo={fetchBookInfo}
                submit={handleClick}
                isbn={request.isbn} />
        </React.Fragment>
    )
}

export default Home