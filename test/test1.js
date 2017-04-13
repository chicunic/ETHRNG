var Randao = artifacts.require("./Randao.sol")

contract('Randao', function (accounts) {
	it("randao campaign lifecycle", function () {
		var randao;
		var bnum = web3.eth.blockNumber + 5;//目标区块高度
		var deposit = web3.toWei('1', 'ether');
		var campaignID;
		var secret;

		console.log('target blockNumber: ', bnum);
		console.log('newrandao at blockNumber: ', web3.eth.blockNumber);
		return Randao.deployed().then(function (instance) {
			randao = instance;
			randao.newCampaign(bnum, deposit, 2, { from: accounts[0], value: web3.toWei(1, "ether") })//生成一个区块			
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
				return randao.test();
			})
			.then(() => {
				console.log('增加区块后区块高度', web3.eth.blockNumber);
				return randao.getRandom.call(campaignID, { from: accounts[0] });
			}).then((random) => {
				console.log('随机数random:', random);				
			})

	})
})

