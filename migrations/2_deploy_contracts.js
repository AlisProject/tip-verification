const MSAToken = artifacts.require('MSAToken.sol');

module.exports = function deployContracts(deployer) {
  deployer.deploy(MSAToken);
};
