pragma solidity ^0.4.20;

contract Library {
    struct LibraryBooks {
        address[] book;
    }

    mapping(address => LibraryBooks) private books;

    function constructor(address bookAdress) public payable {
        books[msg.sender].book.push(bookAdress);
    }

    function getMyBook(uint index) public constant returns(address bookAdress) {
        return(books[msg.sender].book[index]);
    }

    function getUserBooks(address user, uint index) public constant returns(address bookAdress) {
        return(books[user].book[index]);
    }
}

contract Book {

    bytes32 title;
    uint pages;

    function constructor(bytes32 bookTitle, uint bookPages) public payable {
        title = bookTitle;
        pages = bookPages;
    }

    function getBookInfo() public constant returns(bytes32 bookTitle, uint bookPages) {
        return(title, pages);
    }
}
