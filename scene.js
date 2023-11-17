export default class star{
  constructor(x, y) {
    this.x = x; this.y = y;
    this.size = 5;
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  drawSun(ctx) {
    ctx.fillStyle = 'rgb(255, 218, 66, 0.95)';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  drawMenu(ctx) {
    ctx.fillStyle = 'rgb(235, 235, 235)';
    ctx.fillRect(this.x, this.y, this.size-0.5, this.size-0.5);
  }
}

let stars = [];
for(let i = 0; i < 100; i++) {
  stars.push(new star(Math.floor(Math.random() * 750), Math.floor(Math.random() * 640)));
}
let sun = [];
for(let i = 0; i < 400; i++) {
  sun.push(new star(Math.floor(Math.random() * 750) / i, Math.floor(Math.random() * 500) / i));
}

//function scenes
export function mainBackground(ctx) {
  //stars and sun
  for(let i = 0; i < stars.length; i++) {
    stars[i].draw(ctx);
  }
  for(let i = 0; i < stars.length; i++) {
    sun[i].drawSun(ctx);
  }

  //planets
  ctx.drawImage(document.getElementById('earth'), 150, 130, 60, 60);
  ctx.drawImage(document.getElementById('jupiter'), 500, 280, 120, 120);
  ctx.fillStyle = 'rgb(20, 20, 20, 0.3)';
  ctx.fillRect(150, 130, 60, 60);
  ctx.fillRect(500, 280, 120, 120);
  
  //sun
  ctx.fillStyle = 'rgb(255, 218, 66, 0.95)';
  ctx.fillRect(0, 0, 10, 10);
}

export function deathBackground(ctx) {
  //stars
  for(let i = 0; i < stars.length; i++) {
    stars[i].drawMenu(ctx);
  }
  //dont let the stars spawn in a block around the letters
  ctx.fillStyle = 'rgb(20, 20, 20)';
  ctx.fillRect(150, 140, 450, 350);
}