// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Game {

  address player1;
  address player2;
  uint number;
  address currentPlayer;
  address winningPlayer;

  constructor(address nplayer1 , address nplayer2 )  {
    player1 = nplayer1;
    player2 = nplayer2;
    currentPlayer = player1;
    winningPlayer = address(0);
    number = random() % 10000;
  }

  event numberUpdated(uint number , address player1 , address player2);

  function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty , block.timestamp , player1)));
  }

  function currentNumber() public view returns (uint) {
    return number;
  }

  function currentWinningPlayer() public view returns (address) {
    return winningPlayer;
  }

  function updateNumber(uint newnumber) public {
    require(msg.sender == currentPlayer , "Its not your turn");

    // check number is correct
    require (check (number , newnumber) , "Invalid move" );
      number = newnumber;
      if (newnumber == 0) {
        winningPlayer = msg.sender;
        currentPlayer = address (0);
        return;
      }

      if (msg.sender == player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }

      emit numberUpdated(newnumber, player1, player2);

  }

  function check(uint n1 , uint n2) private pure returns (bool) {
    if (n2 >= n1 ) {
      return false;
    }

    uint x1 = n1;
    uint x2 = n2;

    bool dirty = false;
    while (x1 > 0) {

      uint xn1 = x1 % 10;
      uint xn2 = x2 % 10;

      if (xn2 > xn1) {
        return false;
      }

      if (xn2 < xn1) {
          if (dirty) {
            return false;
          }
        dirty = true;
      }

      x1 = x1 / 10;
      x2 = x2 / 10;
    }

    return true;

  }

  function end() public {
    winningPlayer = (address) (0);
  }
 




}
