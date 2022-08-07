//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Movie {
    string private movie;
    uint movieCount = 3;

    constructor(string memory _movie) {
        movie = _movie;
    }

    function getMovie() public view returns(uint256){
        return movieCount;
    }

    function addMovie() public {
        movieCount++;
    }
}
