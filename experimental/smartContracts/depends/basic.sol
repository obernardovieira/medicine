pragma solidity ^0.4.16;

contract BasicCon {

    uint256 counter;

    function set(uint _count) public {
        counter = _count;
    }

    function getCounter() public constant returns (uint256) {
        return counter;
    } 
}