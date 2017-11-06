/* global  artifacts contract it web3 */
var Ethrng = artifacts.require('./Ethrng.sol')

contract('Ethrng', function (accounts) {
  it('ethrng campaign lifecycle', function () {
    var ethrng
    var bnum = web3.eth.blockNumber + 5
    var deposit = web3.toWei('1', 'ether')
    var campaignID
    var tem1
    var tem2
    // console.log('gasprice:', web3.eth.gasPrice.toNumber())
    console.log('target blockNumber: ', bnum)
    console.log('newethrng at blockNumber: ', web3.eth.blockNumber)
    return Ethrng.deployed().then(function (instance) {
      ethrng = instance
      tem1 = web3.eth.getBalance(accounts[0]).toNumber()
      return ethrng.newCampaign(bnum, deposit, 2, { from: accounts[0], value: web3.toWei(1, 'ether') })
    }).then((tx1) => {
      // console.log('发起一次产生随机送活动交易信息', tx1)
      tem2 = web3.eth.getBalance(accounts[0]).toNumber()
      console.log('gas', tem1 - tem2)
      return ethrng.numCampaigns.call()
    }).then(function (campaignid) {
      campaignID = campaignid.toNumber() - 1
      console.log('campaignId', campaignID)
      console.log('发起活动后区块高度: ', web3.eth.blockNumber)
    }).then(() => {
      console.log('提交随机数时区块高度: ', web3.eth.blockNumber)
      console.log('第一个参与者accounts[3]参与时高度: ', web3.eth.blockNumber)
      return ethrng.commit(campaignID, 10, { from: accounts[3], value: web3.toWei(1, 'ether') })
    }).then(() => {
      console.log('第二个参与者accounts[2]参与时高度', web3.eth.blockNumber)
      return ethrng.commit(campaignID, 100, { from: accounts[2], value: web3.toWei(1, 'ether') })
    }).then(() => {
      console.log('第三个参与者accounts[4]参与时高度', web3.eth.blockNumber)
      return ethrng.commit(campaignID, 1, { from: accounts[4], value: web3.toWei(1, 'ether') })
    }).then(() => {
      console.log('第四个参与者accounts[1]参与时高度', web3.eth.blockNumber)
      console.log('参与者参与活动前余额', web3.eth.getBalance(accounts[1]).toNumber())
      return ethrng.commit(campaignID, 1000, { from: accounts[1], value: web3.toWei(1, 'ether') })
    })
      .then(function (commit) {
        console.log('参与者参与活动后账户余额', web3.eth.getBalance(accounts[1]).toNumber())
        console.log('参与者提交一个随机数', commit)
        console.log('增加一个区块到达可以查看随机数区块高度')
        return ethrng.test()
      })
      .then(() => {
        console.log('增加区块后区块高度', web3.eth.blockNumber)
        tem1 = web3.eth.getBalance(accounts[0]).toNumber()
        return ethrng.getRandom.call(campaignID, { from: accounts[0] })
      }).then((random) => {
        console.log('随机数random:', random)
        tem2 = web3.eth.getBalance(accounts[0]).toNumber()
        console.log('gas', tem1 - tem2)
        // return ethrng.flag.call()
      })
      .then(() => {
        console.log('参与者获得赏金前账户余额', web3.eth.getBalance(accounts[1]).toNumber())
        console.log('getMyBounty,当前区块高度', web3.eth.blockNumber)
        return ethrng.getMyBounty(campaignID, { from: accounts[1] })
      })
      .then((tx5) => {
        console.log('参与者获得赏金信息', tx5)
        console.log('参与者获得赏金后余额', web3.eth.getBalance(accounts[1]).toNumber())
      }).then(() => {
        console.log('发起者返回赏金前余额', web3.eth.getBalance(accounts[0]).toNumber())
        return ethrng.refundBounty(campaignID, { from: accounts[0] })
      }).then((tx6) => {
        // console.log(tx6)
        console.log('发起者返回赏金后余额', web3.eth.getBalance(accounts[0]).toNumber())
      })
  })
})
