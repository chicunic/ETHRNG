pragma solidity ^0.4.8;

contract Selection{
    struct Participant {
        uint256 secret; // 随机数
        uint256 reward; // 奖金
        uint256 serialNumber; // 编号
        address addrParticipant; // 地址

    }

    uint256 blockHash; // 发起者区块的 Hash
    uint256 numParticipant; // 参与人数
    uint256 numSelected; // 被选中的人数
    uint256 numCombination; // 组合数 C(n,m)
    uint256 selectedResult; // 选中的参与者排列
    bool[] public selected; // 某个用户是否被选中

    // 计算组合数
    function countCelected(uint256 numParticipant, uint256 numSelected)
       returns (uint256 numCombination) {
           return countFactorial(numParticipant)
            / (countFactorial(numSelected)*countFactorial(numParticipant - numSelected));
    }

    // 计算阶乘
    function countFactorial(uint256 natural)
        returns (uint256 factorial) {
            if (natural == 0 && natural == 1) 
                return 1;
        factorial = 1;
        for(uint256 i = 1; i <= natural; i++) {
            factorial *= i;
        }
        return factorial;
    }

    // 计算选中的参与者排列
    function selectedCombination(uint256 blockHash, uint256 numCombination)
        returns (uint256 selectedResult) {
            uint256 newHash = blockHash % numCombination;
            // 排列算法
        }

    // 判断是否被选中
    function whetherSelected(uint256 numSelected)
        returns (bool selected) {
            return selected[numSelected];
            /*uint b = selectedResult >>（numSelected - 1）& 1;
            if(b == 1)
                return true;
            else
                return false;*/
        }
}