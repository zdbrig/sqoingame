// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Game.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SqoinToken  is ERC20{


  mapping( address => Game) gamesInPlay;
  address owner;

  constructor()  ERC20("sqoin" , "sqn" )
   {
     _mint(msg.sender , 100000000000000000000 );
     owner = msg.sender;
   }

  function createChallenge() public {
    Game game = new Game(msg.sender , owner);
    gamesInPlay[msg.sender] = game;
  }

  function myGame(address player) public view returns (Game) {
    return gamesInPlay[player];
  }

  function claimVictory() public {
    Game game = gamesInPlay[msg.sender];

    if (game.currentWinningPlayer() == msg.sender) {
      _transfer(owner, msg.sender, 5000000000000000000);
      game.end();
    }
  }


}
