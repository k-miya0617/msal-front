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

   ※ Powershell, CMD で実行する方法は、別途調査しないとわからないです...。

3. 生成した証明書をプロジェクトへ移動する
