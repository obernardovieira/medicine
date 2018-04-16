pragma solidity ^0.4.16;

import "./basic.sol";

contract MyMore is BasicCon {

    address name;

    function setUser(address _name, uint _count) public {
        name = _name;
        set(_count);
    }

}