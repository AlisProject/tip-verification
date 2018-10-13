const Web3 = require('web3');
const _web3 = new Web3();

_web3.setProvider(new _web3.providers.HttpProvider(process.env.ETHEREUM_RPC_ENDPOINT));
export const web3 = _web3;
