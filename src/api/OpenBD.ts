export { OpenBD, BookInfo }
class OpenBD {
    private _isbn: string = ''
    private readonly HOST = 'https://api.openbd.jp/v1/get'
    set isbn(isbn: string) {
        this._isbn = isbn
    }
    get isbn() {
        return this._isbn
    }

    public async search(isbn: string): Promise<BookInfo> {
        this.isbn = isbn
        let url: string = (
            this.HOST +
            '?isbn=' + this.isbn + '&pretty')
        let res: any = await fetch(url)
        let ary: any = await res.json()
        let data: any = ary[0]
        let title: string = data.onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content
        let coverurl: string = data.summary.cover
        // console.log(`url: ${url}`)
        // console.log(`title: ${title}`)
        // console.log(`coverurl: ${coverurl}`)

        return {title: title, coverurl: coverurl}
    }
}

interface BookInfo {
    title: string,
    coverurl?: string
}