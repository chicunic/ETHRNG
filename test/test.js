var Randao = artifacts.require("./Randao.sol")

contract('Randao', function (accounts) {
    it("randao campaign lifecycle", function () {
        var randao; // 合约
        var bnum = web3.eth.blockNumber + 20; // 目标区块号
        var deposit = web3.toWei('1', 'ether'); // 押金
        var campaignID; // 活动 ID
        var secret; // 密文

        console.log('**** target blockNumber = ', bnum);
        console.log('**** newCampaign at blockNumber = ', web3.eth.blockNumber);
        return Randao.deployed().then(function (instance) {
            randao = instance;
            return randao.newCampaign(bnum, deposit, { from: accounts[0], value: web3.toWei(1, "ether") })
        }).then((tx1) => {
            console.log('**** tx1 = ', tx1);
            return randao.numCampaigns.call();
        }).then(function (campaignid) {
            campaignID = campaignid.toNumber();
            console.log('**** campaignId = ', campaignID);
            //secret=123456;
            console.log('**** Now blockNumber = ', web3.eth.blockNumber);
            //console.log(web3.getBalance(accounts[1]));
            return randao.newCampaign(bnum, deposit, { from: accounts[0], value: web3.toWei(1, "ether") });
            //return randao.commit(campaignID,secret,{from :accounts[1],value: web3.toWei(10,"ether")});
            console.log('**** newCampaign true');
        }).then((tx2) => {
            console.log('**** tx2 = ', tx2);
            secret = 123456;
            return randao.commit(campaignID, secret, { from: accounts[1], value: web3.toWei(1, "ether") });
            console.log('**** commit true');
        })
            .then((tx3) => {
                console.log('**** tx3 = ', tx3);
                return randao.getRandom.call(campaignID, { from: accounts[1] });
            }).then((random) => {
                console.log('**** random = ', random.toNumber());
            })
    })
})