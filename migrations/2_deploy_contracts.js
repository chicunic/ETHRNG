/* global artifacts */

var Ethrng = artifacts.require('./Ethrng.sol')

module.exports = function (deployer) {
  deployer.deploy(Ethrng)
}
