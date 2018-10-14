import fs from 'fs';

const MSATokenABI = fs.readFileSync('./misc/MSAToken.abi', 'utf-8');

const Web3 = require('web3');
const _web3 = new Web3();

_web3.setProvider(new _web3.providers.HttpProvider(process.env.ETHEREUM_RPC_ENDPOINT));
export const web3 = _web3;

// export const MSAToken = new web3.eth.Contract(JSON.parse(MSATokenABI)).at(address);
export const MSAToken = new web3.eth.Contract(JSON.parse(MSATokenABI), process.env.POA_CHAIN_MSA_TOKEN_ADDRESS);
