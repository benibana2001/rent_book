## 本アプリについて

　書籍のISBN（アイエスビーエヌ、International Standard Book Number）を元に、図書館別の蔵書情報および貸し出し状況の確認から貸出/予約までを行うことを可能とするアプリです。  
2019年12月現在, 開発中です。

![開発中デモ](https://raw.githubusercontent.com/wiki/benibana2001/rent_book/images/rent_book_demo02.gif)

## 実装予定の機能

### 追加予定の蔵書検索機能

- タイトル, 著者名から図書館の蔵書情報を取得する機能
- ISBNの記載されたバーコードをカメラで読み取り、図書館の蔵書情報を取得する機能

### 追加予定の画面

- 検索対象の書籍の情報（タイトル, 著者, 書影）を表示する機能

## API

こちらのAPIを使用しています。

### 1. [図書館API仕様書 | カーリル](https://calil.jp/doc/api_ref.html)

#### 蔵書検索

> 実行例：
http://api.calil.jp/check?appkey={あなたのアプリキー}&isbn=4834000826&systemid=Aomori_Pref&format=json

#### 図書館データベース

> 実行例：
http://api.calil.jp/library?appkey={あなたのアプリキー}&pref=埼玉県
http://api.calil.jp/library?appkey={あなたのアプリキー}&geocode=136.7163027,35.390516&limit=10

### 2. [OpenBD](https://openbd.jp/)

> 実行例:
https://api.openbd.jp/v1/get?isbn=978-4-7808-0204-7&pretty