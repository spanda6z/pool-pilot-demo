// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PoolPilotSeatNFT is ERC721 {
    address public immutable book;
    uint256 public totalMinted;
    error Unauthorized();
    error ZeroAddress();
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) { book = msg.sender; }
    modifier onlyBook() { if (msg.sender != book) revert Unauthorized(); _; }
    function mint(address to) external onlyBook returns (uint256 tokenId) {
        if (to == address(0)) revert ZeroAddress();
        tokenId = ++totalMinted;
        _mint(to, tokenId);
    }
}
