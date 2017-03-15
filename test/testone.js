var Randao=artifacts.require("./Randao.sol");
contract('Randao', function(accounts) {
 it("randao campaign lifecycle", function() {
    var randao = Randao.deployed();
    var bnum = web3.eth.blockNumber + 20;
    var deposit = web3.toWei('10', 'ether');
    var campaignID;
    var commitment;
    var secret;

    console.log('target blockNumber: ', bnum);
    console.log('newCampaign at blockNumber: ', web3.eth.blockNumber);})})

