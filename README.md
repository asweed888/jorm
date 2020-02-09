# JORM
jormはgormに似せたapiで  
javascriptのインメモリキャッシュへの読み書きができるapiです。  
  
 
## installation

### 1. npmで`@gqlkit/client`パッケージをインストールします。
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
