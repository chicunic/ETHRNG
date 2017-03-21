pragma solidity ^0.4.8;

contract Selection{
	uint256 blockHash; // 发起者区块的 Hash
	uint256 numParticipant; // 参与人数
	uint256 numSelected; // 被选中的人数
	uint256 numCombination; // 组合数 C(n,m)
	uint256 selectedResult; // 当前组合对应的数值

	// 计算组合数
	function countCelected(uint256 numParticipant, uint256 numSelected)
		returns(uint256) {
		numCombination = countFactorial(numParticipant) / (countFactorial(numSelected)*countFactorial(numParticipant - numSelected));
		return numCombination;
	}

	// 计算阶乘
	function countFactorial(uint256 natural)
		returns(uint256) {
		if (natural == 0 && natural == 1)
			return 1;
		uint256 factorial = 1;
		for (uint256 i = 1; i <= natural; i++) {
			factorial *= i;
		}
		return factorial;
	}

	// 计算选中的参与者排列
	function selectedCombination(uint256 numParticipant, uint256 numSelected, uint256 blockHash, uint256 numCombination)
	returns(uint256) {
		uint256 newHash = blockHash % numCombination;
		// begins
		uint256 countNo = 0; // 当前组合序号
		bool[] memory selected = new bool[](numParticipant); // 初始化为0
		// 将前m个数置1，作为初始条件
		uint256 i = 0;
		for (i = 0; i < numSelected; i++) {
			selected[i] = true;
		}
		bool bFind = false;
		do {
			for (i = 0; i < numParticipant; i++) {
				selectedResult *= 2;
				if (selected[i] == true) 
					selectedResult += 1;
			}
			if (newHash == countNo) {
				return selectedResult;
				break;
			}
			selectedResult = 0; // 进行下一次组合前结果清0
			bFind = false;
			for (i = 0; i < numParticipant - 1; i++) {
				if (selected[i] == true && selected[i + 1] == false) {
					// 交换10为01
					selected[i] = false;
					selected[i + 1] = true;
					bFind = true;
					// 如果第一位为0，则将第i位置之前的1移到最左边，如为1则第i位置之前的1就在最左边，无需移动
					if (selected[0] == false) {
						uint256 j =0;
						for (uint256 k = 0; k < i; k++) {
							if (selected[k]) {
							    selected[k] = selected[j];
								selected[j] = true;
								j++;
							}
						}
					}
					break;
				}
			}
			countNo++;
		} while (bFind);
		//ends
	}

	// 判断是否被选中
	function whetherSelected(uint256 numSelected)
	returns(bool) {
		//return selected[numSelected];
		uint256 b = selectedResult >>(numSelected - 1)& 1;
		if(b == 1)
			return true;
		else
			return false;
	}
}