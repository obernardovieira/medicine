pragma solidity ^0.4.18;


contract Colleger {
    struct Student {
        uint department;
    }

    mapping(address => Student) private students;

    function College(address user, uint department) public {
        students[user].department = department;
    }

    function chooseDept(uint id) public {
        students[msg.sender].department = id;
    }

    function getDept(address user) public constant returns(uint department) {
        return(students[user].department);
    }
}