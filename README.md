# JORM
jormはgormに似たapiで  
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
javascriptのObjectの特性上の理由や  
インメモリキャッシュへの読み書きという使用用途のみを想定しているという理由から  
現在のところ、提供するapiは下記表の通りとなります。  
gormには存在しているWhereなどは、現状キャッシュの書き込みの際、  
variablesに必ずidが渡されることが想定される為、未実装です。  
その為、GraphQLサーバーが提供するjsonデータのドキュメントには、必ず`id`という名のフィールドが存在していなければなりません。

 *表中の`Doc`など、独自の型については[こちら](https://github.com/gqlkit-lab/jorm/blob/master/src/type.ts)をご確認ください。

| api | 概要 |
|-----|-----|
| cache.Regist(collectionName: string, newCollection: any) | コレクションの新規登録・初期化・上書き |
| cache.Create(collectionName: string, newDoc: Doc) | ドキュメントの新規追加 |
| cache.Update(collectionName: string, targetDoc: Doc) | ドキュメントの更新(idによってドキュメントを特定) |
| cache.Delete(collectionName: string, targetDoc: Doc) | ドキュメントの削除(idによってドキュメントを特定) |
| cache.Find(collectionName: string) | コレクションの取得(ドキュメント全件取得) |

