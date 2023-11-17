//importing stuff
import player from './player.js';
import keyboard from './keyInput.js';
import fallingBlocks from './fallingBlocks.js';
import Button from './button.js';
import Shop from './shop.js';

//scenes
import { mainBackground, deathBackground } from './scene.js';

//save file
import { saveScore, savePoints, fullScreen, saveScene, saveEarnedPoints} from './save.js';

//activaitng canvas and rect so I can click
let canvas = document.getElementById('screen');
let rect = canvas.getBoundingClientRect();

//game scenes
const GAMESTAE = {
  MENU: 1,
  RUNNING: 2,
  SHOP: 3,
  HOW: 4,
  ABOUT: 5,
  DESCRIPTION: 6,
};

export default class Game {
  constructor() {
    this.gamestate = GAMESTAE.MENU;
    this.paused = 0;
    this.gameOver = false;

    //blocks
    this.newBlock = true;
    this.meteors = new fallingBlocks();
    this.meteorsL = [];

    //other stuff
    this.Player = new player(375, 545, this);

    //collision stuff for space ship
    this.spaceShipCollisionType = 0;

    this.Keyboard = new keyboard(this.Player, this);
    new keyboard(this.Player, this);

    //score
    this.timerScore = 100;
    this.Score = 0;
    this.highScore = 0;
    this.resetScoreTime = 100;

    //points
    this.timerTillPoints = 500;
    this.pointsScored = 0;
    this.totalPoints = 0;
    this.incrementingPoints = 1;

    //for all files
    this.callFileOnce = 2;

    //save space ships
    this.savedSpaceShips = [];
    //save perks
    this.savedPerks = [];
    //save which perks saved or not
    this.savedPerkItems = [];
    //save which spaceships are saved or not
    this.savedSpaceShipItem = 0;

    //buttons 
    this.shop = new Button(this, 250, 440, 250, 45, 'Enter Shop', 7);
    this.how = new Button(this, 170, 215, 60, 150, 'How', 5);
    this.about = new Button(this, 530, 215, 60, 150, 'About', 5);
    //go back buttons
    this.goBack = new Button(this, 275, 50, 200, 35, 'Back to Menu');
    this.goBack2 = new Button(this, 425, 540, 200, 35, 'Back to Menu', 2);
    this.goBack3 = new Button(this, 650, 442.5, 55, 155, '', 4);
    this.goBack4 = new Button(this, 480, 600, 150, 30, 'Go back');
    this.description = new Button(this, 90, 550, 150, 30, 'Descriptions', 4, '25px');
    //shop buttons
    this.shopB1 = new Button(this, 63.75, 140, 247.5, 35, 'Character', 4);
    this.shopB2 = new Button(this, 438.75, 140, 247.5, 35, 'Perks', 4);
    //perk buttons
    this.scoreM = new Button(this, 180, 210, 85, 120);
    this.pointsM = new Button(this, 480, 210, 85, 120);
    this.perkM = new Button(this, 257.5, 510, 85, 120);
    this.shipM = new Button(this, 407.5, 510, 85, 120);
    this.morePerksM = new Button(this, 630, 360, 85, 120);

    //space ships
    this.ship = [
      'defaultRocketShip',
      'alienSpaceShip',
      'colorfullShip',
      'airplane',
    ];

    //items for shop
    this.shopItems = [
      //space ships
      new Shop(this, 1, 82, 210, 53.4, 80, 0, this.ship[0]),
      new Shop(this, 1, 252, 210, 70, 56.875, 200, this.ship[1]),
      new Shop(this, 1, 419, 210, 20, 20, 150, this.ship[2]),
      new Shop(this, 1, 582, 210, 80, 65, 100, this.ship[3]),

      //perks (normal screen)
      new Shop(this, 2, 30, 210, 0, 0, 180, 1),
      new Shop(this, 2, 330, 210, 0, 0, 150, 3),
      new Shop(this, 2, 630, 210, 0, 0, 150, 5),
      new Shop(this, 2, 30, 360, 0, 0, 300, 6),
      new Shop(this, 2, 180, 360, 0, 0, 200, 7),
      new Shop(this, 2, 330, 360, 0, 0, 300, 8),
      new Shop(this, 2, 480, 360, 0, 0, 100, 9),

      //-----------------

      //multiplier screen for score and points
      new Shop(this, 3, 30, 250, 0, 0, 50, 11, 1),  //this is 10
      new Shop(this, 3, 180, 250, 0, 0, 100, 12, 1),
      new Shop(this, 3, 330, 250, 0, 0, 150, 13, 1),
      new Shop(this, 3, 480, 250, 0, 0, 200, 14, 1),
      new Shop(this, 3, 630, 250, 0, 0, 250, 15, 1),
      //-----------------
      new Shop(this, 3, 30, 476.5, 0, 0, 50, 16),
      new Shop(this, 3, 180, 476.5, 0, 0, 150, 17),
      new Shop(this, 3, 330, 476.5, 0, 0, 350, 18),
      new Shop(this, 3, 480, 476.5, 0, 0, 800, 19),
      new Shop(this, 3, 630, 476.5, 0, 0, 2000, 20),

      //-----------------

      //multiplier screen for space ships and perks
      new Shop(this, 4, 30, 250, 0, 0, 100, 21, 1),
      new Shop(this, 4, 180, 250, 0, 0, 200, 22, 1),
      new Shop(this, 4, 330, 250, 0, 0, 300, 23, 1),
      new Shop(this, 4, 480, 250, 0, 0, 400, 24, 1),
      new Shop(this, 4, 630, 250, 0, 0, 500, 25, 1),
      //-----------------
      new Shop(this, 4, 30, 476.5, 0, 0, 160, 26),
      new Shop(this, 4, 180, 476.5, 0, 0, 320, 27),
      new Shop(this, 4, 330, 476.5, 0, 0, 480, 28),
      new Shop(this, 4, 480, 476.5, 0, 0, 640, 29),
      new Shop(this, 4, 630, 476.5, 0, 0, 800, 30),

      //-----------------

      //multiplier screen for more perks
      new Shop(this, 5, 30, 260, 0, 0, 100, 32),
      new Shop(this, 5, 180, 260, 0, 0, 150, 33),
      new Shop(this, 5, 330, 260, 0, 0, 200, 34),
      new Shop(this, 5, 480, 260, 0, 0, 250, 35),
      new Shop(this, 5, 630, 260, 0, 0, 300, 36),
      new Shop(this, 5, 107.5, 460, 0, 0, 350, 37),
      new Shop(this, 5, 257.5, 460, 0, 0, 400, 38),
      new Shop(this, 5, 407.5, 460, 0, 0, 450, 39),
      new Shop(this, 5, 557.5, 460, 0, 0, 500, 40),
    ];

    //meteors speed
    this.meteorsSpeed = 100; 
    this.maxMeteorsSpeed = 200;
    //amount of meteors
    this.amountOfMeteors = 5.5;
    this.speedUpMeteors = 0.015;

    //num of perks
    this.numOfPerks = 2; this.numOfUsingPerks = 0;
    //reduce perk cost
    this.decreasedPerkCost = 1;
    this.decreasedSpaceshipCost = 1;

    //player revive
    this.revive = false;
    this.revived = false;
    this.timerTillStartRevive = 300;
    this.timerRevive = false;
    this.loadingBar_span = 230;

    //player immunity
    this.immunity = false;
    this.clickedImmunity = false;
    this.immunityTimer = 100;
    this.immunityTime = 10;

    //refresh if player changes screen size
    this.refresh = false;
    this.changeScreenRefresh = false;

    //load in all perk items
    this.loadPerkItems = true;

    //center player to middle
    this.centerPlayer = false;
  }

  reset() {
    //reset so game starts
    this.gamestate = 1;
    this.gameOver = false;
    //reset player and metoers

    //do something here and for everything
    this.Player.x = 375 - (this.Player.Iw * this.Player.smallerPlayer) / 2;
    this.meteorsL = [];
    //reset scores and speed
    this.timerTillPoints = 500;
    this.timerScore = 100;
    if(this.timerTillStartRevive > 0) {
      this.meteorsSpeed = 100;
    }
    this.callFileOnce = 2;

    this.loadingBar_span = 230;

    //resseting immunity
    this.clickedImmunity = false;
    this.immunityTimer = 100; this.immunityTime = 10;
  }
  update(deltaTime) {
    switch(this.gamestate) {
      case 1:
          //turn perks on in game
          if(JSON.parse(localStorage.getItem('savedPerkItemsFM')) !== null) {
            this.savedPerkItems = JSON.parse(localStorage.getItem('savedPerkItemsFM'));
            for(let i = 0; i < this.savedPerkItems.length; i++) {
               this.shopItems[this.shopItems.findIndex((e) => { return e.item === this.savedPerkItems[i]; })].cost = 0;
               this.shopItems[this.shopItems.findIndex((e) => { return e.item === this.savedPerkItems[i]; })].usingPerk = true;
             }
          }

          //buttons
          this.shop.shopUpdate();
          this.how.howUpdate();
          this.about.aboutUpdate();

          //make sure files get called once
          if(this.Score > this.highScore || this.pointsScored > 0) {
            this.callFileOnce--;
            if(this.callFileOnce <= 0) {
              this.callFileOnce = 0;
            }
          }

          //save points and score
          //displays the saved score of the player
          this.highScore = JSON.parse(localStorage.getItem('savedScoreFM'));

          if (this.Score > this.highScore) {
            //saves the score of the player and makes sure save file gets called once
            if(this.callFileOnce === 1) {
              saveScore(this);
            }
          }

          //check if score is undefined
          if(this.highScore === null) {
            this.highScore = 0;
          }

          //displays the saved score of the player
          //it is save and not saved bc saved doesnt work for some reason
          this.totalPoints = JSON.parse(localStorage.getItem('savedPointFM'));

          //points
          if (this.pointsScored > 0) {
            //saves the score of the player
            if(this.callFileOnce === 1) {
              savePoints(this);
            }
          }  

          //save file to automatically have your specified space ship turned on
          if(JSON.parse(localStorage.getItem('saveSpaceShipItemFM')) !== null) {
            this.savedSpaceShipItem = JSON.parse(localStorage.getItem('saveSpaceShipItemFM'));
            this.Player.ship = this.savedSpaceShipItem;
          }

          //check if score is undefined
          if(this.totalPoints === null) {
            this.totalPoints = 0;
          }

          //add perks to main screen for cosmetics
          for(let i = 0; i < this.shopItems.length; i++) {
            if(this.shopItems[i].usingPerk) {
              switch(this.shopItems[i].item) {
                case 1:
                    this.revive = true;
                  break;
                case 3:
                    this.immunity = true;
                  break;
                case 8:
                    this.Player.smallerPlayer = .85;
                  break;
                case 9:
                    this.Player.maxSpeed = 150;
                  break;
                //score and points multiplier
                case 11:
                    //score 1.2x
                    this.resetScoreTime = 90;
                  break;
                case 12:
                    //score 1.4x
                    this.resetScoreTime = 80;
                  break;
                case 13:
                    //score 1.6x
                    this.resetScoreTime = 70;
                  break;
                case 14:
                    //score 1.8x
                    this.resetScoreTime = 60;
                  break;
                case 15:
                    //score 2.0x
                    this.resetScoreTime = 50;
                  break;
                case 16:
                    //point 2.0x
                    this.incrementingPoints = 2;
                  break;
                case 17:
                    //point 3.0x
                    this.incrementingPoints = 3;
                  break;
                case 18:
                    //point 4.0x
                    this.incrementingPoints = 4;
                  break;
                case 19:
                    //point 5.0x
                    this.incrementingPoints = 5;
                  break;
                case 20:
                    //point 10.0x
                    this.incrementingPoints = 10;
                  break;

                 //more perks
                case 31:
                    //more perks +3
                    this.numOfPerks = 3;
                  break;
                case 32:
                    //more perks +4
                    this.numOfPerks = 4;
                  break;
                case 33:
                    //more perks +5
                    this.numOfPerks = 5;
                  break;
                case 34:
                    //more perks +6
                    this.numOfPerks = 6;
                  break;
                case 35:
                    //more perks +7
                    this.numOfPerks = 7;
                  break;
                case 36:
                    //more perks +8
                    this.numOfPerks = 8;
                  break;
                case 37:
                    //more perks +9
                    this.numOfPerks = 9;
                  break;
                case 38:
                    //more perks +10
                    this.numOfPerks = 10;
                  break;
                case 39:
                    //more perks +11
                    this.numOfPerks = 11;
                  break;
                case 40:
                    //more perks +12
                    this.numOfPerks = 12;
                  break;
              }
            }

            //return values back to normal if the bought perk is off
            if(this.shopItems[i].boughtPerk && this.shopItems[i].usingPerk === false) {
              switch(this.shopItems[i].item) {
                case 1:
                    this.revive = false;
                  break;
                case 3:
                    this.immunity = false;
                  break;
                case 8:
                    this.Player.smallerPlayer = 1;
                  break;
                case 9:
                    this.Player.maxSpeed = 120;
                  break;
              }
            }
          }

          //player
          this.Player.update(deltaTime); 

          if(!this.centerPlayer) {
            this.centerPlayer = true;
            this.Player.x = 375 - (this.Player.Iw * this.Player.smallerPlayer) / 2;
          }

          //reset score and points timer if it does not match their timers
          if(this.timerScore !== this.resetScoreTime) {
            this.timerScore = this.resetScoreTime;
          }
          if(this.timerTillPoints !== this.resetScoreTime * 5) {
            this.timerTillPoints = this.resetScoreTime * 5;
          }

          //hiding link that is supposed to go in about section
          document.getElementById('beta-link').style.display = 'none';

          //refresh page if player goes full screen or not.
          if(JSON.parse(localStorage.getItem('refreshScreenFM')) !== null) { this.refresh = JSON.parse(localStorage.getItem('refreshScreenFM')); }
          if(window.innerHeight === screen.height && !this.refresh) {
            fullScreen(this, true);
            window.location.reload();
          }
          if(window.innerHeight !== screen.height && this.refresh) {
            fullScreen(this, false);
            window.location.reload();
          }

          //bring to correct scene if player minimized or full-screned
          if(JSON.parse(localStorage.getItem('saveRefreshSceneFM')) !== null && JSON.parse(localStorage.getItem('saveRefreshSceneFM'))[1] === true) {
            this.gamestate = JSON.parse(localStorage.getItem('saveRefreshSceneFM'))[0];
            for(let i = 0; i < this.shopItems.length; i++) {
              this.shopItems[i].tab = JSON.parse(localStorage.getItem('saveRefreshSceneFM'))[2];
            }
            if(JSON.parse(localStorage.getItem('saveEarnedPointsFM')) !== null) {
              this.pointsScored = JSON.parse(localStorage.getItem('saveEarnedPointsFM'));
            }
            saveScene(this, false, 1);
          }
        break;
      case 2:      
          //activating player revive
          if(this.gameOver) {
            canvas.addEventListener('click', (e) => {
              //defining x and y
              let x = e.clientX - rect.left; let y = e.clientY - rect.top;
        
              //click revive if player has activated revive
              if(this.revive && this.gameOver === true && x > 260 && x < 490 && y > 180 && y < 355) {
                this.revived = true;
              }
            });
          }

          //player revive
          if(this.revived) {
            this.timerTillStartRevive--;
            this.timerRevive = true;
          }
          if(this.timerTillStartRevive <= 0) {
            this.reset();
            this.gamestate = 2;
            this.revive = false; this.revived = false;
            this.timerTillStartRevive = 300;
          }

          //decrease bar span
          if(this.revive && this.gameOver && this.loadingBar_span > 0) {
            this.loadingBar_span -= 1.30434782609;
            this.timerRevive = true;
          }
          if(this.loadingBar_span <= 0) {
            this.loadingBar_span = 0;
          } else { this.timerRevive = true; }

          //resseting game for revive
          if(!this.revived && this.loadingBar_span === 0) { this.timerRevive = false; }
          if(!this.timerRevive) { this.reset(); }

          //pause
          if(this.paused === 2 || this.paused === 1 || this.gameOver) {
            return;
          }

          //speed up meteors
          if(this.meteorsSpeed < this.maxMeteorsSpeed) {
            this.meteorsSpeed += this.speedUpMeteors;
          }

          //give a random output
          let shoot = Math.round(Math.random() * this.amountOfMeteors);
          if(shoot === 1) {
            //how fast the meteors shoot out per second
            this.meteorsL.push(new fallingBlocks(Math.round(Math.random() * (750 - this.meteors.w - 1) + 1), -50));
          }

          //having the bullet things update
          for (let i = 0; i < this.meteorsL.length; i++) {
            this.meteorsL[i].moveDown();
            this.meteorsL[i].update(deltaTime, this.meteorsL, this.Player, this);
          }

          //add a score based on a timer
          this.timerScore--;
          if(this.timerScore <= 0) {
            this.Score++;
            this.timerScore = this.resetScoreTime;
          }
          //points timer
          this.timerTillPoints--;
          if(this.timerTillPoints <= 0) {
            this.pointsScored += this.incrementingPoints;
            this.timerTillPoints = this.resetScoreTime * 5;
          }

          //updating other objects n stuff
          this.Player.update(deltaTime);

          //player immunity timer
          if(this.clickedImmunity) {
            this.immunityTimer--;
          }
          if(this.immunityTimer <= 0) {
            this.immunityTime--;
            this.immunityTimer = 100;
          }
          if(this.immunityTime === 0) {
            this.immunity = false; this.clickedImmunity = false;
          }

          //activate perks if player is using perk
          for(let i = 0; i < this.shopItems.length; i++) {
            if(this.shopItems[i].usingPerk) {
              switch(this.shopItems[i].item) {
                case 5:
                    //less meteors
                    this.amountOfMeteors = 6.8;
                  break;
                case 6:
                    //smaller meteors
                    for(let i = 0; i < this.meteorsL.length; i++) {
                      this.meteorsL[i].Iw = 22.5; this.meteorsL[i].Ih = 45;
                      this.meteorsL[i].w = 22.5; this.meteorsL[i].h = 27;
                    }
                  break;
                case 7:
                    //slower meteors
                    for(let i = 0; i < this.meteorsL.length; i++) {
                      this.meteorsL[i].slowDown = 1.2;
                    }
                    this.maxMeteorsSpeed = 160;
                    this.speedUpMeteors = 0.01;
                  break;
                case 8:
                    //smaller player
                    this.Player.smallerPlayer = .85;
                  break;
                case 9:
                    //faster player
                    this.Player.maxSpeed = 150;
                  break;
              }
            }
            //return values back to normal if the bought perk is off
            if(this.shopItems[i].boughtPerk && this.shopItems[i].usingPerk === false) {
              switch(this.shopItems[i].item) {
                //first tab
                case 1:
                    //revive
                  break;
                case 3:
                    //immunity
                  break;
                case 5:
                    //less meteors
                    this.amountOfMeteors = 5.5;
                  break;
                case 6:
                    //smaller meteors
                    for(let i = 0; i < this.meteorsL.length; i++) {
                      this.meteorsL[i].Iw = 25; this.meteorsL[i].Ih = 50;
                      this.meteorsL[i].w = 25; this.meteorsL[i].h = 30;
                    }
                  break;
                case 7:
                    //slower meteors
                    for(let i = 0; i < this.meteorsL.length; i++) {
                      this.meteorsL[i].slowDown = 1;
                    }
                    this.maxMeteorsSpeed = 200;
                    this.speedUpMeteors = 0.015;
                  break;
                case 8:
                    //smaller player
                    this.Player.smallerPlayer = 1;
                  break;
                case 9:
                    //faster player
                    this.Player.maxSpeed = 120;
                  break;
              }
            }
          }

          //hiding link that is supposed to go in about section
          document.getElementById('beta-link').style.display = 'none';

          //stop page from refeshing if player refreshes but is in a middle of a game
          if(this.refresh) {
            return;
          }
        break;
      case 3:
          //buttons
          this.shopB1.shop1Update(); 
          this.shopB2.shop2Update();
          this.goBack.goBackUpdate(this.Player); 

          //perk buttons
          this.scoreM.multiplier1Update();
          this.pointsM.multiplier1Update();
          this.perkM.multiplier2Update();
          this.shipM.multiplier2Update();
          this.morePerksM.multiplier3Update();

          //items
          for(let i = 0; i < this.shopItems.length; i++) {
            this.shopItems[i].update();
          }

          //change amount of perks
          for(let i = 0; i < this.shopItems.length; i++) {
            if(this.shopItems[i].usingPerk) {
              switch(this.shopItems[i].item) {
                //cheaper spaceships and perks
                case 21:
                    //cheaper space ships -10%
                    this.decreasedSpaceshipCost = 0.9;
                  break;
                case 22:
                    //cheaper space ships -20%
                    this.decreasedSpaceshipCost = 0.8;
                  break;
                case 23:
                    //cheaper space ships -30%
                    this.decreasedSpaceshipCost = 0.7;
                  break;
                case 24:
                    //cheaper space ships -40%
                    this.decreasedSpaceshipCost = 0.6;
                  break;
                case 25:
                    //cheaper space ships -50%
                    this.decreasedSpaceshipCost = 0.5;
                  break;
                //---------
                case 26:
                    //cheaper perks -10%
                    this.decreasedPerkCost = 0.9;
                  break;
                case 27:
                    //cheaper perks -20%
                    this.decreasedPerkCost = 0.8;
                  break;
                case 28:
                    //cheaper perks -30%
                    this.decreasedPerkCost = 0.7;
                  break;
                case 29:
                    //cheaper perks -40%
                    this.decreasedPerkCost = 0.6;
                  break;
                case 30:
                    //cheaper perks -50%
                    this.decreasedPerkCost = 0.5;
                  break;

                //more perks
                case 31:
                    //more perks +3
                    this.numOfPerks = 3;
                  break;
                case 32:
                    //more perks +4
                    this.numOfPerks = 4;
                  break;
                case 33:
                    //more perks +5
                    this.numOfPerks = 5;
                  break;
                case 34:
                    //more perks +6
                    this.numOfPerks = 6;
                  break;
                case 35:
                    //more perks +7
                    this.numOfPerks = 7;
                  break;
                case 36:
                    //more perks +8
                    this.numOfPerks = 8;
                  break;
                case 37:
                    //more perks +9
                    this.numOfPerks = 9;
                  break;
                case 38:
                    //more perks +10
                    this.numOfPerks = 10;
                  break;
                case 39:
                    //more perks +11
                    this.numOfPerks = 11;
                  break;
                case 40:
                    //more perks +12
                    this.numOfPerks = 12;
                  break;
              }
            }
          }

          for(let i = 0; i < this.shopItems.length; i++) {
            //turn num of using perks to 0 if no perks are on
            if(this.numOfUsingPerks < 0 && !this.shopItems[i].usingPerk) {
              this.numOfUsingPerks = 0;
            }
          }

          //hiding link that is supposed to go in about section
          document.getElementById('beta-link').style.display = 'none';

          //refresh page if player goes full screen or not.
          if(JSON.parse(localStorage.getItem('refreshScreenFM')) !== null) { this.refresh = JSON.parse(localStorage.getItem('refreshScreenFM')); }
          if(window.innerHeight === screen.height && !this.refresh) {
            fullScreen(this, true);
            saveScene(this, true, this.shopItems[0].tab);
            saveEarnedPoints(this);
            window.location.reload();
          }
          if(window.innerHeight !== screen.height && this.refresh) {
            fullScreen(this, false);
            saveScene(this, true, this.shopItems[0].tab);
            saveEarnedPoints(this);
            window.location.reload();
          }
        break;
      case 4:
          this.description.descriptionUpdate();
          this.goBack2.goBack2Update(this.Player);

          //hiding link that is supposed to go in about section
          document.getElementById('beta-link').style.display = 'none';

          //refresh page if player goes full screen or not.
          if(JSON.parse(localStorage.getItem('refreshScreenFM')) !== null) { this.refresh = JSON.parse(localStorage.getItem('refreshScreenFM')); }
          if(window.innerHeight === screen.height && !this.refresh) {
            fullScreen(this, true);
            saveScene(this, true, 1);
            window.location.reload();
          }
          if(window.innerHeight !== screen.height && this.refresh) {
            fullScreen(this, false);
            saveScene(this, true, 1);
            window.location.reload();
          }
        break;
      case 5:
          this.goBack3.goBack3Update(this.Player);
          //showing beta link
          document.getElementById('beta-link').style.display = 'block';
          
          //repositioning when player full screens
          if(window.innerHeight === screen.height) {
            document.getElementById('beta-link').style.top = '655px';
          } else {
            document.getElementById('beta-link').style.top = '605px';
          }

          //refresh page if player goes full screen or not.
          if(JSON.parse(localStorage.getItem('refreshScreenFM')) !== null) { this.refresh = JSON.parse(localStorage.getItem('refreshScreenFM')); }
          if(window.innerHeight === screen.height && !this.refresh) {
            fullScreen(this, true);
            saveScene(this, true, 1);
            window.location.reload();
          }
          if(window.innerHeight !== screen.height && this.refresh) {
            fullScreen(this, false);
            saveScene(this, true, 1);
            window.location.reload();
          }
        break;
      case 6:
          this.goBack4.goBack4Update(this.Player);

          //hiding link that is supposed to go in about section
          document.getElementById('beta-link').style.display = 'none';

          //refresh page if player goes full screen or not.
          if(JSON.parse(localStorage.getItem('refreshScreenFM')) !== null) { this.refresh = JSON.parse(localStorage.getItem('refreshScreenFM')); }
          if(window.innerHeight === screen.height && !this.refresh) {
            fullScreen(this, true);
            saveScene(this, true, 1);
            window.location.reload();
          }
          if(window.innerHeight !== screen.height && this.refresh) {
            fullScreen(this, false);
            saveScene(this, true, 1);
            window.location.reload();
          }
        break;
    }
  }
  draw(ctx) {
    switch(this.gamestate) {
      case 1:
          //background
          deathBackground(ctx);
          
          //scores and such
          ctx.fillStyle = 'orange';
          ctx.textAlign = 'center';
          //restart
          ctx.font = '50px Arial';
          ctx.fillText('Falling Meteors', 375, 180);
          ctx.font = '30px Arial';
          ctx.fillText('Press enter to play again', 375, 410);

          //score
          ctx.font = '24px Arial';
          ctx.fillText('Score: ' + parseFloat(this.Score), 375, 240);
          ctx.fillText('High Score: ' + parseFloat(this.highScore), 375, 270);
          //points
          ctx.fillText('Points: ' + parseFloat(this.pointsScored), 375, 325);
          ctx.fillText('Total Points: ' + parseFloat(this.totalPoints), 375, 355);

          this.shop.draw(ctx);
          this.how.draw(ctx);
          this.about.draw(ctx);
          this.Player.draw(ctx);
        break;
      case 2:
          mainBackground(ctx);
          this.Player.draw(ctx);
          for (let i = 0; i < this.meteorsL.length; i++) {
            this.meteorsL[i].draw(ctx);
          }

          //show game score and points
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgb(255, 175, 0)';
          ctx.font = '25px Arial';
          ctx.fillText('Score: ' + parseFloat(this.Score), 670, 60);
          ctx.fillText('Points: ' + parseFloat(this.pointsScored), 670, 110);

          //immunity
          ctx.font = '25px Arial';
          if(this.clickedImmunity) {
            ctx.fillStyle = 'rgb(250, 250, 250)';
            ctx.fillText(this.immunityTime + 's of:', 670, 150);
            ctx.fillText('Immunity left', 670, 180);
          }

          //start a new game in 3 seconds if player clicked revive
          if(this.revived) {
            ctx.font = '50px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText('Game starts in', 375, 100);
            //numbers
            if(this.timerTillStartRevive > 200) {
              ctx.fillText('3', 375, 150);
            } else if(this.timerTillStartRevive > 100) {
              ctx.fillText('2', 375, 150);
            } else { 
              ctx.fillText('1', 375, 150);
            }
          }

          //pause
          if(this.paused === 2 || this.paused === 1) {
            if(!this.gameOver) {
              ctx.fillStyle = 'rgb(20, 20, 20, 0.5)';
              ctx.fillRect(0, 0, 750, 640);
              //text
              ctx.fillStyle = 'rgb(250, 250, 250)';
              ctx.font = '50px Arial';
              ctx.fillText('Game Paused', 375, 100);
              ctx.font = '25px Arial'; ctx.fillStyle = 'rgb(240, 240, 240)';
              ctx.fillText('Click Esc to Unpause', 375, 140);
              ctx.font = '23px Arial'; ctx.fillStyle = 'rgb(240, 240, 240)';
              ctx.fillText('Press Backspace to Quit', 375, 180);
            }
          }

          //pause and unpause the screen
          if(this.paused >= 3) {
            this.paused = 0;
          }

          //game over
          if(this.gameOver && !this.revived) {
            ctx.fillStyle = 'rgb(250, 250, 250)';
            ctx.font = '50px Arial';
            ctx.fillText('Game Over', 375, 100);
            ctx.strokeStyle = 'black';

            //add revive if revived
            if(this.revive) {
              //box that surrounds revive
              ctx.fillStyle = 'rgb(0, 0, 0, 0)';
              ctx.strokeStyle = 'white';
              ctx.lineWidth = 3;
              ctx.strokeRect(260, 180, 230, 175);
              ctx.fillStyle = 'rgb(20, 20, 20)';
              ctx.fillRect(260, 180, 230, 175);

              //text and image for revive
              ctx.drawImage(document.getElementById('heart'), 375-80/2-30, 200, 90, 90);
              ctx.font = '30px Arial';
              ctx.fillStyle = 'rgb(250, 250, 250)';
              ctx.fillText('Click to Revive', 375, 330);
              ctx.font = '40px Arial';
              ctx.fillText('+1', 420, 260);

              //loading bar
              ctx.lineWidth = 2;
              ctx.strokeStyle = 'black';
              ctx.strokeRect(260, 365, this.loadingBar_span, 20);
              ctx.fillStyle = 'rgb(250, 250, 250)';
              ctx.fillRect(260, 365, this.loadingBar_span, 20);
            }
          }
        break;
      case 3:         
          ctx.fillStyle = 'rgb(21, 21, 21)';
          ctx.fillRect(50, 50, 650, 540);
          //buttons
          this.shopB1.draw(ctx); 
          this.shopB2.draw(ctx);
          this.goBack.draw(ctx);

          //perk buttons
          this.scoreM.drawPerk(ctx, 1);
          this.pointsM.drawPerk(ctx, 2);
          this.perkM.drawPerk(ctx, 3);
          this.shipM.drawPerk(ctx, 4);
          this.morePerksM.drawPerk(ctx, 5);

          //items
          for(let i = 0; i < this.shopItems.length; i++) {
            this.shopItems[i].draw(ctx);
          }
          //points
          ctx.fillStyle = 'orange';
          ctx.font = '22px Arial';
          ctx.textAlign = 'left';
          ctx.fillText('Points Scored: ' + this.pointsScored,35, 60);
          ctx.fillText('Total Points: ' + this.totalPoints, 35, 100);

          //number of perks player can use at once
          ctx.textAlign = 'center';
          ctx.font = '20px Arial';
          ctx.fillText('Number of Perks usable', 610, 50);
          ctx.fillText('at once: ' + this.numOfPerks, 610, 75);
          //im using a random shop item because it changes
          ctx.fillText('Number of Perks using: ' + this.numOfUsingPerks, 610, 115);

          //have decorations in 3rd, 4th and 5th tab
          if(this.shopItems[0].tab === 3 || this.shopItems[0].tab === 4 || this.shopItems[0].tab === 5) {
            ctx.fillStyle = 'white';
            ctx.font = '28px Arial';
            if(this.shopItems[0].tab === 3) {
              ctx.fillText('Score Multiplier', 375, 220);
              ctx.fillText('Points Multiplier', 375, 446.5);
            }
            if(this.shopItems[0].tab === 4) {
              ctx.fillText('Ship Multiplier', 375, 220);
              ctx.fillText('Perk Multiplier', 375, 446.5);
            }
            if(this.shopItems[0].tab === 5) {
              ctx.font = '30px Arial';
              ctx.fillText('More Perks adder', 375, 230);
            }

            //line
            if(this.shopItems[0].tab === 5) {
              ctx.beginPath();
                ctx.roundRect(50, 420, 650, 1.5, 5);
                ctx.fillStyle = 'rgb(200, 200, 200)';
              ctx.fill();
            } else {
              ctx.beginPath();
                ctx.roundRect(50, 400, 650, 1.5, 5);
                ctx.fillStyle = 'rgb(200, 200, 200)';
              ctx.fill();
            }
          }
          //draw boxes around nesgted perks
          if(this.shopItems[0].tab === 3 || this.shopItems[0].tab === 4) {
            //line box for all of them
            ctx.strokeStyle = 'rgb(0, 0, 0, 0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(15, 240, 715, 140);
            ctx.strokeRect(15, 466.5, 715, 140);
          }
        break;
      case 4:
          //dark spots
          ctx.fillStyle = 'rgb(21, 21, 21)';
          ctx.fillRect(240, 50, 475, 100);
          ctx.fillRect(40, 230, 150, 120);

          //things for text
          ctx.fillStyle = 'white';
          ctx.textAlign = 'left';
          ctx.font = '30px Arial';

          //about game
          ctx.fillText('About Game', 25, 100);
          ctx.font = '25px Arial';
          ctx.fillText('You control a spaceship dodging astreoids', 25, 150);
          ctx.fillText('Survive as long as you can', 25, 190);

          //controls
          ctx.font = '30px Arial';
          ctx.fillText('Controls', 440, 220);
          ctx.font = '25px Arial';
          ctx.fillText('Use WASD or arrow keys to move left or right', 210, 270);
          ctx.fillText('Press Esc to pause and unpause game', 210, 310);
          ctx.fillText('Press BackSpace to quit or to go back to menu', 210, 350);

          //about shop
          ctx.font = '30px Arial';
          ctx.fillText('Shop', 25, 400);
          ctx.font = '25px Arial';
          ctx.fillText('Go to shop to earn diffrent spaceships and perks', 25, 450);
          ctx.fillText('You can only use a certain amount of perks before it maxes out', 25, 490);
          ctx.fillText('View descriptions for perks-', 25, 530);

          //lines to seperate text
          ctx.fillStyle = 'rgb(180, 180, 180)';
          ctx.fillRect(50, 220, 200, 1);
          ctx.fillRect(150, 390, 500, 1);

          //rectangle surrounding rocket
          ctx.fillRect(75, 240, 80, 120);
          ctx.fillStyle = 'rgb(20, 20, 20)';
          ctx.fillRect(76, 241, 78, 118);
          //image of defualt rocket
          ctx.drawImage(document.getElementById('defaultRocketShip'), 80, 247.5, 70, 105);

          //buttons
          this.description.draw(ctx);
          this.goBack2.draw(ctx);
        break;
      case 5:
          ctx.fillStyle = 'white';
          ctx.font = '45px Arial';
          ctx.textAlign = 'center';

          //shaded black areas
          ctx.fillStyle = 'rgb(21, 21, 21)';
          ctx.fillRect(50, 125, 175, 250);
          ctx.fillRect(525, 125, 175, 250);
          ctx.fillStyle = 'white';


          //title for developers
          ctx.fillRect(120, 84, 507, 4);
          ctx.fillStyle = 'rgb(20, 20, 20)';
          ctx.fillRect(167, 60, 418, 50);
          ctx.fillStyle = 'white';
          ctx.fillText('Developers of Game', 375, 100);
          
          //developers
          ctx.font = '32px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('Programmer: Rodrigo', 375, 170);
          ctx.fillText('Owner: Rodrigo', 375, 215);
          ctx.fillText('Pixel Artist: Rodrigo', 375, 260);
          ctx.fillText('Game Designer: Junior', 375, 305);
          ctx.fillText('Game Tester: Broderick', 375, 350);

          //line
          ctx.fillStyle = 'rgb(180, 180, 180)';
          ctx.fillRect(100, 400, 550, 1);

          //official release date
          ctx.fillStyle = 'white';
          ctx.font = '30px Arial';
          ctx.fillText('-Official Release Date-', 375, 450);
          ctx.font = '25px Arial';
          ctx.fillText('September 5, 2023', 375, 500);

          //small line
          ctx.fillStyle = 'rgb(180, 180, 180)';
          ctx.fillRect(275, 520, 200, 1);

          //Beta release date
          ctx.fillStyle = 'white';
          ctx.font = '30px Arial';
          ctx.fillText('-Pre-Alpha Version-', 375, 565);

          this.goBack3.draw(ctx);

          //sideways text for go Back button
          this.y + this.h/2 + parseFloat(this.fontSize) * 0.7 / 2
          ctx.translate(this.goBack3.x+this.goBack3.w/2 - 6, this.goBack3.y+this.goBack3.h/2);
          ctx.rotate(1 * Math.PI / 2);
          ctx.font = '20px black Times New Roman';
          ctx.fillText('Back to Menu', 0, 0);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        break;
      case 6:
          //text stuff
          ctx.textAlign = 'center';
          ctx.fillStyle = 'white';

          //box for the text
          ctx.fillRect(25, 25, 300, 100);
          ctx.fillRect(340, 25, 401, 75);
          ctx.fillRect(340, 115, 401, 90);
          ctx.fillRect(25, 140, 300, 100);
          ctx.fillRect(340, 220, 401, 75);
          ctx.fillRect(25, 255, 300, 80);
          ctx.fillRect(25, 350, 300, 75);
          ctx.fillRect(25, 440, 300, 80);
          ctx.fillRect(340, 310, 401, 75);
          ctx.fillRect(340, 400, 401, 75);
          ctx.fillRect(340, 490, 401, 100);
          ctx.fillRect(25, 535, 300, 95);
          
          //hollow out box for text
          ctx.fillStyle = 'rgb(20, 20, 20)';
          ctx.fillRect(26, 26, 298, 98);
          ctx.fillRect(341, 26, 399, 73);
          ctx.fillRect(341, 116, 399, 88);
          ctx.fillRect(26, 141, 298, 98);
          ctx.fillRect(341, 221, 399, 73);
          ctx.fillRect(26, 256, 298, 78);
          ctx.fillRect(26, 351, 298, 73);
          ctx.fillRect(26, 441, 298, 78);
          ctx.fillRect(341, 311, 399, 73);
          ctx.fillRect(341, 401, 399, 73);
          ctx.fillRect(341, 491, 399, 98);
          ctx.fillRect(26, 536, 298, 93);

          //titels for descriptions
          ctx.fillStyle = 'white';
          ctx.font = '30px Arial';
          ctx.fillText('Revive', 175, 60);
          ctx.fillText('Score Multiplier', 540, 150);
          ctx.fillText('Points Multiplier', 540, 60);
          ctx.fillText('Immunity', 175, 175);
          ctx.fillText('Less Meteors', 540, 255);
          ctx.fillText('Smaller Meteors', 175, 290);
          ctx.fillText('Slower Meteors', 175, 385);
          ctx.fillText('Smaller Player', 175, 475);
          ctx.fillText('Faster Player', 540, 345);
          ctx.fillText('More Perks', 540, 435);
          ctx.fillText('Cheaper Spaceships', 540, 525);
          ctx.fillText('Cheaper Perks', 175, 570);

          //descriptions
          ctx.font = '22px Arial';
          //revive
          ctx.fillText('Gives you the option to revive', 175, 90);
          ctx.fillText('whenever you die', 175, 110);
          //score multiplier
          ctx.fillText('Multiplies your points by a certain amount', 540, 85);
          //points multiplier
          ctx.fillText('Decreases the amount of time to get', 540, 175);
          ctx.fillText('1 score by a certain amount', 540, 195);
          //immunity
          ctx.fillText('Gives you immunity for 15s', 175, 205);
          ctx.fillText('whenever you press shift', 175, 225);
          //less meteors
          ctx.fillText('Decrease the overall amount of meteors', 540, 280);
          //smaller meteors
          ctx.fillText('Decrease the size of meteors', 175, 320);
          //slower meteors
          ctx.fillText('Decrease the speed of meteors', 175, 410, 290);
          //smaller player
          ctx.fillText('Makes the spaceship smaller', 175, 505);
          //faster player
          ctx.fillText('Makes the spaceship move faster', 540, 370);
          //more perks
          ctx.fillText('Lets you use more perks at once', 540, 460);
          //cheaper spaceships
          ctx.fillText('Decreases the price of spaceships', 540, 555);
          ctx.fillText('by a certain amount', 540, 575);
          //cheaper perks
          ctx.fillText('Decrease the price of perks', 175, 595);
          ctx.fillText('by a certain amount', 175, 615);

          this.goBack4.draw(ctx);
        break;
    }
  }
}