export default class keyboard {
  constructor (player, game) {

    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        //movement
        case 37:
            player.moveLeft();
          break;
        case 39:
            player.moveRight();
          break;
        case 65:
            player.moveLeft();
          break;
        case 68:
            player.moveRight();
          break;
        //starting a new game
        case 13:
            if(game.gamestate === 1 && !game.gameOver) {
              //reset certain things for game
              game.Score = 0;
              game.pointsScored = 0;
              game.gamestate = 2;
              player.x = 375 - (player.Iw * player.smallerPlayer) / 2;
            }
            if(game.gameOver && !game.revived) {
              game.reset();
              for(let i = 0; i < game.meteorsL.length; i++) {
                clearTimeout(game.meteorsL[i].timeOutFunc);
              }
            }
          break;
        case 8:
            //return to home screen if not running
            if(game.gamestate !== 1 && game.gamestate !== 2) {
              game.gamestate = 1;
              player.x = 375 - (player.Iw * player.smallerPlayer) / 2;
            }
            //if game is running
            if(game.gamestate === 2 && !game.revived) {
              game.reset();
            }
            //if paused
            if(game.paused === 2 || game.paused === 1) {
              if(!game.gameOver) {
                game.paused++;
              }
            }
          break;
        case 16:
            if(game.immunity && game.gamestate === 2 && !game.gameOver) { game.clickedImmunity = true; }
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
            if(player.speed < 0) player.stop();
          break;
        case 39:
            if(player.speed > 0) player.stop();
          break;
        case 65:
            if(player.speed < 0) player.stop();
          break;
        case 68:
            if(player.speed > 0) player.stop();
          break;
        case 27:
            if(game.gamestate === 2) {
              if(!game.gameOver) {
                game.paused++;
              }
            }
          break;
        case 13:
            if(game.gamestate === 1) {
              game.gameOver = false;
            }
          break;
      }
    });
  }
}