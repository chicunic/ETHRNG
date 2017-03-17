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
    uint256 numcombination; // 组合数 C(n,m)

    // 计算组合数
    function selected(uint256 numParticipant, uint256 numSelected)
       returns (uint256 numcombination) {
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
}