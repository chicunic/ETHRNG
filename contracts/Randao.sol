pragma solidity ^0.4.8;

contract Randao {
  struct Participant {
      uint256   secret;		//随机数
      uint256   reward;		//奖励
	  uint256	number;		//编号
	  bool 		rewarded;	//是否奖励
  }
  
  struct Consumer {			//活动发起者 
    address caddr;			//地址
    uint256 bountypot;		//奖金池
  }

  struct Campaign {			//活动
      uint32    bnum;		//截至时间
      uint96    deposit;	//押金
	  
	  uint64	target;		//目标参与人数
	  uint64	number;		//实际参与者人数
      uint256   random;		//随机数
      uint256   bountypot;	//奖金
	  bool      settled;	//产生随机数是否成功
      mapping (address => Consumer) consumers;		//发起者
      mapping (address => Participant) participants;//参与者
  }
  uint256 public numCampaigns;		//活动数
  Campaign[] public campaigns;		//活动数组
  //address public founder;
  
  function newCampaign(				//创建活动
      uint32 _bnum,
      uint96 _deposit,
	  uint64 _target
  ) payable returns (uint256 _campaignID) {
      _campaignID = campaigns.length++;
      Campaign c = campaigns[_campaignID];
      numCampaigns++;
	  c.target=_target;
      c.bnum = _bnum;
      c.deposit = _deposit;
      c.bountypot = msg.value;
      c.consumers[msg.sender] = Consumer(msg.sender, msg.value);
  }
  
  modifier checkDeposit(uint256 _deposit) { if (msg.value != _deposit) throw; _; } //检查押金
  modifier checkTime(uint256 _bnum){if (block.number >_bnum) throw; _;}			   //检查提交时间
  modifier beFalse(bool _t) { if (_t) throw; _; }									//判断是否为假

  //参与者提交随机数
  function commit(uint256 _campaignID, uint256 _s)  external payable {
      Campaign c = campaigns[_campaignID];
      commitmentCampaign(_campaignID, _s, c);
	  /*if(msg.value==c.deposit&&block.number < c.bnum)
	  {
	  	c.participants[msg.sender] = Participant(_s,0);
	 	c.random =_s*_s;
	  }*/
  } 
  
  //随机数提交到活动
  function commitmentCampaign(
      uint256 _campaignID,
      uint256 _s,
      Campaign storage c
	  //Campaign c
  ) checkDeposit(c.deposit)
    checkTime(c.bnum)
   	internal {
	  uint64 num=c.number;
	  c.number++;
      c.participants[msg.sender] = Participant(_s,0,num,false);
	  c.random +=_s;
  }
  
  
  
   /*function getRandom(uint256 _campaignID) external returns (uint256) {
      Campaign c = campaigns[_campaignID];
      return c.random;
  }*/
  //是否为发起者
   modifier beConsumer(address _caddr) {
      if (_caddr != msg.sender) throw;
      _;
  } 
  //提交随机数是否结束
  modifier bountyPhase(uint256 _bnum){ if (block.number <= _bnum) throw; _; }
  //检查是否达到目标参与者人数
  modifier checkTarget(uint64 _target,uint64 _num) {if(_num < _target) throw; _;}
  //获取随机数  
  function getRandom(uint256 _campaignID) external returns (uint256) {
      Campaign c = campaigns[_campaignID];
      return returnRandom(c);
  }

  function returnRandom(Campaign storage c)
  bountyPhase(c.bnum)
  beConsumer(c.consumers[msg.sender].caddr)
  internal returns (uint256) {
          c.settled = true;
          return c.random;
  }
   
  //获取奖金
  function getMyBounty(uint256 _campaignID) external {
      Campaign c = campaigns[_campaignID];
      Participant p = c.participants[msg.sender];
      transferBounty(c, p);
  }
  function transferBounty(
      Campaign storage c,
      Participant storage p
    ) bountyPhase(c.bnum)
      beFalse(p.rewarded) internal {
	  uint256 share;
      if (c.settled) {
              share = c.bountypot/c.number;
              returnReward(share, c, p);
      } else {
	  	  	share = c.bountypot/(10*c.number);
         	returnReward(share, c, p);
      }
  }

  function returnReward(
      uint256 _share,
      Campaign storage c,
      Participant storage p
  ) internal {
      p.reward = _share;
      p.rewarded = true;
      if (!msg.sender.send(_share + c.deposit)) {
          p.reward = 0;
          p.rewarded = false;
      }
  }

  //如果生成随机送失败发起者返回部分赏金
  function refundBounty(uint256 _campaignID) external {
      Campaign c = campaigns[_campaignID];
      returnBounty(_campaignID, c);
  }

  function returnBounty(uint256 _campaignID, Campaign storage c)
    bountyPhase(c.bnum)
    beConsumer(c.consumers[msg.sender].caddr) internal {     
	  if(c.settled)
      	c.consumers[msg.sender].bountypot = 0;
	  else
	  	c.consumers[msg.sender].bountypot = (9*bountypot)/10;
	  uint256 bountypot = c.consumers[msg.sender].bountypot;
      if (!msg.sender.send(bountypot)) {
          c.consumers[msg.sender].bountypot = bountypot;
      }
  }
 }
 
