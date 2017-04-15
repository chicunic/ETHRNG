import "../stylesheets/app.css";
import "../javascripts/mouseTracker.js";
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'
import randao_artifacts from '../../build/contracts/Randao.json'

var Randao = contract(randao_artifacts);
var accounts;

window.App = {
    start: function () {
        var self = this;
        Randao.setProvider(web3.currentProvider);

        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;
            //self.runRandao();
        });
    },

    setStatus: function (message) {
        var status = document.getElementById("status");
        status.innerHTML = message;
    },

    runRandao: function () {
        var randao;

        // 从 web 接收的参数值
        // bnum 目标区块数
        var bnum = web3.eth.blockNumber + $.get_bnum();
        console.log('目标区块数 bnum: ', bnum);
        // deposit 押金
        var deposit = web3.toWei($.get_deposit(), 'ether');
        console.log('押金 deposit: ', deposit);
        // lowest" 目标最低参与人数
        var lowest = $.get_lowest();
        console.log('目标最低参与人数 lowest: ', deposit);
        // participant 实际参与人数
        var participant = $.get_participant();
        console.log('实际参与人数 participant: ', participant);
        // finney 赏金
        var finney = deposit;
        //var finney = web3.toWei($.get_finney(), 'ether');
        console.log('deposit: ', finney);
        // campaignID 活动号
        var campaignID;
        //var secret = new Array(1, 10, 100, 1000);
        // secret_list 用户提交的随机数列表
        var secret_list = $.get_secret_list();
        console.log('secret_list: ', secret_list);

        console.log('当前区块号: ', web3.eth.blockNumber);
        Randao.deployed().then(function (instance) {
            randao = instance;
            return randao.newCampaign(bnum, deposit, lowest, { from: accounts[0], value: finney, gas: 1e+17 }) // 生成一个区块
        }).then(function (tx) {
            console.log("合约号: ", tx);
            return randao.numCampaigns.call();
        }).then(function (campaignid) {
            campaignID = campaignid.toNumber() - 1;
            console.log('campaignID: ', campaignID);
            for (var i = 1; i <= participant; i++) {
                var seedsecret = secret_list[i - 1];
                console('参与者', i, '提交的随机数: ', seedsecret);
                randao.commit(campaignID, seedsecret, { from: accounts[i], value: deposit, gas: 1e+17 });
            }
            console.log('当前区块号: ', web3.eth.blockNumber);
        }).then(function () {
            var current_blockNumber = web3.eth.blockNumber;
            while (web3.eth.blockNumber <= bnum) {
                randao.test({ from: accounts[0], gas: 1e+17 });
                console.log('当前区块号: ', web3.eth.blockNumber);
            }
        }).then(function () {
            console.log('增加区块后区块高度: ', web3.eth.blockNumber);
            return randao.getRandom.call(campaignID, { from: accounts[0] });
        }).then(function (random) {
            console.log('生成的随机数为:', random);
        });
    }
};

window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    App.start();
});