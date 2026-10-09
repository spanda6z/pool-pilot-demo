// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {PoolPilotToken} from "./PoolPilotToken.sol";
import {PoolPilotSeatNFT} from "./PoolPilotSeatNFT.sol";
import {PoolPilotSeatVault} from "./PoolPilotSeatVault.sol";

contract PoolPilotBook is ReentrancyGuard {
    uint16 public constant MAX_SEATS = 18;
    uint256 public constant MAX_MINIMUM_BID = 1_000 ether;
    address public immutable factory;
    address payable public immutable creator;
    address public immutable referrer;
    PoolPilotToken public immutable token;
    PoolPilotSeatNFT public immutable seatNft;
    PoolPilotSeatVault public immutable seatVault;
    uint16 public immutable seatCount;
    uint256 public immutable minimumBid;
    uint16 public seatsTaken;
    bool public finalized;
    mapping(address => bool) public hasPurchasedSeat;

    error Unauthorized();
    error InvalidConfiguration();
    error SoldOut();
    error BidTooLow();
    error AlreadyHasSeat();
    error AlreadyFinalized();

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 minimumBid_,
        uint16 seatCount_,
        address payable creator_,
        address referrer_,
        address payable treasury_,
        uint16 protocolFeeBps_
    ) {
        if (creator_ == address(0) || treasury_ == address(0) || seatCount_ == 0 ||
            seatCount_ > MAX_SEATS || minimumBid_ == 0 || minimumBid_ > MAX_MINIMUM_BID ||
            protocolFeeBps_ > 1_000) revert InvalidConfiguration();
        factory = msg.sender;
        creator = creator_;
        referrer = referrer_;
        seatCount = seatCount_;
        minimumBid = minimumBid_;
        token = new PoolPilotToken(name_, symbol_, creator_);
        seatNft = new PoolPilotSeatNFT(
            string.concat(name_, " Founding Seats"),
            string.concat(symbol_, "-SEAT")
        );
        seatVault = new PoolPilotSeatVault(creator_, treasury_, protocolFeeBps_);
    }

    function buySeat() external payable nonReentrant returns (uint256 tokenId) {
        if (finalized) revert AlreadyFinalized();
        if (seatsTaken >= seatCount) revert SoldOut();
        if (msg.value < minimumBid) revert BidTooLow();
        if (hasPurchasedSeat[msg.sender] || seatNft.balanceOf(msg.sender) != 0) {
            revert AlreadyHasSeat();
        }
        hasPurchasedSeat[msg.sender] = true;
        seatVault.deposit{value: msg.value}();
        tokenId = seatNft.mint(msg.sender);
        unchecked { ++seatsTaken; }
    }

    function finalize() external {
        if (msg.sender != creator && msg.sender != factory) revert Unauthorized();
        if (finalized) revert AlreadyFinalized();
        finalized = true;
        seatVault.settle();
    }

    function seatsRemaining() external view returns (uint16) {
        return seatCount - seatsTaken;
    }
}
