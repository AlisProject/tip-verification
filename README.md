# 必須環境
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
  
  
# Tips

## リソースグループの削除

```bash
az group delete -n alispoa
```