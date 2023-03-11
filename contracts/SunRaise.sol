// SPDX-License-Identifier: MIT

contract SunRaise {


    event Deposit();
    event Launch();
    event Contribute();

    uint public balance;
    uint public owner;
    uint public count;

    struct Campaign {
        address creator;
        uint goal;
        uint Total;
        uint32 startAt;
        uint32 endAt;
        bool clained;
        
    }

    mapping (uint => Campaign) campaigns;
    mapping (address => uint) contributors;



    constructor() {
        owner=msg.sender;
    }

    receive() external payable{

    }

    modifier isAddress(address _address) {
        require(_address!=address(0));
        _;
    }

    function launch(uint _goal,uint32 _startAt,uint32 _endAt)external{
        require(goal>=1 ether,"");
        require(_startAt>block.timestamp,"start at < now");
        require(_endAt<=_startAt+ 100 days,"end at > max duration (100 days)");
        require(_endAt>_startAt,"end at < start at");

        count++;
        campaigns[count]=Campaign=({
            creator:_msg;sender,
            goal:_goal,
            Total:0
            startAt:_startAt,
            endAt:_endAt,
            claimed:false
        })
        // Cette fonction permet au propriétaire du contrat de crowdfunding de clôturer le projet et de distribuer
        // les jetons ou les participations en fonction des contributions des contributeurs.
    }

    function getBalance()internal view returns (uint) {
        return address(this).balance;
    }

    function contribute(
        uint _id,
        uint _amount)external {

            address sender= msg.sender;
            uint balance = getBalance();
            Campaign storage campaign = campaign[_id];
            require(campaigns[_id].startAt>=block.timestamp,"not started");
            require(campaigns[_id].endAt<=block.timestamp,"ended");
            require(_amount>1 ether, "");
            contributors[sender]= _amount;

            (bool success,) = msg.sender.call{value : _amount}("");
            require(success,"Tx failed");
            campaign.total+=_amount;
            assert(balance+_amount==getBalance());
    }

    function getContributorBalance() external view returns(uint){
        return contributors[msg.sender];
    }

    function refund() external{
        address _sender = msg.sender;
        uint _amount = contributors[_sender]._amount;
        require(_amount>0,"");   
        (bool success,) = _sender.call{value : _amount}("");
        require(success,"Tx failed");
    
    }

    function finalize() external{}

    function withdraw(address _to) external isAddress(_to){
        (bool success,) = _to.call{value : address(this).balance}("");
        require(success,"Tx failed");
    }

    function setOwner(address _newOwner)external isAddress(_newOwner){
        owner = _newOwner;
    
    }

    /**
     * setDeadline: Cette fonction permet de définir une date limite pour la collecte de fonds.

setGoal: Cette fonction permet de définir l'objectif de financement pour le projet.

getGoal: Cette fonction permet de vérifier l'objectif de financement défini pour le projet.
     */
}