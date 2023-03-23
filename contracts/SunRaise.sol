// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SolarToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SunRaise is Ownable{


    event Deposit(address sender,uint value);
    event Launch(address creator,string name,uint goal,uint entAt);
    event Contribute(uint idCampaign,address sender,uint value);
    event Refund(uint idCampaign,address sender,uint value);

    SolarToken public token;

    uint public balance;
    
    address private deployer;
    uint public count;

    struct Campaign {
        
        string name;
        string description;
        uint goal;
        uint total;
        uint startAt;
        uint endAt;
        bool claimed;
        address creator;
        
        
    }

    mapping (uint => Campaign) campaigns;
    mapping (address => mapping (uint => uint)) contributors;


    constructor() {
        deployer=msg.sender;
        token = new SolarToken(100000000);
       
    }

    receive() external payable{
         emit Deposit(msg.sender, msg.value);
    }

    modifier isAddress(address _address) {
        require(_address!=address(0));
        _;
    }

    function launch(string memory _name,uint _goal,string memory _description)external onlyOwner{
        address _creator = msg.sender;
        uint _startAt = block.timestamp;
        uint _endAt = _startAt + 100 days;

        require(_goal>=1 ether,"");

        count++;
        campaigns[count]=Campaign({
            name:_name,
            description:_description,
            goal:_goal,
            total:0,
            startAt:_startAt,
            endAt:_endAt,
            claimed:false,
            creator:_creator
            
        });

        emit Launch(_creator,_name,_goal,_endAt);
    }

    function getCampaigns() external view returns (Campaign [] memory){
        
        Campaign [] memory _campaigns;
        for (uint i = 1; i <= count; i++) {
            
            _campaigns[i] = campaigns[i];
       }

       return _campaigns;
    }

     function getCampaign(uint _id) external view returns (Campaign [] memory){
        
        Campaign [] memory _campaigns;
        for (uint i = 1; i <= count; i++) {
            
            _campaigns[i] = campaigns[_id];
       }

       return _campaigns;
    }

    function getBalance()internal view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function contribute(uint _id)external payable {

            address _sender= msg.sender;
            uint _amount = msg.value;
            uint _balance = getBalance();
            uint currentDate = block.timestamp;
            Campaign storage campaign = campaigns[_id];

            require(campaign.endAt<=currentDate,"ended");
            require(_amount>1 ether, "");
            contributors[_sender][_id]= _amount;

            (bool success,) = _sender.call{value : _amount}("");
            require(success,"Tx failed");
            token.transfer(_sender,_amount * 100);
            campaign.total+=_amount;
            assert(_balance+_amount==getBalance());

            emit Contribute(_id, _sender,_amount);
    }

    function getContributorBalance(uint _id) external view  returns(uint){
        return contributors[msg.sender][_id];
    }

    function refund(uint _id) external{
        address _sender = msg.sender;
        uint _amount = contributors[_sender][_id];
        require(_amount>0,"");   
        (bool success,) = _sender.call{value : _amount}("");
        require(success,"Tx failed");
        token.transfer(deployer,_amount * 100);
        emit Refund(_id,_sender,_amount);
    
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

    function getAccountBalance() external view returns(uint){
        address _sender = msg.sender; 
        return address(_sender).balance;
    }

    function getTotalToken() external view onlyOwner returns(uint){
        return token.totalSupply();
    }

  
}