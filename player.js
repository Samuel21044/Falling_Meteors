export default class player {
  constructor(x, y, game) {
    //dimensions for collison
    this.x = x; this.y = y;
    this.w = 0; this.h = 0;
    this.smallerPlayer = 1;
    //w and h for spaceship
    this.Iw = 75; this.Ih = 96;
    //speed
    this.speed = 0;
    this.maxSpeed = 120;
    //other stuff
    this.game = game;
    this.ship = 'defaultRocketShip';

    //collision
    this.collision = [];
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }
  stop() {
    this.speed = 0;
  }
  update(deltaTime) {
    //speed x and y
    this.x += this.speed / deltaTime;

    //constrain
    if(this.x < 0) this.x = 0;
    if(this.x+this.Iw > 750) this.x = 750-this.Iw;

    //list of collision types for diffrent spaceships
    this.collision = [
      [
        {x: this.x+(22 * this.smallerPlayer), y: this.y+(17 * this.smallerPlayer), w: 31 * this.smallerPlayer, h: 49 * this.smallerPlayer},
        {x: this.x+(28 * this.smallerPlayer), y: this.y+(10 * this.smallerPlayer), w: 19 * this.smallerPlayer, h: 7 * this.smallerPlayer},
        {x: this.x+(6 * this.smallerPlayer), y: this.y+(57 * this.smallerPlayer), w: 16 * this.smallerPlayer, h: 14 * this.smallerPlayer},
        {x: this.x+(11 * this.smallerPlayer), y: this.y+(47 * this.smallerPlayer), w: 11 * this.smallerPlayer, h: 10 * this.smallerPlayer},
        {x: this.x+(53 * this.smallerPlayer), y: this.y+(57 * this.smallerPlayer), w: 16 * this.smallerPlayer, h: 14 * this.smallerPlayer},
        {x: this.x+(53 * this.smallerPlayer), y: this.y+(47 * this.smallerPlayer), w: 11 * this.smallerPlayer, h: 10 * this.smallerPlayer},
      ],
      [
        {x: this.x+(3 * this.smallerPlayer), y: this.y+(25 * this.smallerPlayer), w: 90 * this.smallerPlayer, h: 12 * this.smallerPlayer},
        {x: this.x+(9 * this.smallerPlayer), y: this.y+(37 * this.smallerPlayer), w: 78 * this.smallerPlayer, h: 7 * this.smallerPlayer},
        {x: this.x+(36 * this.smallerPlayer), y: this.y+(3 * this.smallerPlayer), w: 24 * this.smallerPlayer, h: 16 * this.smallerPlayer},
        {x: this.x+(30 * this.smallerPlayer), y: this.y+(9 * this.smallerPlayer), w: 36 * this.smallerPlayer, h: 7 * this.smallerPlayer},
        {x: this.x+(12 * this.smallerPlayer), y: this.y+(19 * this.smallerPlayer), w: 72 * this.smallerPlayer, h: 6 * this.smallerPlayer},
        {x: this.x+(18 * this.smallerPlayer), y: this.y+(16 * this.smallerPlayer), w: 60 * this.smallerPlayer, h: 3 * this.smallerPlayer},
      ],
      [
        {x: this.x+(0 * this.smallerPlayer), y: this.y+(0 * this.smallerPlayer), w: 50 * this.smallerPlayer, h: 60 * this.smallerPlayer},
      ],
      [
        //bottom wings
        {x: this.x+(132 * this.smallerPlayer), y: this.y+(256 * this.smallerPlayer), w: 180 * this.smallerPlayer, h: 12 * this.smallerPlayer},
        {x: this.x+(148 * this.smallerPlayer), y: this.y+(248 * this.smallerPlayer), w: 148 * this.smallerPlayer, h: 8 * this.smallerPlayer},
        {x: this.x+(160 * this.smallerPlayer), y: this.y+(240 * this.smallerPlayer), w: 124 * this.smallerPlayer, h: 8 * this.smallerPlayer},
        {x: this.x+(176 * this.smallerPlayer), y: this.y+(232 * this.smallerPlayer), w: 92 * this.smallerPlayer, h: 8 * this.smallerPlayer},
        {x: this.x+(188 * this.smallerPlayer), y: this.y+(220 * this.smallerPlayer), w: 68 * this.smallerPlayer, h: 12 * this.smallerPlayer},
        //body and head
        {x: this.x+(200 * this.smallerPlayer), y: this.y+(20 * this.smallerPlayer), w: 44 * this.smallerPlayer, h: 200 * this.smallerPlayer},
        {x: this.x+(204 * this.smallerPlayer), y: this.y+(8 * this.smallerPlayer), w: 36 * this.smallerPlayer, h: 12 * this.smallerPlayer},
        {x: this.x+(216 * this.smallerPlayer), y: this.y+(0 * this.smallerPlayer), w: 12 * this.smallerPlayer, h: 8 * this.smallerPlayer},
        //engines
        {x: this.x+(120 * this.smallerPlayer), y: this.y+(100 * this.smallerPlayer), w: 44 * this.smallerPlayer, h: 28 * this.smallerPlayer},
        {x: this.x+(280 * this.smallerPlayer), y: this.y+(100 * this.smallerPlayer), w: 44 * this.smallerPlayer, h: 28 * this.smallerPlayer},
        //wings
        {x: this.x, y: this.y+(168 * this.smallerPlayer), w: 444 * this.smallerPlayer, h: 24 * this.smallerPlayer},
        {x: this.x+(8 * this.smallerPlayer), y: this.y+(164 * this.smallerPlayer), w: 428 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(20 * this.smallerPlayer), y: this.y+(160 * this.smallerPlayer), w: 404 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(28 * this.smallerPlayer), y: this.y+(156 * this.smallerPlayer), w: 388 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(40 * this.smallerPlayer), y: this.y+(152 * this.smallerPlayer), w: 364 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(52 * this.smallerPlayer), y: this.y+(148 * this.smallerPlayer), w: 340 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(64 * this.smallerPlayer), y: this.y+(144 * this.smallerPlayer), w: 316 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(76 * this.smallerPlayer), y: this.y+(140 * this.smallerPlayer), w: 292 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(84 * this.smallerPlayer), y: this.y+(136 * this.smallerPlayer), w: 276 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(96 * this.smallerPlayer), y: this.y+(132 * this.smallerPlayer), w: 252 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(108 * this.smallerPlayer), y: this.y+(128 * this.smallerPlayer), w: 228 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(164 * this.smallerPlayer), y: this.y+(108 * this.smallerPlayer), w: 116 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(176 * this.smallerPlayer), y: this.y+(104 * this.smallerPlayer), w: 92 * this.smallerPlayer, h: 4 * this.smallerPlayer},
        {x: this.x+(184 * this.smallerPlayer), y: this.y+(100 * this.smallerPlayer), w: 76 * this.smallerPlayer, h: 4 * this.smallerPlayer},
      ],
    ];

    //change collision based on what kind of spaceshipo player has
    switch(this.ship) {
      case this.game.ship[0]:
          this.game.spaceShipCollisionType = 0;
          this.Iw = 75; this.Ih = 96;
          this.y = 545;
        break;
      case this.game.ship[1]:
          this.game.spaceShipCollisionType = 1;
          this.Iw = 96; this.Ih = 78;
          this.y = 545;
        break;
      case this.game.ship[2]:
          this.game.spaceShipCollisionType = 2;
          this.Iw = 50; this.Ih = 60;
          this.y = 545;
        break;
      case this.game.ship[3]:
          this.game.spaceShipCollisionType = 3;
          this.Iw = 444; this.Ih = 288;
          this.y = 350;
        break;
    }
  }
  draw(ctx) {
    //the width and height is for the collision of the rocket ship. Not the actual rocket itslef
    ctx.drawImage(document.getElementById(this.ship), this.x, this.y, this.Iw * this.smallerPlayer, this.Ih * this.smallerPlayer);

    //making a sheild thing for when  player has immunity
    if(this.game.clickedImmunity) {
      ctx.fillStyle = 'rgb(250, 250, 255, 0.5)';
      ctx.fillRect(this.x-2, this.y-2, (this.Iw * this.smallerPlayer)+4, (this.Ih * this.smallerPlayer)+4);
    }
  }
}