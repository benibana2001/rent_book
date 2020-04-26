export interface BookResponse {
  title: string
  coverurl?: string
}

class OpenBD {
  private _isbn = ''
  private readonly HOST = 'https://api.openbd.jp/v1/get'
  set isbn(isbn: string) {
    this._isbn = isbn
  }
  get isbn() {
    return this._isbn
  }

  public async search(isbn: string): Promise<BookResponse> {
    this.isbn = isbn
    const url: string = this.HOST + '?isbn=' + this.isbn + '&pretty'
    const res: any = await fetch(url)
    const ary: any = await res.json()
    const data: any = ary[0]
    const title: string =
      data.onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content
    const coverurl: string = data.summary.cover
    console.log(ary)
    // console.log(`url: ${url}`)
    // console.log(`title: ${title}`)
    // console.log(`coverurl: ${coverurl}`)

    return { title: title, coverurl: coverurl }
  }
}

export default OpenBD
