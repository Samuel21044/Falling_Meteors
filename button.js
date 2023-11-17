import { collisionDetection } from './collide.js';

let canvas = document.getElementById('screen');
let rect = canvas.getBoundingClientRect();

export default class Button {
  constructor(game, x, y, w, h, text, round, fontSize, fontType, color, textColor){
    this.x = x; this.y = y;
    this.w = w; this.h = h;
    this.text = text || '';
    this.round = round || 0;
    this.fontSize = fontSize || '20px'; 
    this.fontType = fontType || ' Times New Roman';
    this.color = color || 'rgb(200, 200, 200)'; 
    this.textColor = textColor || 'rgb(0, 0, 0)';
    this.game = game;
  }

  shopUpdate() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 1) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 3;
          for(let i = 0; i < this.game.shopItems.length; i++) {
            this.game.shopItems[i].tab = 1;
          }
        }
      }
    });
  }
  shop1Update() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 3) {
        if(collisionDetection(1, x, y, this)){
          for(let i = 0; i < this.game.shopItems.length; i++) {
            this.game.shopItems[i].tab = 1;
          }
        }
      }
    });
  }
  shop2Update() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 3) {
        if(collisionDetection(1, x, y, this)){
          for(let i = 0; i < this.game.shopItems.length; i++) {
            this.game.shopItems[i].tab = 2;
          }
        }
      }
    });
  }
  howUpdate() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 1) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 4;
        }
      }
    });
  }
  aboutUpdate() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 1) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 5;
        }
      }
    });
  }
  multiplier1Update() {
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      for(let i = 0; i < this.game.shopItems.length; i++) {
        if(this.game.gamestate === 3 && this.game.shopItems[i].tab === 2) {
          if(collisionDetection(1, x, y, this)){
            this.game.shopItems[i].tab = 3;
            this.game.shopItems[i].button = true;
          }
        }
      }
    });
  }
  multiplier2Update() {
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      for(let i = 0; i < this.game.shopItems.length; i++) {
        if(this.game.gamestate === 3 && this.game.shopItems[i].tab === 2) {
          if(collisionDetection(1, x, y, this)){
            this.game.shopItems[i].tab = 4;
            this.game.shopItems[i].button = true;
          }
        }
      }
    });
  }
  multiplier3Update() {
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      for(let i = 0; i < this.game.shopItems.length; i++) {
        if(this.game.gamestate === 3 && this.game.shopItems[i].tab === 2) {
          if(collisionDetection(1, x, y, this)){
            this.game.shopItems[i].tab = 5;
            this.game.shopItems[i].button = true;
          }
        }
      }
    });
  }

  descriptionUpdate() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 4) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 6;
        }
      }
    });
  }
  goBackUpdate(player) {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 3) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 1;
          player.x = 375 - (player.Iw * player.smallerPlayer) / 2;
        }
      }
    });
  }
  goBack2Update(player) {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 4) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 1;
          player.x = 375 - (player.Iw * player.smallerPlayer) / 2;
        }
      }
    });
  }
  goBack3Update(player) {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate == 5) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 1;
          player.x = 375 - (player.Iw * player.smallerPlayer) / 2;
        }
      }
    });
  }
  goBack4Update(player) {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate == 6) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 4;
          player.x = 375 - (player.Iw * player.smallerPlayer) / 2;
        }
      }
    });
  }

  draw(ctx){
    //draw
    //rect
    ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.w, this.h, [this.round]);
      ctx.fillStyle = this.color;
      ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.fill();
    //text
    ctx.textAlign = 'center'; ctx.fillStyle = this.textColor; 
    ctx.font = this.fontSize + this.fontType;
    ctx.fillText(this.text,this.x + this.w/2,this.y + this.h/2 + parseFloat(this.fontSize) * 0.7 / 2);
  }

  drawPerk(ctx, type) {
    if(this.game.shopItems[5].tab === 2) {
      //box
      ctx.fillStyle = 'rgb(180, 180, 180)';
      ctx.fillRect(this.x ,this.y, this.w, this.h);
      ctx.fillStyle = 'rgb(20, 20, 20)';
      ctx.fillRect(this.x+1, this.y+1, this.w-2, this.h-2);
      //box for text
      ctx.fillStyle = 'rgb(180, 180, 180)';
      ctx.fillRect(this.x ,this.y+80, this.w, this.h-80);
      ctx.fillStyle = 'rgb(20, 20, 20)';
      ctx.fillRect(this.x+1, this.y+81, this.w-2, this.h-82);
      //text
      ctx.textAlign = 'center';
      //view text
      ctx.font = '21px Arial';
      ctx.fillStyle = 'orange';
      ctx.fillText('View', this.x + this.w/2, this.y+105);
      ctx.font = '22px Arial';
      ctx.fillStyle = 'white';

      switch(type) {
        case 1:
            ctx.fillText('Score', this.x+this.w/2, this.y+35);
            ctx.font = '19px Arial';
            ctx.fillText('Multiplier', this.x+this.w/2, this.y+60);
          break;
        case 2:
            ctx.fillText('Points', this.x+this.w/2, this.y+35);
            ctx.font = '19px Arial';
            ctx.fillText('Multiplier', this.x+this.w/2, this.y+60);
          break;
        case 3:
            ctx.font = '20px Arial';
            ctx.fillText('Cheaper', this.x+this.w/2, this.y+25);
            ctx.fillText('Perks', this.x+this.w/2, this.y+50);
            ctx.font = '18px Arial';
            ctx.fillText('Multiplier', this.x+this.w/2, this.y+70);
          break;
        case 4:
            ctx.font = '20px Arial';
            ctx.fillText('Cheaper', this.x+this.w/2, this.y+25);
            ctx.font = '15px Arial';
            ctx.fillText('Spaceships', this.x+this.w/2, this.y+45);
            ctx.font = '19px Arial';
            ctx.fillText('Multiplier', this.x+this.w/2, this.y+70);
          break;
        case 5:
            ctx.font = '22px Arial';
            ctx.fillText('More', this.x+this.w/2, this.y+35);
            ctx.fillText('Perks', this.x+this.w/2, this.y+60);
          break;
      }
    }
  }
}