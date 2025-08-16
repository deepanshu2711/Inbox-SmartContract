pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    //whenever we create a function that expect some ether we need to mark this function as payable
    function enter() public payable {
        //require is used for validation
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    // we are not going to modilfy any state or any data in this contract
    function random() private view returns (uint) {
        return
            uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }

    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }

    function pickWinner() public onlyManagerCanCall {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        //initial size of zero
        players = new address[](0);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
