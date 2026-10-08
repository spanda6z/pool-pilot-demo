// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {PoolPilotBook} from "./PoolPilotBook.sol";

contract PoolPilotBookFactory is Ownable2Step {
    uint16 public constant PROTOCOL_FEE_BPS = 250;
    uint256 public bookCount;
    address payable public treasury;
    struct BookInfo {
        address book;
        address creator;
        address token;
        address seatVault;
        address seatNft;
        uint16 seatsTotal;
        uint16 seatsTaken;
    }
    mapping(uint256 => address) public books;
    mapping(address => uint256) public bookIdOf;

    event BookCreated(
        uint256 indexed bookId, address indexed book, address indexed creator,
        address token, address seatVault, address seatNft, uint16 seatsTotal,
        uint256 minimumBid, address referrer
    );
    event TreasuryUpdated(address indexed previousTreasury, address indexed newTreasury);
    error ZeroAddress();

    constructor(address payable treasury_) Ownable(msg.sender) {
        if (treasury_ == address(0)) revert ZeroAddress();
        treasury = treasury_;
    }

    function setTreasury(address payable newTreasury) external onlyOwner {
        if (newTreasury == address(0)) revert ZeroAddress();
        address previous = treasury;
        treasury = newTreasury;
        emit TreasuryUpdated(previous, newTreasury);
    }

    function createBook(
        string calldata name_,
        string calldata symbol_,
        uint256 minimumBid_,
        uint16 seatCount_,
        address referrer_
    ) external returns (address bookAddress) {
        PoolPilotBook book = new PoolPilotBook(
            name_, symbol_, minimumBid_, seatCount_, payable(msg.sender),
            referrer_, treasury, PROTOCOL_FEE_BPS
        );
        bookAddress = address(book);
        uint256 id = ++bookCount;
        books[id] = bookAddress;
        bookIdOf[bookAddress] = id;
        emit BookCreated(
            id, bookAddress, msg.sender, address(book.token()), address(book.seatVault()),
            address(book.seatNft()), seatCount_, minimumBid_, referrer_
        );
    }

    function getBook(uint256 bookId) external view returns (BookInfo memory info) {
        address bookAddress = books[bookId];
        if (bookAddress == address(0)) return info;
        PoolPilotBook book = PoolPilotBook(bookAddress);
        info = BookInfo({
            book: bookAddress,
            creator: book.creator(),
            token: address(book.token()),
            seatVault: address(book.seatVault()),
            seatNft: address(book.seatNft()),
            seatsTotal: book.seatCount(),
            seatsTaken: book.seatsTaken()
        });
    }
}
