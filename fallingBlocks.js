import { collisionDetection } from './collide.js';

export default class fallingBlocks {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.w = 25; this.h = 30;
    this.Iw = 25; this.Ih = 50;

    //beginning speed of meteors
    this.speed = 0; this.maxSpeed = 100; this.slowDown = 1;
    this.timerTillNextBlock = 50;

    this.timeOutFunc = null;
  }

  moveDown() {
    this.speed = this.maxSpeed;
  }


  update(deltaTime, blockArray, player, game) {
    //speed up game
    this.maxSpeed = game.meteorsSpeed / this.slowDown;

    //speed
    this.y += this.speed / deltaTime;

    //delete when reaches end
    if(this.y > 700) {
      blockArray.shift();
    }

    //collide with player
    for(let i = 0; i < player.collision[game.spaceShipCollisionType].length; i++) {
      if(collisionDetection(2, 0, 0, this, player.collision[game.spaceShipCollisionType][i]) && !game.clickedImmunity) {
        game.gameOver = true;
        player.stop();

        //timer
        this.timeOutFunc = setTimeout(() => {
          if(game.gameOver && !game.revive) {
            game.reset();
          }
        }, 1000);
        break;
      }
    }
  }
  draw(ctx) {
    //the width and height is for the collision of the rocket ship. Not the actual rocket itslef
    ctx.drawImage(document.getElementById('meteorOnFire'), this.x, this.y-20, this.Iw, this.Ih);
  }
}