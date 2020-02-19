# JORM
jormはgormに似たapiで  
javascriptのインメモリキャッシュへの読み書きができるapiです。  
[Resolved API](https://github.com/gqlkit-lab/rapi)のclientによって  
GraphQLサーバーから取得したデータをcacheへ書き込んだり、読み込んだり  
といった用途で使用します。
  
 
## Installation

### npmで`@gqlkit/client`パッケージをインストールします。
```
npm i @gqlkit/client
```
`@gqlkit/client`パッケージには下記のパッケージが含まれています。  
`@gqlkit/client`をインストールするだけでGraphQLクライアントに必要な最低限のパッケージは揃います。  
また、jormでは不十分な場合、`@gqlkit/client`には`lowdb`や`lokijs`も含まれていますのでそれらを使用することもできます。  
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
実際に[Resolved API](https://github.com/gqlkit-lab/rapi)に組み込む例は  
[こちら](https://github.com/gqlkit-lab/rapi/blob/master/resolvers/cache.js)をご覧ください。
```javascript
import { jorm } from '@gqlkit/jorm'

const cache = new jorm.Open({})

export default cache
```

## Documentation
jormは、gormを参考にgormと似たapiを提供しますが  
javascriptのObjectの特性上の理由や  
インメモリキャッシュへの読み書きという使用用途のみを想定しているという理由から  
現在のところ、提供するapiは下記表の6つのみとなります。  
gormには存在しているWhereなどは、現状キャッシュの書き込みの際、  
variablesに必ずidが渡されることが想定される為、未実装です。  
その為、GraphQLサーバーが提供するjsonデータのドキュメントには、必ず`id`という名のフィールドが存在していなければなりません。

 *表中の`Doc`など、独自の型については[こちら](https://github.com/gqlkit-lab/jorm/blob/master/src/type.ts)をご確認ください。

| api | 概要 |
|-----|-----|
| [Regist](https://github.com/gqlkit-lab/jorm/blob/master/README.md#registcollectionname-string-newcollection-doc-collection) | コレクションの新規登録・初期化・上書き |
| [Create](https://github.com/gqlkit-lab/jorm/blob/master/README.md#createcollectionname-string-newdoc-doc-collection) | ドキュメントの新規追加 |
| [Update](https://github.com/gqlkit-lab/jorm/blob/master/README.md#updatecollectionname-string-targetdoc-doc-collection) | ドキュメントの更新(idによってドキュメントを特定) |
| [Delete](https://github.com/gqlkit-lab/jorm/blob/master/README.md#deletecollectionname-string-targetdoc-doc-collection) | ドキュメントの削除(idによってドキュメントを特定) |
| [Find]((https://github.com/gqlkit-lab/jorm/blob/master/README.md#findcollectionname-string-targetdoc-doc-collection)) | コレクションの取得 |
| Show | cache全体の状態をコンソールへ出力 |

## Example of use
下記の例は[Resolved API](https://github.com/gqlkit-lab/rapi)での導入例です。  
`Resolved API`のclient.jsのソースコードは、[こちら](https://github.com/gqlkit-lab/rapi/blob/master/resolvers/client.js)を確認してください。
### Regist(collectionName: string, newCollection: Doc[]): Collection
```javascript
import client from '../client'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    query {
        users {
            id
            name
            age
        }
    }
`

// resolver
export default async variables => {
    // キャッシュにコレクションが未登録の場合、リモートデータを取得し、キャッシュにコレクションを追加する
    if (!cache.Find("users")) {
        const { users } = await client.req(demand)
        
        cache.Regist('users', users)
    }

    return cache.Find("users")
}

```

### Create(collectionName: string, newDoc: Doc): Collection
```javascript
import client from '../client'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    mutation($name: String!, $age: Int!) {
        createUser(name: $name, age: $age) {
            id
            name
            age
        }
    }
`

// resolver
export default async ({ name, age }) => {
    const res = await client.req(demand, { name, age })
    const user = res.createUser

    return cache.Create('users', user)
}

```

### Update(collectionName: string, targetDoc: Doc): Collection
 *jormでは、firebaseのfirestoreなどとは異なり、現状サブコレクションという概念は想定しません。  
ですので、サブコレクションのフィールド毎の更新という処理は行わず、あくまでもサブコレクションは1フィールドという扱いで  
更新の際は、全件上書きという対応で処理を行います。  
これは、キャッシュに対する処理をできる限りシンプルにすることでキャッシュとサーバー側のDBとの差分発生などのトラブルを防ぐ為です。  
キャッシュは、あくまでも仮のDBであり、複雑な処理は出来る限り排除すべきです。
```javascript
import client from '../client'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    mutation($id: ID! $name: String!, $age: Int!) {
        updateUser(id: $id, name: $name, age: $age) {
            id
            name
            age
        }
    }
`

// resolver
export default async ({ id, name, age }) => {
    const res = await client.req(demand, { id, name, age })
    const user = res.updateUser

    return cache.Update('users', user)
}
```

### Delete(collectionName: string, targetDoc: Doc): Collection
```javascript
import client from '../client'
import cache from '../cache'
import gql from 'graphql-tag'

export const demand = gql`
    mutation($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`

// resolver
export default async ({ id }) => {
    const res = await client.req(demand, { id })
    const user = res.deleteUser

    return cache.Delete('users', user)
}

```

### Find(collectionName: string, targetDoc: Doc = null): Collection
キャッシュから指定したコレクション名のコレクションを取得します。
targetDocを指定するとidによる一件取得も可能です。
targetDocが指定されていない場合は全件取得になります。
```javascript
// 全件取得
const users = cache.Find('users')
// 一件取得
const [ user ] = cache.Find('users', {id})
```
