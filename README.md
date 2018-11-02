[![ALIS](./src/image/logo.png)](https://prtimes.jp/main/html/rd/p/000000005.000027792.html)  

マイクロソフト社との[投げ銭API開発のための協業](https://prtimes.jp/main/html/rd/p/000000005.000027792.html)に関連するリソースを管理するリポジトリ。

# 必須環境
- [Microsoft Azure](https://azure.microsoft.com/ja-jp/)のアカウント
- [Azure CLI](https://docs.microsoft.com/ja-jp/cli/azure/install-azure-cli?view=azure-cli-latest)
  
# 事前準備
- Azure CLIにログイン
  - `az login`
  
# デプロイ
`<subscriptionId>`をAzureのサブスクリプションIDに書き換えてスクリプトを実行。(〜30分程度)  
サブスクリプションIDはAzureにログインしていれば[サブスクリプションの画面](https://portal.azure.com/?pub_source=email&pub_status=success#blade/Microsoft_Azure_Billing/ModernBillingMenuBlade/Subscriptions)で確認できる。

```bash
./deploy.sh -i <subscriptionId> -g alispoa -n alispoadeploy -l centralus
```

- パラメータは以下のように対応しているので適宜書き換える
  - resourceGroupName: `alispoa`
  - deploymentName: `alispoadeploy`
  - resourceGroupLocation: `centralus`

# 環境の情報を取得
環境を利用するために必要な情報を取得する。
- ※ [jq](https://stedolan.github.io/jq/)のインストールが必要

```bash
az group deployment show -g alispoa -n alispoadeploy | jq '.properties.outputs'
```  

上記スクリプト実行で以下のような情報が取得できる。

- admin_site: 管理用ページのURL
- ethereum_rpc_endpoint: EthereumのRPCリクエストのエンドポイント
- oms_portal_url: Azure Monitor ポータルのURL。ネットワーク統計情報＆各ノードの情報を監視。
- ssh_to_first_vl_node_region1: parityノードの一つに接続するためのSSHコマンド

**取得した情報の例:**
```json
{
  "admin_site": {
    "type": "String",
    "value": "http://ethfoobar-dns-reg1.japaneast.cloudapp.azure.com"
  },
  "consortium_data_URL": {
    "type": "String",
    "value": "http://ethfoobar-dns-reg1.japaneast.cloudapp.azure.com"
  },
  "consortium_member_gateway_id_region1": {
    "type": "String",
    "value": "NA"
  },
  "ethereum_rpc_endpoint": {
    "type": "String",
    "value": "http://ethfoobar-dns-reg1.japaneast.cloudapp.azure.com:8540"
  },
  "oms_portal_url": {
    "type": "String",
    "value": "https://eus.mms.microsoft.com/Account?tenant=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx&resource=...ethfoobar-oms"
  },
  "pair_Gateway_Azure_CLI_Script": {
    "type": "String",
    "value": "NA"
  },
  "pair_Gateway_PS_Module": {
    "type": "String",
    "value": "NA"
  },
  "regionOneVnet": {
    "type": "String",
    "value": "ethfoobar-vnet-reg1"
  },
  "ssh_to_first_vl_node_region1": {
    "type": "String",
    "value": "ssh -p 4000 parityadmin@ethfoobar-dns-reg1.japaneast.cloudapp.azure.com"
  }
}
```

# 環境へのSSH接続を行う
上記の手順で取得した `ssh_to_first_vl_node_region1` のコマンドを利用する。  
パスワードは `./parameters.json` に定義されている。デフォルト:`A32a5d04fe39dd5b6cfcdcf7629f61953`

**コマンドの例:**
```bash
ssh -p 4000 parityadmin@ethfoobar-dns-reg1.japaneast.cloudapp.azure.com
```

# RPCリクエストを行う
上記の手順で取得した `ethereum_rpc_endpoint` の値を利用してプライベートチェーンへRPCリクエストを行う。

**最新のブロックナンバーを取得するCURLリクエストコマンドの例:**
```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' -H "Content-Type: application/json"  http://ethfoobar-dns-reg1.japaneast.cloudapp.azure.com:8540
```

**成功時のレスポンスの例:**

```json
{"jsonrpc":"2.0","result":"0x9fb37","id":1}
```

# コントラクトのデプロイを行う
- 以下のツールが必要
  - [ndenv](https://github.com/riywo/ndenv)
  - [yarn](https://yarnpkg.com/lang/ja/)
  - [direnv](https://github.com/direnv/direnv)

ここでは、例として標準的なERC20トークン `MSAToken` のコントラクトをプライベートチェーンへデプロイする。
- トークンコントラクト: `contract/MSAToken.sol`

必要なリソースのインストール:

```bash
ndenv install
yarn
yarn truffle install
```

環境情報の `ethereum_rpc_endpoint` のURLとポートを、`ETHEREUM_RPC_ENDPOINT`として環境変数へ定義する:

```bash
# ethereum_rpc_endpointの表示
yarn rpc

# 環境変数の定義
cp -p .envrc.sample .envrc
direnv edit
```

truffleを利用しコントラクトをデプロイ:

```bash
yarn truffle deploy --network poa
```

デプロイ時に表示された `MSAToken` のアドレスを環境変数 `POA_CHAIN_MSA_TOKEN_ADDRESS` へ反映しておく。

```bash
direnv edit
```

# ERC20トークンの操作
デプロイが完了していればweb3.jsからERC20トークンの操作が可能。

デフォルトで100MSAが格納される `POA_CHAIN_ADMIN_PUBLIC_KEY` の残高を確認する例:

```bash
yarn babel-node ./misc/balanceOf.js
```

# UIによる操作
ERC20トークンを、[MetaMask](https://metamask.io/)を用いて投げ銭を行うまでの手順を記載する。

## 準備
- 使用するブラウザにMetaMaskをインストール

## フロントエンドの立ち上げ

```bash
yarn dev
```

## MetaMaskのアカウントをインポート
`.envrc` にて定義した `MNEMONIC` を用いて検証用アカウントをインポート。


## MetaMaskのネットワーク設定
MetaMaskのネットワークをAzure上に構築したチェーンへ向ける。  
RPCエンドポイントの情報が必要。

```bash
yarn rpc
```

ここまでの設定で、ブラウザのUIに **トークン残高: 100 MSA** と表示される。

## 投げ銭を実施

1. 投げ銭を行うトークンの量を入力
1. **トークンを贈る** を押下
1. MetaMaskの確認画面がポップアップするので **確認** を押下 


- ※贈り先は検証なのでスクリプト内にリテラルとして保持されている。

# Tips

## Validatorノードの主要ファイルのパス

- config.toml: parityの設定ファイル
  - `/home/parityadmin/config/node.toml`
- parity
  - `/var/log/parity/parity.log`

## リソースグループの削除

```bash
az group delete -n alispoa
```

## web3.jsを利用したプライベートチェーンの利用
web3.jsを利用したスクリプトを実行。

**最新のブロックナンバーを取得する例:**

```bash
yarn babel-node ./misc/getBlockNumber.js
```

**成功時のレスポンスの例:**

```bash
654130
```

# 備考
- 検証で利用しているEOAやニーモニックフレーズは本番環境で利用しないでください
