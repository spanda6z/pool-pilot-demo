// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PoolPilotSeatVault is ReentrancyGuard {
    address public immutable book;
    address payable public immutable creator;
    address payable public immutable treasury;
    uint16 public immutable protocolFeeBps;
    uint256 public totalDeposited;
    bool public settled;

    error Unauthorized();
    error ZeroAddress();
    error InvalidFee();
    error AlreadySettled();
    error ZeroValue();
    error TransferFailed();

    constructor(address payable creator_, address payable treasury_, uint16 protocolFeeBps_) {
        if (creator_ == address(0) || treasury_ == address(0)) revert ZeroAddress();
        if (protocolFeeBps_ > 1_000) revert InvalidFee();
        book = msg.sender;
        creator = creator_;
        treasury = treasury_;
        protocolFeeBps = protocolFeeBps_;
    }
    modifier onlyBook() { if (msg.sender != book) revert Unauthorized(); _; }
    receive() external payable {
        if (msg.sender != book) revert Unauthorized();
        totalDeposited += msg.value;
    }
    function deposit() external payable onlyBook {
        if (msg.value == 0) revert ZeroValue();
        totalDeposited += msg.value;
    }
    function settle() external onlyBook nonReentrant {
        if (settled) revert AlreadySettled();
        settled = true;
        uint256 balance = address(this).balance;
        uint256 fee = (balance * protocolFeeBps) / 10_000;
        uint256 creatorAmount = balance - fee;
        (bool okTreasury,) = treasury.call{value: fee}("");
        if (!okTreasury) revert TransferFailed();
        (bool okCreator,) = creator.call{value: creatorAmount}("");
        if (!okCreator) revert TransferFailed();
    }
}
