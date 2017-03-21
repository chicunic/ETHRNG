pragma solidity ^0.4.8;

contract Selection{

    uint256 blockHash; // 发起者区块的 Hash
    uint256 numParticipant; // 参与人数
    uint256 numSelected; // 被选中的人数
    uint256 public numCombination; // 组合数 C(n,m)
    uint256 selectedResult; // 选中的参与者排列
    bool[]  selected; // 某个用户是否被选中
    uint256[] result;

    // 计算组合数
    function countCelected(uint256 numParticipant, uint256 numSelected)
      //  returns (uint256 numCombination) 
    {
            numCombination = countFactorial(numParticipant) / (countFactorial(numSelected)*countFactorial(numParticipant - numSelected));
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
       // returns (bool[] selected)
     {
        uint256 newHash = blockHash % numCombination;
        //uint256[] result;
        get_combinations(numCombination, numSelected, result, numSelected, newHash);
       // return selected;
    }
    uint256 selectedNo = 0;
    //计算排列
    function get_combinations(uint256 n, uint256 m, uint256[] result, uint256 len, uint256 hashNo)
    {
    if (m == 0 || n < m)
    {
        if (m == 0)
        {
            
            if (selectedNo == hashNo) {
                for (uint256 i = 0; i < len; i++) {
                    selected[result[len - 1 - i] - 1] = true;
                }
            }
            selectedNo++;
        }
        
    }
    result[m - 1] = n;
    get_combinations(n - 1, m - 1, result, len,hashNo);
    get_combinations(n - 1, m, result, len,hashNo);
}

    // 判断是否被选中
    function whetherSelected(uint256 numSelected)
        returns (bool isSelected) {
            return selected[numSelected];
            /*uint b = selectedResult >>（numSelected - 1）& 1;
            if(b == 1)
                return true;
            else
                return false;*/
        }
}