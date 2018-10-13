module.exports = {
  networks: {
    poa: {
      host: "ethmegghq-dns-reg1.japaneast.cloudapp.azure.com",
      port: 8540,
      network_id: "*", // Match any network id
      gas: 3500000,
      gasPrice: 2100000000000,
      from: '0xb10d89ce1e7db8ddab04185082957a6482c73276'
    }
  }
};
