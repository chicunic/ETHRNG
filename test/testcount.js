var selection = artifacts.require("./Selection.sol")
contract('select', function (accounts) {
	it("select campaign lifecycle", function () {
		var select;
		var result=new Array();
		return selection.deployed().then(function(instance){
			select=instance;
			//return select.countCelected
			return select.countCelected(3,1,{from: accounts[0]});
		}).then(()=>{
			return select.numCombination.call();		
			//return select.countCelected(3,1,{from: accounts[0]});
		}).then(function(num){
			console.log('组合数',num.toNumber());
			//return select.countFactorial(3,{from :accounts[0]})
			return select.selectedCombination(4,2,12,6,{from :accounts[0]})
		}).then((tx)=>{
			console.log(tx);
			return select.selectedResult.call();			
			//return select.whetherSelected(0,{from: accounts[0]})
		}).then(function(result){
			console.log('当前组合对应的数值',result.toNumber());
			return select.whetherSelected(3,{from: accounts[0]})
			//console.log('选中',yes)
		}).then(()=>{
			return select.flag.call();
		}).then((flag)=>{

			console.log('flag',flag.toNumber());
		})
		
	})
})

