//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Petrichor is ERC20 {
    address public ownerAddress;

    constructor() ERC20("Petrichor", "PTCR") {
        _mint(msg.sender, 10000 * 10 ** decimals());
        ownerAddress = msg.sender;
    }
}
