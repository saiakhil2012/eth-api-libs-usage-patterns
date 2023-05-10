//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DemoToken is ERC20 {
    uint constant _initial_supply = 10000;
    constructor() ERC20("DemoToken", "DT") {
        _mint(msg.sender, _initial_supply);
    }

    function mint(address account, uint amount) public {
        _mint(account, amount);
    }
}