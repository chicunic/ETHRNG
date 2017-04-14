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
			return randao.count.call();				
		}).then((tx)=>{
			console.log("合约号：" ,String(tx));			
		})

	})
})

