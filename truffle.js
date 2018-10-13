const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    poa: {
      provider: new HDWalletProvider(process.env.MNEMONIC, process.env.ETHEREUM_RPC_ENDPOINT),
      network_id: "*",
      gasPrice: 0
    }
  }
};
