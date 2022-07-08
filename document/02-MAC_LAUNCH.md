# Mac (Linux) での開発サーバ起動方法

以下のドキュメントでは、以下の目的を達成するためのハウツーである。

- Mac や Linuc で開発サーバを起動する方法

以下のドキュメントの作業を終了していることを前提とする

- HTTPS を用いた開発サーバの構築方法 (01-HTTPS.md)  
  (package.json を修正するため)

1. package.json を修正する  
   package.json を以下の通りに修正する。

   ```json
   "scripts": {
     "dev": "set HTTPS=true&&node ./server.js",
     "dev:http": "set HTTPS=false&&node ./server.js",
     "dev:m": "HTTPS=true node ./server.js",
     "dev:m:http": "HTTPS=false node ./server.js",
     "build": "next build",
     "start": "set NODE_ENV=production&&set HTTPS=true&&node ./server.js",
     "start:http": "set NODE_ENV=production&&set HTTPS=false&&node ./server.js",
     "lint": "next lint"
   },
   ```
