// app.js
/* global web3 alert App */

// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import ethrngArtifacts from '../../build/contracts/Ethrng.json'

import activity from '../javascripts/webReady'
import { clickBtnSubmitSecrets } from '../javascripts/webEvents'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Ethrng = contract(ethrngArtifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts
// var account

window.App = {
  start: function () {
    // var self = this

    // Bootstrap the MetaCoin abstraction for Use.
    Ethrng.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      // account = accounts[0]

      // self.refreshBalance()
    })
  },

  runEthrng: function () {
    var ethrng
    // 从 web 接收的参数值
    const [
      bnum, // bnum 目标区块数
      deposit, // deposit 押金
      lowest, // lowest 目标最低参与人数
      participant, // participant 实际参与人数
      finney, // finney 赏金
      secretList, // secretList 用户提交的随机数列表
      extra // 补充的循环次数
    ] = [
      web3.eth.blockNumber + activity.bnum,
      web3.toWei(activity.deposit, 'ether'),
      activity.lowest,
      activity.participant,
      activity.finney,
      activity.secretList,
      activity.bnum = activity.participant
    ]
    var gas = 1e+6

    console.log('当前区块数 blockNumber: ', web3.eth.blockNumber)
    console.log('目标区块数 bnum: ', bnum)
    console.log('押金 deposit: ', deposit)
    console.log('目标最低参与人数 lowest: ', lowest)
    console.log('实际参与人数 participant: ', participant)
    console.log('赏金 finney: ', finney)
    console.log('secretList: ', secretList)

    let campaignID // campaignID 活动号
    Ethrng.deployed().then(function (instance) {
      ethrng = instance
      return ethrng.newCampaign(bnum, deposit, lowest, { from: accounts[0], value: finney, gas: gas }) // 生成一个区块
    }).then(function (tx) {
      console.log('合约号: ', tx)
      return ethrng.numCampaigns.call()
    }).then(function (campaignid) {
      campaignID = campaignid.toNumber() - 1
      console.log('campaignID: ', campaignID)
      for (let i = 1; i <= participant; i++) {
        let seedsecret = secretList[i - 1]
        console.log('参与者', i, '提交的随机数: ', seedsecret)
        ethrng.commit(campaignID, seedsecret, { from: accounts[i], value: deposit, gas: gas })
      }
      console.log('当前区块号: ', web3.eth.blockNumber)
    }).then(function () {
      for (let i = 0; i < extra; i++) {
        ethrng.test({ from: accounts[0], gas: gas })
        console.log('当前区块号: ', web3.eth.blockNumber)
      }
    }).then(function () {
      console.log('增加区块后区块高度: ', web3.eth.blockNumber)
      return ethrng.getRandom.call(campaignID, { from: accounts[0] })
    }).then(function (random) {
      console.log('random: ', random)
      clickBtnSubmitSecrets(random)
    })
  }
}

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you" +
    // " have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link." +
    // ' Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask')
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    // console.warn('No web3 detected. Falling back to http://localhost:9545. You should remove this fallback when' +
    // " you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info" +
    // ' here: http://truffleframework.com/tutorials/truffle-and-metamask')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'))
  }

  App.start()
})
