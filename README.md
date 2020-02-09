# JORM
jormはgormに似せたapiで  
javascriptのインメモリキャッシュへの読み書きができるapiです。  
  
 
## Installation

### npmで`@gqlkit/client`パッケージをインストールします。
```
npm i @gqlkit/client
```
`@gqlkit/client`パッケージには下記のパッケージが含まれています。  
`@gqlkit/client`をインストールするだけでGraphQLクライアントに必要な最低限のパッケージは揃います。  
また、jormでは不十分な場合、`lowdb`や`lokijs`を使用することもできます。  
お好みのキャッシュDBをお使いください。  
- @gqlkit/jorm
- graphql
- graphql-tag
- lokijs
- lowdb
- ramda

## Set up
jormを利用する前準備は非常に簡単です。  
`cache.js`などのファイル名で下記の3行の記述で前準備は完了です。  
`export default cache`としてapiをexportしてやります。  
実際にhttpResolverに組み込む例は  
[こちら](https://github.com/gqlkit-lab/httpResolver/blob/master/resolvers/cache.js)をご覧ください。
```
import { jorm } from '@gqlkit/jorm'

const cache = new jorm.Open({})

export default cache
```

## Documentation
jormは、gormを参考にgormと似たapiを提供しますが  
javascriptのObjectの特性上、またはインメモリキャッシュへの読み書きという使用用途のみを想定しているので  
現在のところ提供するapiは、下記一覧の通りとなります。

| api | 概要 |
|-----|-----|
| Regist | 新規コレクション登録・初期化 |
| Create | 新規ドキュメントを追加 |

