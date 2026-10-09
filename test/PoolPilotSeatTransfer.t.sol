// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {PoolPilotBookFactory} from "../contracts/PoolPilotBookFactory.sol";
import {PoolPilotBook} from "../contracts/PoolPilotBook.sol";

contract PoolPilotSeatTransferTest is Test {
    PoolPilotBook internal book;
    address payable internal treasury = payable(makeAddr("transfer-test-treasury"));
    address internal creator = makeAddr("transfer-test-creator");
    address internal buyer = makeAddr("transfer-test-buyer");
    address internal recipient = makeAddr("transfer-test-recipient");

    function setUp() public {
        PoolPilotBookFactory factory = new PoolPilotBookFactory(treasury);
        vm.prank(creator);
        book = PoolPilotBook(factory.createBook("Transfer Test", "XFER", 1 ether, 3, address(0)));
        vm.deal(buyer, 2 ether);
        vm.deal(recipient, 2 ether);
    }

    function testBuyerCannotRepurchaseAfterTransferringSeat() public {
        vm.prank(buyer);
        uint256 seatId = book.buySeat{value: 1 ether}();

        vm.prank(buyer);
        book.seatNft().transferFrom(buyer, recipient, seatId);

        vm.expectRevert(PoolPilotBook.AlreadyHasSeat.selector);
        vm.prank(buyer);
        book.buySeat{value: 1 ether}();
    }

    function testRecipientCannotBuyWhileHoldingTransferredSeat() public {
        vm.prank(buyer);
        uint256 seatId = book.buySeat{value: 1 ether}();

        vm.prank(buyer);
        book.seatNft().transferFrom(buyer, recipient, seatId);

        vm.expectRevert(PoolPilotBook.AlreadyHasSeat.selector);
        vm.prank(recipient);
        book.buySeat{value: 1 ether}();

        assertEq(book.seatNft().ownerOf(seatId), recipient);
        assertEq(book.seatsTaken(), 1);
    }
}
