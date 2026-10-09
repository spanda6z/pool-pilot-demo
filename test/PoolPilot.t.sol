// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {PoolPilotBookFactory} from "../contracts/PoolPilotBookFactory.sol";
import {PoolPilotBook} from "../contracts/PoolPilotBook.sol";
import {PoolPilotToken} from "../contracts/PoolPilotToken.sol";

contract PoolPilotTest is Test {
    PoolPilotBookFactory internal factory;
    PoolPilotBook internal book;
    address payable internal treasury = payable(makeAddr("treasury"));
    address internal creator = makeAddr("creator");
    address internal alice = makeAddr("alice");
    address internal bob = makeAddr("bob");

    function setUp() public {
        factory = new PoolPilotBookFactory(treasury);
        vm.prank(creator);
        address bookAddress = factory.createBook("Moon Collective", "MOON", 1 ether, 3, address(0));
        book = PoolPilotBook(bookAddress);
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
    }

    function testFactoryCreatesCanonicalContracts() public view {
        assertEq(factory.bookCount(), 1);
        PoolPilotBookFactory.BookInfo memory info = factory.getBook(1);
        assertEq(info.book, address(book));
        assertEq(info.creator, creator);
        assertEq(info.token, address(book.token()));
        assertEq(info.seatVault, address(book.seatVault()));
        assertEq(info.seatNft, address(book.seatNft()));
        assertEq(info.seatsTotal, 3);
        assertEq(info.seatsTaken, 0);
    }

    function testBookMintsFixedSupplyToCreator() public view {
        PoolPilotToken token = book.token();
        assertEq(token.totalSupply(), 1_000_000_000 ether);
        assertEq(token.balanceOf(creator), 1_000_000_000 ether);
    }

    function testBuySeatEscrowsFundsAndMintsNFT() public {
        vm.prank(alice);
        uint256 seatId = book.buySeat{value: 1 ether}();
        assertEq(seatId, 1);
        assertEq(book.seatsTaken(), 1);
        assertEq(book.seatsRemaining(), 2);
        assertEq(book.seatNft().ownerOf(seatId), alice);
        assertTrue(book.hasPurchasedSeat(alice));
        assertEq(address(book.seatVault()).balance, 1 ether);
    }

    function testCannotBuyTwoSeats() public {
        vm.prank(alice);
        book.buySeat{value: 1 ether}();
        vm.expectRevert(PoolPilotBook.AlreadyHasSeat.selector);
        vm.prank(alice);
        book.buySeat{value: 1 ether}();
    }

    function testCannotBuyAgainAfterTransferringSeat() public {
        vm.prank(alice);
        uint256 seatId = book.buySeat{value: 1 ether}();
        address seatNftAddress = address(book.seatNft());
        vm.prank(alice);
        (bool transferred, ) = seatNftAddress.call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", alice, bob, seatId)
        );
        assertTrue(transferred);

        vm.expectRevert(PoolPilotBook.AlreadyHasSeat.selector);
        vm.prank(alice);
        book.buySeat{value: 1 ether}();

        assertEq(book.seatNft().ownerOf(seatId), bob);
        assertEq(book.seatsTaken(), 1);
    }

    function testCannotBuyBelowMinimumBid() public {
        vm.expectRevert(PoolPilotBook.BidTooLow.selector);
        vm.prank(alice);
        book.buySeat{value: 0.99 ether}();
    }

    function testSoldOut() public {
        vm.prank(alice);
        book.buySeat{value: 1 ether}();
        vm.prank(bob);
        book.buySeat{value: 1 ether}();
        address carol = makeAddr("carol");
        vm.deal(carol, 1 ether);
        vm.prank(carol);
        book.buySeat{value: 1 ether}();
        address dave = makeAddr("dave");
        vm.deal(dave, 1 ether);
        vm.expectRevert(PoolPilotBook.SoldOut.selector);
        vm.prank(dave);
        book.buySeat{value: 1 ether}();
    }

    function testFinalizeSplitsTreasuryAndCreator() public {
        vm.prank(alice);
        book.buySeat{value: 2 ether}();
        vm.prank(bob);
        book.buySeat{value: 1 ether}();

        uint256 creatorBefore = creator.balance;
        uint256 treasuryBefore = treasury.balance;
        vm.prank(creator);
        book.finalize();

        uint256 expectedFee = 3 ether * 250 / 10_000;
        assertEq(treasury.balance, treasuryBefore + expectedFee);
        assertEq(creator.balance, creatorBefore + 3 ether - expectedFee);
        assertTrue(book.finalized());
        assertTrue(book.seatVault().settled());
    }

    function testOnlyCreatorOrFactoryCanFinalize() public {
        vm.expectRevert(PoolPilotBook.Unauthorized.selector);
        vm.prank(alice);
        book.finalize();
    }

    function testFactoryOwnerCanRotateTreasuryForFutureBooks() public {
        address nextTreasury = makeAddr("nextTreasury");
        factory.setTreasury(payable(nextTreasury));
        assertEq(factory.treasury(), nextTreasury);
        vm.prank(creator);
        address newBook = factory.createBook("New", "NEW", 0.1 ether, 2, address(0));
        assertEq(address(PoolPilotBook(newBook).seatVault().treasury()), nextTreasury);
    }

    function testFuzzBuySeatAtOrAboveMinimum(uint96 extra) public {
        uint256 payment = 1 ether + uint256(extra % 3 ether);
        vm.deal(alice, payment);
        vm.prank(alice);
        book.buySeat{value: payment}();
        assertEq(book.seatsTaken(), 1);
        assertEq(address(book.seatVault()).balance, payment);
    }
}
