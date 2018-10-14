pragma solidity ^0.4.13;


import 'zeppelin/contracts/token/MintableToken.sol';
import './lib/BurnableToken.sol';


contract MSAToken is MintableToken, BurnableToken {

  string public constant name = 'MSAToken';

  string public constant symbol = 'MSA';

  // same as ether. (1ether=1wei * (10 ** 18))
  uint public constant decimals = 18;

  function MSAToken(address admin_address){
    mint(admin_address, 100000000000000000000); // 100MSA
  }
}
