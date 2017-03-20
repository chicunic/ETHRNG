var Randao=artifacts.require("./Randao.sol")

contract('Randao', function(accounts) {
  it("randao campaign lifecycle", function(){
    var randao ;
    var bnum = web3.eth.blockNumber + 3;
    var deposit = web3.toWei('1', 'ether');
    var campaignID;
    var secret;
	
	//console.log('gasprice:',web3.eth.gasPrice.toNumber())
    console.log('target blockNumber: ', bnum);
    console.log('newCampaign at blockNumber: ', web3.eth.blockNumber);
 	return Randao.deployed().then(function(instance){
			randao=instance;
			return randao.newCampaign(bnum, deposit,1,{from: accounts[0], value:web3.toWei(1, "ether")})
			}).then((tx1)=>{
			console.log('发起一次产生随机送活动交易状态',tx1);
			return randao.numCampaigns.call();
			}).then(function(campaignid){
			campaignID = campaignid.toNumber();
			console.log('campaignId',campaignID);
		 	console.log('Now blockNumber0: ', web3.eth.blockNumber);
			return randao.newCampaign(bnum, deposit,1,{from: accounts[0], value:web3.toWei(1, "ether")})
	  		//return randao.commit(campaignID,secret,{from :accounts[2],value: web3.toWei(1,"ether")});
			console.log('true');
			}).then((tx2)=>{
			//console.log(tx2);
			secret=123456;
		 	//console.log('Now blockNumber1: ', web3.eth.blockNumber);
			console.log('参与者参与活动前账户余额',web3.eth.getBalance(accounts[1]).toNumber());
			return randao.commit(campaignID,secret,{from :accounts[1],value: web3.toWei(1,"ether")});	
			})
			.then((tx3)=>{
			console.log('参与者提交一个随机数',tx3);
			console.log('balance',web3.eth.getBalance(accounts[1]).toNumber());
			console.log('Now blockNumber2: ', web3.eth.blockNumber);
			//return randao.getRandom.call(campaignID,{from: accounts[1]});
			return randao.newCampaign(bnum, deposit,1,{from: accounts[0], value:web3.toWei(1, "ether")})
			}).then((tx4)=>{
			console.log('Now blockNumber3: ', web3.eth.blockNumber);
			console.log('balance1',web3.eth.getBalance(accounts[1]).toNumber());
			return randao.getRandom.call(campaignID,{from: accounts[0]});
			})
			.then((random)=>{
			console.log('random:',random.toNumber());
			}).then(()=>{
			console.log('getMyBounty');
			console.log('balance2',web3.eth.getBalance(accounts[1]).toNumber());
      		return randao.getMyBounty(campaignID, { from: accounts[1] });
			//console.log('balance',web3.eth.getBalance(accounts[1]));
			})
			.then((tx5)=>{
			console.log(tx5);
			console.log('balance3',web3.eth.getBalance(accounts[1]).toNumber());
			}).then(()=>{
			console.log('Consumer balance',web3.eth.getBalance(accounts[0]).toNumber());
			return randao.refundBounty(campaignID,{from: accounts[0]});
			}).then((tx6)=>{
			console.log(tx6);
			console.log('Consumer balance',web3.eth.getBalance(accounts[0]).toNumber());
			})
		
			
	})
})

