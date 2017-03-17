var Counter = artifacts.require("./Counter.sol");
var Randao = artifacts.require("./Randao.sol");

module.exports = function(deployer) {
  deployer.deploy(Counter);
  deployer.deploy(Randao);
};
