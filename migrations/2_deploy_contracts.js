var Selection = artifacts.require("./Selection.sol");
var Randao = artifacts.require("./Randao.sol");

module.exports = function(deployer) {
  deployer.deploy(Selection);
  deployer.deploy(Randao);
};
