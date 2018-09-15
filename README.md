# 必須環境
- [Azure CLI](https://docs.microsoft.com/ja-jp/cli/azure/install-azure-cli?view=azure-cli-latest)
- [jq](https://stedolan.github.io/jq/)
  
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

```bash
az group deployment show -g alispoa -n alispoadeploy | jq '.properties.outputs'
```  

上記スクリプト実行で以下のような情報が取得できる。

- admin_site: 管理用ページのURL
- consortium_data_URL:  
- ethereum_rpc_endpoint: EthereumのRPCリクエストのエンドポイント
- oms_portal_url: Azure Monitor ポータルのURL。ネットワーク統計情報＆各ノードの情報を監視。
- ssh_to_first_vl_node_region1: parityノードの一つに接続するためのSSHコマンド

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

# Tips

## リソースグループの削除

```bash
az group delete -n alispoa
```