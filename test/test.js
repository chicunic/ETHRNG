var Randao=artifacts.require("./Randao.sol")

contract('Randao', function(accounts) {
  it("randao campaign lifecycle", function(){
    var randao ;
    var bnum = web3.eth.blockNumber + 4;
    var deposit = web3.toWei('1', 'ether');
    var campaignID;
    var secret;
	
	//console.log('gasprice:',web3.eth.gasPrice.toNumber())
    console.log('target blockNumber: ', bnum);
    console.log('newrandao at blockNumber: ', web3.eth.blockNumber);
 	return Randao.deployed().then(function(instance){
			randao=instance;
			return randao.newCampaign(bnum, deposit,1,{from: accounts[0], value:web3.toWei(1, "ether")})
			}).then((tx1)=>{
			console.log('发起一次产生随机送活动交易信息',tx1);
			return randao.numCampaigns.call();
			}).then(function(campaignid){
			campaignID = campaignid.toNumber();
			console.log('campaignId',campaignID);
		 	console.log('发起活动后区块高度: ', web3.eth.blockNumber);
			return randao.newCampaign(bnum, deposit,1,{from: accounts[0], value:web3.toWei(1, "ether")})
			}).then(()=>{
			secret=123456;
		 	console.log('提交随机数时区块高度: ', web3.eth.blockNumber);
			console.log('参与者accounts[1]参与活动前账户余额',web3.eth.getBalance(accounts[1]).toNumber());
			console.log('第一个参与者accounts[2]');
			randao.commit(campaignID,secret,{from :accounts[2],value: web3.toWei(1,"ether")});
			console.log('第二个参与者accounts[1]');
			return randao.commit(campaignID,secret,{from :accounts[1],value: web3.toWei(1,"ether")});	
			})
			.then(function(commit){
			console.log('参与者提交一个随机数',commit);
			//console.log('参与者参与活动前余额',web3.eth.getBalance(accounts[1]).toNumber());
			console.log('提交随机送区块高度: ', web3.eth.blockNumber);
			return randao.newCampaign(bnum, deposit,1,{from: accounts[0], value:web3.toWei(1, "ether")})
			})
		  	.then(()=>{
			console.log('提交随机数区块产生后区块高度: ', web3.eth.blockNumber);
			console.log('参与者参与活动后账户余额',web3.eth.getBalance(accounts[1]).toNumber());
			return randao.getRandom.call(campaignID,{from: accounts[0]});
			}).then((random)=>{
			console.log('随机数random:',random.toNumber());
			}).then(()=>{	
			console.log('参与者获得赏金前账户余额',web3.eth.getBalance(accounts[1]).toNumber());
			console.log('getMyBounty,当前区块高度',web3.eth.blockNumber);
      		return randao.getMyBounty(campaignID, { from: accounts[1] });
			//console.log('balance',web3.eth.getBalance(accounts[1]));
			})
			.then((tx5)=>{
			console.log('参与者获得赏金信息',tx5);
			console.log('参与者获得赏金后余额',web3.eth.getBalance(accounts[1]).toNumber());
			}).then(()=>{
			console.log('发起者返回赏金前余额',web3.eth.getBalance(accounts[0]).toNumber());
			return randao.refundBounty(campaignID,{from: accounts[0]});
			}).then((tx6)=>{
			console.log(tx6);
			console.log('发起者返回赏金后余额',web3.eth.getBalance(accounts[0]).toNumber());
			})
		
			
	})
})
