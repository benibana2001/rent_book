## 本アプリについて

　書籍のISBN（アイエスビーエヌ、International Standard Book Number）を元に、図書館別の蔵書情報および貸し出し状況の確認から貸出/予約までを行うことを可能とするアプリです。  
2020年1月現在, 開発中です。

![開発中デモ](https://raw.githubusercontent.com/wiki/benibana2001/rent_book/images/rent_book_demo03.gif)

## 実装予定の機能

### 追加予定の蔵書検索機能

- タイトル, 著者名をもとに、図書館の蔵書情報を取得する機能
    - 国立国会図書館APIを使用予定
- ISBNの記載されたバーコードをカメラで読み取り、図書館の蔵書情報を取得する機能
    - [serratus/quaggaJS](https://github.com/serratus/quaggaJS)を使用して開発中

### 追加予定の画面

- 検索対象の書籍の情報（タイトル, 著者, 書影）を表示する機能

## API

こちらのAPIを使用しています。

### 1. [図書館API仕様書 | カーリル](https://calil.jp/doc/api_ref.html)

#### 蔵書検索

こちらのAPIを使用することで、10桁、および13桁のISBNのPOSTから、以下の結果を受け取ることができあます。
- 個々の図書館別の蔵書有無
- 予約サイトへのリンク(各自治体にて運用を行なっているWebサイト)

本アプリでは、蔵書結果の取得と、予約サイトへの導線（リンクボタンの設置）を目的に使用しています。

> 実行例：
http://api.calil.jp/check?appkey={あなたのアプリキー}&isbn=4834000826&systemid=Aomori_Pref&format=json

#### 図書館データベース

こちらのAPIを使用することで、ジオコード、もしくは指定の都道府県名や市区町村名から、指定の地域のシステムIDを取得することができます。
このシステムIDは、「蔵書検索API」で必要となります。

本アプリでは、こ受信した結果を静的ファイルとして保存した上で、東京都の市区町村にのみ絞り「蔵書検索API」へと渡しています。

> 実行例：
http://api.calil.jp/library?appkey={あなたのアプリキー}&pref=埼玉県
http://api.calil.jp/library?appkey={あなたのアプリキー}&geocode=136.7163027,35.390516&limit=10

### 2. [OpenBD](https://openbd.jp/)

こちらのAPIを使用することで、ISBN情報から以下の情報を受け取ることができます。
- 書影
- タイトル
- サブタイトル
- 本の概要

本アプリでは、書影、タイトルの表示に使用しています。

> 実行例:
https://api.openbd.jp/v1/get?isbn=978-4-7808-0204-7&pretty