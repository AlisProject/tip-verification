const MSAToken = artifacts.require('MSAToken.sol');

module.exports = function deployContracts(deployer) {
  deployer.deploy(MSAToken, process.env.POA_CHAIN_ADMIN_PUBLIC_KEY);
};
