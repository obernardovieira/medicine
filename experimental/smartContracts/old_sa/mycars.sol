pragma solidity ^0.4.18;



contract UserCars {

    mapping(address => bytes32) private car;

    function UserCars(bytes32 userCar) public {
        car[msg.sender] = userCar;
    }

    function getUserCarInfo(address user) public constant returns(bytes32 userCar) {
        return(car[user]);
    }
}



contract CarToSell {

    uint year;

    function CarToSell(uint carYear) public {
        year = carYear;
    }

    function getCarToSellInfo() public constant returns(uint carYear) {
        return(year);
    }
}
