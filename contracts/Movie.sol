//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./Petrichor.sol";

contract Movie {

    Petrichor petrichor;
    uint totalLocked = 1;
    
    constructor(address _interactContract) {
        petrichor = Petrichor(_interactContract);
    }

    function transferFrom(address from,address to, uint256 amount) external{
        petrichor.transferFrom(from,to,amount);
    }
   
}