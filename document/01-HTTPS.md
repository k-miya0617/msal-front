# HTTPS を用いた開発サーバの構築方法

以下のドキュメントでは、以下の目的を達成するためのハウツーである。

- 開発サーバの HTTPS 化

以下のドキュメントを参考にした  
https://zenn.dev/sotszk/articles/b4e6a4e19d2e35

1. 開発サーバを停止させる

2. 証明書を作成する  
    WSL (Windows Subsystem for Linux), あるいは Linux, Mac を用いて、以下のコマンドを実行する。

   ```
   $ openssl req -x509 -out localhost.crt -keyout localhost.key \
   -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
   ```

   コマンドを実行すると、カレントディレクトリに

   - localhost.crt
   - localhost.key  
     が生成される。

   ※ Powershell, CMD で実行する方法は、別途調査しないとわからないです...。

3. 生成した証明書をプロジェクトへ移動する  
   配置先は /certificates/ とする

   ※セキュリティ的な問題を防ぐため、一般的に、証明書は git の追跡対象外とすることが多い。このドキュメントでは、git の追跡対象外にする手順は解説しない。

4. express サーバのインストール  
   以下のコマンドを実行する。  
   `$ npm install express`

5. server.js の作成
   HTTPS 化するため、カスタムサーバを立てる。はじめに、server.js を作成する。中身は以下通り。

   ```javascript
   const express = require("express");
   const next = require("next");
   const https = require("https");
   const fs = require("fs");

   const host = "0.0.0.0";

   const app = next({
     dev: process.env.NODE_ENV !== "production",
   });
   const handle = app.getRequestHandler();

   (async () => {
     await app.prepare();
     const expressApp = express();

     expressApp.all("*", (req, res) => handle(req, res));

     const hasCertificates =
       fs.existsSync("./certificates/localhost.key") &&
       fs.existsSync("./certificates/localhost.crt");

     const useHttps = hasCertificates && process.env.HTTPS === "true";

     console.log(
       `> env settings: ${process.env.HTTPS === "true" ? "HTTPS" : "HTTP"}`
     );
     console.log(
       `> has certificate files is ${hasCertificates ? "exist" : "not exist"}`
     );

     if (process.env.HTTPS === "true" && !hasCertificates) {
       console.warn(
         "You chose to launch with HTTPS, but can't exist a certificate. The server will launch with HTTP."
       );
     }

     if (useHttps) {
       const options = {
         key: fs.readFileSync("./certificates/localhost.key"),
         cert: fs.readFileSync("./certificates/localhost.crt"),
       };

       const server = https.createServer(options, expressApp);
       server.listen("443", host);
       console.log(`> Ready on https://localhost`);
     } else {
       expressApp.listen("3000", host);
       console.log(`> Ready on http://localhost:3000`);
     }
   })();
   ```

6. package.json の修正  
   pacjage.json の "scripts" の部分を以下の通りに書き換える

   ```json
   "scripts": {
     "dev": "set HTTPS=true&&node ./server.js",
     "dev:http": "set HTTPS=false&&node ./server.js",
     "build": "next build",
     "start": "set NODE_ENV=production&&set HTTPS=true&&node ./server.js",
     "start:http": "set NODE_ENV=production&&set HTTPS=false&&node ./server.js",
     "lint": "next lint"
   },
   ```

   ※補足

   - npm run dev を実行すると、HTTPS での起動を試行する。
   - npm run dev:http を実行すると、従来の HTTP での起動を試行する。

7. 開発サーバ起動
   `$ npm run dev` を実行し、ターミナル上に `Ready on https://localhost` が表示されたら成功。

8. トラブルシューティング
   - 起動時にターミナルに`You chose to launch with HTTPS, but can't exist a certificate. The server will launch with HTTP.`と出力される。  
     → このエラーは、適切なディレクトリに証明書ファイルが存在しなかったため、HTTP でサーバが起動したことを示している。/certificates/ に localhost.crt と localhost.key が存在することを確認してください。
