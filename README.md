# 本, 漫画好きの人のためのアプリ

このアプリでは、大きく以下の 2 つの機能を提供します。

1. 今月発売の新刊コミック一覧表示
2. ISBNを用いた都内図書館の蔵書検索/予約

- 公開URL: [https://rent-book-whasse.firebaseapp.com/](https://rent-book-whasse.firebaseapp.com/)  (更新の関係で表示されないことがあります。)
- サーバー用リポジトリ: [https://github.com/benibana2001/rent_book_server](https://github.com/benibana2001/rent_book_server)


## 画面別 機能一覧

### ホーム画面

![ホーム画面](https://raw.githubusercontent.com/wiki/benibana2001/rent_book/images/home.gif)

- 新刊コミックピックアップ
  - 今月に発売される新刊コミックの中から、オススメの数点に絞って表示する機能。
- 近日発売の新刊
  - 7 日以内に発売予定のコミックを一覧表示。

いずれも、表示されている本のカバー画像をクリックすることで、amazon の販売/予約ページへとリンク。

発売日の関係から本のカバー画像が未公開の場合は、"No Cover" としてダミー画像を表示。

### 図書館予約画面


![図書館予約画面](https://raw.githubusercontent.com/wiki/benibana2001/rent_book/images/library_search.gif)

- 蔵書検索機能
  - ISBN と市区町村名を入力することで、各図書館の蔵書情報を表示する機能。
  - 対象となる図書館は、指定した市区町村内に存在する全ての図書館。
  - 検索結果画面からは、市区町村が運営する予約ページへとリンク可能。
  - 蔵書ステータスは以下の 3 件のうちいずれか。
    - 貸出可
    - 貸出中
    - 蔵書なし

### 今月の新刊コミック画面

![今月の新刊コミック画面](https://raw.githubusercontent.com/wiki/benibana2001/rent_book/images/new_comics.gif)

- 全新刊コミック一覧
  - 今月発売される全ての新刊コミックを表示。
  - 表示内容は以下
    - タイトル
    - 発売日
    - 著者
    - 出版社
    - カバー画像

- 絞込み機能（開発中）
  - 新刊コミックを以下の項目別に絞込み表示
    - 発売日
    - 出版社

## 使用している技術
### デザイン, モック
- Figma

### フロントエンド
- React(hooks), TypeScript
- webpack
- ESLint, Prettier
- Jest
- styled components, Sass
- Firebase Hosting

### サーバー, バックエンド, ホスティングなど
- さくらVPS
- Apache, Node.js
- Freenom（ドメイン）、Let's Encrypt（SSL）
  - REST通信時のCORS対策を主目的として

サーバー用リポジトリ: [https://github.com/benibana2001/rent_book_server](https://github.com/benibana2001/rent_book_server)

毎月の終わりに、外部で提供されているWeb API をサーバー（VPS）上で叩く。
そこで得られた書籍データをJSONとしてサーバー内に保存。またカバー画像についても同様に保持。
クライアントサイドからのFetch API によるアクセスを元に、これらのデータを返すことで、アプリの機能を実現。

## 使用している Web API

1. [図書館 API カーリル](https://calil.jp/doc/api_ref.html)
  - 使用目的1: 本の情報について、以下の2つを確認 
    - 個々の図書館別の蔵書有無 を検索
    - 予約サイトへのリンク(各自治体にて運用を行なっている Web サイト)を取得
    - 実行例:
      - http://api.calil.jp/check?appkey={あなたのアプリキー}&isbn=4834000826&systemid=Aomori_Pref&format=json

  - 使用目的2: それぞれの市区町村における、図書館名、およびWeb APIないで使用される各図書館固有のIDを取得
    - 実行例：
      - http://api.calil.jp/library?appkey={あなたのアプリキー}&pref=世田谷区

2. [OpenBD](https://openbd.jp/)
  - ISBNを元に書籍の概要（タイトル、著者、カバー画像など）を取得するために使用
    - 実行例:
      - https://api.openbd.jp/v1/get?isbn=978-4-7808-0204-7&pretty
