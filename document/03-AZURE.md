# Next-auth を用いた Microsoft Azure Active Directory へのログイン機能の実装方法

以下のドキュメントでは、以下の目的を達成するためのハウツーである。

- Microsoft Azure Active Directory の設定方法
- next-auth の導入
- next-auth での Microsoft Azure Active Directory の設定および実装

## Microsoft Azure Active Direcotry の設定方法

この章では、next-auth を用いた認証機能の実装のため、予め行うべき Microsoft Azure Active Directory の設定方法を説明する。

以下のページを参考にした。  
https://next-auth.js.org/providers/azure-ad

1. アプリを登録したい組織のトップページへ遷移する。  
   https://portal.azure.com/#home  
   へ遷移し、Azure サービスから Azure Active Directory を選択する。

2. 左側のメニューから「アプリの登録」を押下する。
3. 画面上部の「＋新規登録」を押下し、アプリケーションの新規登録をする。
4. アプリケーションの名前を入力した後、リダイレクト URL を指定する。  
   「Web」「https://localhost/api/auth/callback/azure-ad」を指定し、登録ボタンを押下する。
5. 左側のメニューから「証明書とシークレット」を押下する。
6. 画面中央の「＋新しいクライアント シークレット」を押下する。
7. 説明（内容は任意）と有効期限（任意）を指定し、画面下部の「追加」を押下する。
8. 画面上に新しく追加されたシークレットを確認する。追加されたシークレットの「値」を控える。  
   以下、当該の値を"シークレット値"と呼称する。
9. 左側のメニューから「概要」を押下する。
10. 画面上に表示された「アプリケーション(クライアント) ID」「ディレクトリ(テナント)ID」を控える。  
    以下、"クライアント ID", "テナント ID" と呼称する。

## next-auth の導入

この章では、next.js プロジェクトに next-auth を導入する

1. 次のコマンドを実行する
   `$ npm install next-auth`  
   memo:  
   2022/7/8 現在、"next-auth@4.9.0" と "openid-client@5.1.8" が Unsupported となっているが、問題ないと考えている。

## next-auth での Microsoft Azure Active Directory の設定および実装

この章では、next-auth に Microsoft Azure Active Directory への認証機能の設定および実装を行う。

1. 環境変数ファイルを作成する。/.env.local ファイルを作成する。
2. 執筆中
