pragma solidity ^0.4.18;

contract CarToSell {

    uint year;

    function CarToSell(uint carYear) public {
        year = carYear;
    }

    function getCarToSellInfo() public constant returns(uint carYear) {
        return(year);
    }
}
