// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SolarToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SunRaise is Ownable{


    event Deposit();
    event Launch();
    event Contribute();

    SolarToken public token;

    uint public balance;
    
    address private deployer;
    uint public count;

    struct Campaign {
        address creator;
        uint goal;
        uint total;
        uint32 startAt;
        uint32 endAt;
        bool claimed;
        
    }

    mapping (uint => Campaign) campaigns;
    mapping (address => uint) contributors;



    constructor() {
        deployer=msg.sender;
        token = new SolarToken(100000000);
    }

    receive() external payable{

    }

    modifier isAddress(address _address) {
        require(_address!=address(0));
        _;
    }

    function launch(uint _goal,uint32 _startAt,uint32 _endAt)external onlyOwner{
        require(_goal>=1 ether,"");
        require(_startAt>block.timestamp,"start at < now");
        require(_endAt<=_startAt+ 100 days,"end at > max duration (100 days)");
        require(_endAt>_startAt,"end at < start at");

        count++;
        campaigns[count]=Campaign({
            creator:msg.sender,
            goal:_goal,
            total:0,
            startAt:_startAt,
            endAt:_endAt,
            claimed:false
        });
    }

    function getBalance()internal view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function contribute(uint _id)external payable {

            address sender= msg.sender;
            uint _amount = msg.value;
            uint _balance = getBalance();
            uint currentDate = block.timestamp;
            Campaign storage campaign = campaigns[_id];

            require(campaign.startAt>=currentDate,"not started");
            require(campaign.endAt<=currentDate,"ended");
            require(_amount>1 ether, "");
            contributors[sender]= _amount;

            (bool success,) = sender.call{value : _amount}("");
            require(success,"Tx failed");
            token.transfer(sender,_amount * 100);
            campaign.total+=_amount;
            assert(_balance+_amount==getBalance());
    }

    function getContributorBalance() external view  returns(uint){
        return contributors[msg.sender];
    }

    function refund() external{
        address _sender = msg.sender;
        uint _amount = contributors[_sender];
        require(_amount>0,"");   
        (bool success,) = _sender.call{value : _amount}("");
        require(success,"Tx failed");
        token.transfer(deployer,_amount * 100);
    
    }


    function finalize(address _to) external onlyOwner isAddress(_to){
        (bool success,) = _to.call{value : address(this).balance}("");
        require(success,"Tx failed");
    }

    function setOwner(address _newOwner)external isAddress(_newOwner){
        deployer = _newOwner;
    
    }

    function getContributorToken() external view returns(uint){
        address _sender = msg.sender; 
        return token.balanceOf(_sender);
    }

    function getTotalToken() external view onlyOwner returns(uint){
        return token.totalSupply();
    }

  
}