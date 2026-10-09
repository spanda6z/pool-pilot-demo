// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PoolPilotToken is ERC20 {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 ether;
    error ZeroAddress();
    constructor(string memory name_, string memory symbol_, address recipient) ERC20(name_, symbol_) {
        if (recipient == address(0)) revert ZeroAddress();
        _mint(recipient, MAX_SUPPLY);
    }
}
