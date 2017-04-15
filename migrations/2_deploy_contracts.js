var Randao = artifacts.require("./Randao.sol");

module.exports = function(deployer) {
  deployer.deploy(Randao);
};
