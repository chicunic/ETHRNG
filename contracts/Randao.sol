pragma solidity ^0.4.8;

contract Randao {
  struct Participant {
      uint256   secret;
      uint256   reward;
  }
  
  struct Consumer {
    address caddr;
    uint256 bountypot;
  }

  struct Campaign {
      uint32    bnum;
      uint96    deposit;
	  
      uint256   random;
      uint256   bountypot;

      mapping (address => Consumer) consumers;
      mapping (address => Participant) participants;
  }
  uint256 public numCampaigns;
  Campaign[] public campaigns;
  //address public founder;
  
  function newCampaign(
      uint32 _bnum,
      uint96 _deposit
  ) payable returns (uint256 _campaignID) {
      _campaignID = campaigns.length++;
      Campaign c = campaigns[_campaignID];
      numCampaigns++;
      c.bnum = _bnum;
      c.deposit = _deposit;
      c.bountypot = msg.value;
      c.consumers[msg.sender] = Consumer(msg.sender, msg.value);
  }
  
  modifier checkDeposit(uint256 _deposit) { if (msg.value != _deposit) throw; _; }
  modifier checkTime(uint256 _bnum){if (block.number >_bnum) throw; _;}
  
  function commit(uint256 _campaignID, uint256 _s)  external payable {
      Campaign c = campaigns[_campaignID];
      //commitmentCampaign(_campaignID, _s, c);
	  if(msg.value==c.deposit&&block.number < c.bnum)
	  {
	  	c.participants[msg.sender] = Participant(_s,0);
	 	c.random =_s*_s;
	  }
  } 
  /*function commitmentCampaign(
      uint256 _campaignID,
      uint256 _s,
      Campaign storage c
	  //Campaign c
  ) checkDeposit(c.deposit)
    checkTime(c.bnum)
   	internal {
      c.participants[msg.sender] = Participant(_s,0);
	  c.random ^=_s;
  }*/
  
  
  
   function getRandom(uint256 _campaignID) external returns (uint256) {
      Campaign c = campaigns[_campaignID];
      return c.random;
  }
 }
 
