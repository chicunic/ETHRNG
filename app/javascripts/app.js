// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import randao_artifacts from '../../build/contracts/Randao.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Randao = contract(randao_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Randao.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
     // alert(0);
      self.runRandao();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },


  runRandao: function() {
    var randao;
		var bnum = web3.eth.blockNumber + 5;//目标区块高度
		var deposit = web3.toWei('1', 'ether');
		var campaignID;
		var secret;
    // alert("当前区块高度"+web3.eth.blockNumber);
    console.log('target blockNumber: ', bnum);
		console.log('newrandao at blockNumber: ', web3.eth.blockNumber);
    Randao.deployed().then(function(instance) {
      randao = instance;
			return randao.newCampaign(bnum, deposit, 2, { from: accounts[0], value: web3.toWei(1, "ether"),gas:1e+18  })//生成一个区块					
		}).then((tx)=>{
			console.log("合约号：" ,tx);
			return randao.numCampaigns.call();
		}).then((campaignid)=>{
			campaignID = campaignid.toNumber() - 1;
			console.log('campaignId', campaignID);
			for(var i=1;i<=4;i++){	//生成四个区块
				secret=10*i;
				randao.commit(campaignID, secret, { from: accounts[i], value: web3.toWei(1, "ether") });
			}
			console.log('Now blockNumber: ', web3.eth.blockNumber);

		}).then(()=> {
				console.log('增加一个区块到达可以查看随机数区块高度');
				return randao.test({ from: accounts[0],gas:1e+18 });
			})
			.then(() => {
				console.log('增加区块后区块高度', web3.eth.blockNumber);
				return randao.getRandom.call(campaignID, { from: accounts[0],gas:1e+19});
			}).then((random) => {
				console.log('随机数random:', random);				
			})
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});