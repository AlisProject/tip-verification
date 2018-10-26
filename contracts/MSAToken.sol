pragma solidity ^0.4.13;


import 'zeppelin/contracts/token/MintableToken.sol';
import './lib/BurnableToken.sol';


contract MSAToken is MintableToken, BurnableToken {

  string public constant name = 'MSAToken';

  string public constant symbol = 'MSA';

  uint public constant decimals = 0;

  function MSAToken(address admin_address){
    mint(admin_address, 100); // 100MSA
  }
}
