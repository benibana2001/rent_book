## React

[こちら](https://ja.reactjs.org/docs/static-type-checking.html#typescript)を使用してプロジェクトを初期化しています。

## API
こちらのAPIを使用しています。
[図書館API仕様書 | カーリル](https://calil.jp/doc/api_ref.html)

### 蔵書検索
> 実行例：
http://api.calil.jp/check?appkey={あなたのアプリキー}&isbn=4834000826&systemid=Aomori_Pref&format=json

### 図書館データベース
> 実行例：
http://api.calil.jp/library?appkey={あなたのアプリキー}&pref=埼玉県
http://api.calil.jp/library?appkey={あなたのアプリキー}&geocode=136.7163027,35.390516&limit=10