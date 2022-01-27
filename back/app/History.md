## express typescript

-   apt-get update
-   apt-get install curl
-   npm init -y
-   npm i -D typescript ts-node
-   npx typescript init
-   npm i express
-   npm i -D @types/express @types/node nodemon ts-node-dev rimraf npm-run-all
-   npm i dotenv fs-extra mongoose

## process.env にハマりまくった

-   config/config.env 内に env を書いて server.ts で path 指定して呼び出すやり方だと読み込めなかった。（ts）
-   root(app/)に.env を作ってそこに記述すれば読み込めた。gitignore で監視から外すため再利用時は再作成要
