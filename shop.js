import { collisionDetection } from './collide.js';
//save file
import { savePoints, saveShips, savePerks, savePerkItems, saveSpaceShipItem } from './save.js';

let canvas = document.getElementById('screen');
let rect = canvas.getBoundingClientRect();

export default class Shop  {
  constructor(game, type, x, y, Iw, Ih, cost, item, nestedPerkType) {
    //what tab its in
    this.tab = 1; this.type = type;
    //the item
    this.item = item;
    //dimensions
    this.x = x; this.y = y;
    this.w = 85; this.h = 120;
    this.Iw = Iw; this.Ih = Ih;
    //cost and text
    this.cost = cost;
    this.originalCost = cost;
    this.text = this.cost + ' Points';
    //if player bought it
    this.buy = true; 
    //if bought (for ships)
    this.boughtShip = false; 

    //center for text in 2nd tab
    this.centeredTextX = this.x+this.w/2;
    //if bought and using perk
    this.boughtPerk = false;
    this.usingPerk = false;
    this.cheaperPerks = false;
    //change state of perk
    this.changeStateOfPerk = false;
    this.changingStateOfPerk = 0;
    //add and subtract total num of using perk
    this.addedPerk = false;
    this.subtractedPerk = false;
  
    //check if player has reached max amount of perks
    this.ifReachedMaxAmountOfPerks = false;
    //alert player that it has reached max amount of points
    this.alertPlayer = false;
    this.incrementTimeToAlertPlayer = 0;
    this.playerAlertMorePerks = false;
    this.playerAlertPerksMore = false;
    this.dontResetNestedPerks = false;
    this.dontAlertPlayer = false;
    this.alertPlayerOnOne = false;
    //alert player that its too poor to buy item
    this.playerTooPoor = false;
    this.specifiedItemForAlert = '';

    //check if player is in a nested perk
    this.nestedPerkType = nestedPerkType || 0;

    //save file for player to automatically have some perks and spaceships turned on
    this.shopPerkItemSave = 0;
    this.shopSpaceShipItemSave = false;

    //solve bug that happens whenever I click butotn and it shows confirm function
    this.button = false;

    //game
    this.game = game;
  }

  update() {
    //save file for space ships
    if(JSON.parse(localStorage.getItem('savedShipsFM')) !== null) {
      this.game.savedSpaceShips = JSON.parse(localStorage.getItem('savedShipsFM'));
      for(let i = 0; i < this.game.savedSpaceShips.length; i++) {
        if(this.item === this.game.savedSpaceShips[i]) {
          this.cost = 0;
        }
      }
    }

    //save file for perks
    if(JSON.parse(localStorage.getItem('savedPerksFM')) !== null) {
      this.game.savedPerks = JSON.parse(localStorage.getItem('savedPerksFM'));
      for(let i = 0; i < this.game.savedPerks.length; i++) {
        if(this.item === this.game.savedPerks[i]) {
          this.cost = 0;
        }
      }
    }

    //save file to save if perks are turned on
    if(this.shopPerkItemSave === 1) {
      savePerkItems(this.game, this.item, 1);
      this.shopPerkItemSave = 0;
    }
    if(this.shopPerkItemSave === 2) {
      savePerkItems(this.game, this.item, 2);
      this.shopPerkItemSave = 0;
    }

    //save file to save if spaceships are turned on
    if(this.shopSpaceShipItemSave) {
      saveSpaceShipItem(this.game, this.item);
      this.shopSpaceShipItemSave = false;
    }

    //check if item is in use, owned or not sold or a multiplier
    if(this.cost === 0) {
      if(this.type === 1) {
        this.boughtShip = true;
      } else {
        this.boughtPerk = true;
      }
    }
    if(this.boughtShip && this.game.Player.ship !== this.item && !this.multiplier|| this.boughtPerk && !this.usingPerk) {
      this.text ='Owned';
    } else if(this.boughtShip && this.game.Player.ship === this.item && !this.multiplier && this.tab === 1|| this.usingPerk) {
      this.text = 'In Use';
    } else {
      this.text = this.cost + ' Points';
    }

    //change cost if player has a decreased cost
    if(this.cost === this.originalCost && this.game.decreasedSpaceshipCost !== 1 || this.cost === this.originalCost && this.game.decreasedPerkCost !== 1) {
      if(this.tab === 1) { 
        this.cost = this.cost * this.game.decreasedSpaceshipCost; 
      } else if(this.tab >= 2) { 
        this.cost = this.cost * this.game.decreasedPerkCost;
       }
    }

    //turn variable on if player bought cheaper perks
    if(this.tab === 4 && this.item > 25 && this.usingPerk) {
      this.cheaperPerks = true;
    }
    if(this.tab === 4 && this.item > 25 && this.boughtPerk && !this.usingPerk && this.cheaperPerks !== false) {
      this.cheaperPerks = false;
    }

    //make confirm function appear and dissapear
    if(!this.buy) {
      this.buy = true;
    }
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(collisionDetection(1, x, y, this) && this.game.gamestate === 3 && !this.button && this.type === this.tab){
        //activate thing if clicked and bought for first tab
        if(this.boughtShip && this.tab === 1) {
          this.game.Player.ship = this.item;
          this.shopSpaceShipItemSave = true;
          this.game.centerPlayer = false;
        }

        //check if player is clicking on perk that will give more perk s than available
        if(this.item - 28 < this.game.numOfUsingPerks && this.tab === 5) {
          this.dontResetNestedPerks = true;
        } else { this.dontResetNestedPerks = false; }

        //activate perk if clicked and bought for second tab or more
        if(this.boughtPerk && this.tab >= 2 && this.type === this.tab) {

          //make it so theres only one perk on in a nested perk
          if(this.tab === 3 && this.nestedPerkType === 1) {
            for(let i = 11; i < 16; i++) {
              this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].changingStateOfPerk = 0;
            }
          }
          if(this.tab === 3 && this.nestedPerkType === 0) {
            for(let i = 16; i < 21; i++) {
              this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].changingStateOfPerk = 0;
            }
          }
          if(this.tab === 4 && this.nestedPerkType === 1) {
            for(let i = 21; i < 26; i++) {
              this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].changingStateOfPerk = 2;
            }
          }
          if(this.tab === 4 && this.nestedPerkType === 0) {
            for(let i = 26; i < 31; i++) {
              this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].changingStateOfPerk = 2;
            }
          }
          if(this.tab === 5 && !this.dontResetNestedPerks) {
            for(let i = 32; i < 41; i++) {
              this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].changingStateOfPerk = 2;
            }
          }

          //change state of perk for second tab
          //add if using perk
          if(this.tab === 2) {
            this.changeStateOfPerk = true;
          } else if(this.game.numOfUsingPerks !== this.game.numOfPerks || this.usingPerk) { 
            //check if player is decreasing amount of perks even though they have more than enough perks
            this.changingStateOfPerk = 1;
           } else { this.subtractedPerk = true; }

           //turn on nested perks
          if(this.tab > 2 && this.tab !== 5 && this.game.numOfUsingPerks === this.game.numOfPerks && !this.usingPerk) {
            for(let w = 11; w < 16; w++) {
              if(this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === w; })].usingPerk && this.nestedPerkType === 1 && this.type === 3) {
                this.dontAlertPlayer = true; 
                this.changingStateOfPerk = 1;
              } else { this.dontAlertPlayer = false; }
            }
            for(let x = 16; x < 21; x++) {
              if(this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === x; })].usingPerk && this.nestedPerkType === 0 && this.type === 3) {
                this.dontAlertPlayer = true;
                this.changingStateOfPerk = 1;       
              } else { this.dontAlertPlayer = false; }
            }
            for(let y = 21; y < 26; y++) {
              if(this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === y; })].usingPerk && this.nestedPerkType === 1 && this.type === 4) {
                this.dontAlertPlayer = true; 
                this.changingStateOfPerk = 1;
              } else { this.dontAlertPlayer = false; }
            }
            for(let z = 26; z < 31; z++) {
              if(this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === z; })].usingPerk && this.nestedPerkType === 0 && this.type === 4) {
                this.dontAlertPlayer = true;
                this.changingStateOfPerk = 1;
              } else { this.dontAlertPlayer = false; }
            }
          }

          //turn nested perk off if player has max num of perks
          if(this.game.numOfUsingPerks === this.game.numOfPerks && !this.boughtPerk && !this.usingPerk) {
            this.changingStateOfPerk = 0;
          }

          //change state, ONLY for nested perks and if its on
          if(this.tab > 2 && this.usingPerk) {
            if(this.tab === 5 && this.game.numOfUsingPerks > 3) { this.playerAlertMorePerks = true; } else {
              this.changeStateOfPerk = true; this.incrementTimeToAlertPlayer = 0;
            }
          }
          //turn on perks in 5th tab
          if(this.tab === 5 && this.game.numOfUsingPerks <= this.item - 28 && this.boughtPerk && !this.usingPerk) {
            this.changingStateOfPerk = 1;
          }

          //check if player is clicking on perk that will give more perks than available
          if(this.item - 28 < this.game.numOfUsingPerks && this.tab === 5) {
            this.changingStateOfPerk = 0; this.subtractedPerk = true;
          }

          //so if I click on it again then call 'playerAlertPerksMore'
          if(this.item - 28 < this.game.numOfUsingPerks && this.tab === 5 && this.boughtPerk && this.buy) {
            this.playerAlertPerksMore = true;
          }

          //turn 'ifReachedMax' on
          if(this.game.numOfUsingPerks === this.game.numOfPerks && this.boughtPerk && !this.usingPerk && this.tab >= 2) {
            this.ifReachedMaxAmountOfPerks = true;
          }
          //turn 'ifReachedMax' off
          if(this.game.numOfUsingPerks < this.game.numOfPerks || this.game.numOfUsingPerks === this.game.numOfPerks && this.tab > 2) {
            this.ifReachedMaxAmountOfPerks = false;  
          }
        }

        //call save file to save or delete perk items
        if(this.boughtPerk && !this.usingPerk) {
          //go thru extra steps and delete save data when player is in a nested perk
          if(this.tab === 3 && this.nestedPerkType === 1) {
            for(let i = 11; i < 16; i++) {
              //reason as to why code is so long is becuase find index finds the position of an item in an array based of of item value
              if(!this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].usingPerk && this.game.numOfUsingPerks === this.game.numOfPerks) {} else {
                this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].shopPerkItemSave = 2;
                this.shopPerkItemSave = 1;
              }
            }
          }
          if(this.tab === 3 && this.nestedPerkType === 0) {
            for(let i = 16; i < 21; i++) {
              if(!this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].usingPerk && this.game.numOfUsingPerks === this.game.numOfPerks) {} else {
                this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].shopPerkItemSave = 2;
                this.shopPerkItemSave = 1;
              }
            }
          }
          if(this.tab === 4 && this.nestedPerkType === 1) {
            for(let i = 21; i < 26; i++) {
              if(!this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].usingPerk && this.game.numOfUsingPerks === this.game.numOfPerks) {} else {
                this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].shopPerkItemSave = 2;
                this.shopPerkItemSave = 1;
              }
            }
          }
          if(this.tab === 4 && this.nestedPerkType === 0) {
            for(let i = 26; i < 31; i++) {
              if(!this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].usingPerk && this.game.numOfUsingPerks === this.game.numOfPerks) {} else {
                this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].shopPerkItemSave = 2;
                this.shopPerkItemSave = 1;
              }
            }
          }
          if(this.tab === 5 && !this.playerAlertPerksMore) {
            for(let i = 32; i < 41; i++) {
              if(this.item > 31 && this.item < 41 && this.item - 28 >= this.game.numOfUsingPerks) {
                this.game.shopItems[this.game.shopItems.findIndex((e) => { return e.item === i; })].shopPerkItemSave = 2;
                this.shopPerkItemSave = 1;
              }
            }
          }

          //turn on save file is player is NOT in a nested perk
          if(this.tab === 2 && this.game.numOfUsingPerks !== this.game.numOfPerks) { this.shopPerkItemSave = 1; }
        } else if(this.usingPerk) {
          if(this.tab === 5 && this.game.numOfUsingPerks > 3) {} else { 
            this.shopPerkItemSave = 2;
          }
        }

        //turn on variable to alert player
        if(!this.dontAlertPlayer && this.tab > 2 && this.tab !== 5) {
          this.alertPlayer = true;
          if(this.alertPlayerOnOne) {
            this.incrementTimeToAlertPlayer = 2;
          }
        } else if(this.tab === 2 || this.tab === 5) {
          this.alertPlayer = true;
          if(this.alertPlayerOnOne) {
            this.incrementTimeToAlertPlayer = 2;
          }
        }

        //turn off alert variable that alerts on one
        if(this.alertPlayerOnOne && this.game.numOfUsingPerks > this.game.numOfPerks) {
          this.alertPlayerOnOne = false;
          this.incrementTimeToAlertPlayer = 0;
        }

        //alert player that they are too poor
        if(this.cost > this.game.totalPoints) {
          this.playerTooPoor = true;
          if(this.type === 1) { this.specifiedItemForAlert = 'Space Ship'; } else { this.specifiedItemForAlert = 'Perk'; }
        }

        //buy item
        if(this.game.totalPoints >= this.cost && this.buy && !this.boughtShip && this.type === 1 && this.tab === 1 || this.game.totalPoints >= this.cost && this.buy && !this.boughtPerk && this.type === 2 && this.tab === 2 || this.game.totalPoints >= this.cost && this.buy && !this.boughtPerk && this.type === 3 && this.tab === 3 && !this.button || this.game.totalPoints >= this.cost && this.buy && !this.boughtPerk && this.type === 4 && this.tab === 4 && !this.button|| this.game.totalPoints >= this.cost && this.buy && !this.boughtPerk && this.type === 5 && this.tab === 5 && !this.button) {
          //ask if player is sure before buying
          if(confirm("Are you sure you want to buy this? \n This transaction cannot be reversed") === true) {
            //do the transaction
            this.game.totalPoints -= this.cost;
            savePoints(this.game);
            this.buy = false;
            if(this.type === 1) {
              this.boughtShip = true;
              saveShips(this.game, this.item);
            } else if(this.type >= 2) {
              this.boughtPerk = true;
              savePerks(this.game, this.item);
            }
          } else { this.buy = false; }
        }
      }
    });

    //change state of perk
    if(this.changeStateOfPerk && !this.ifReachedMaxAmountOfPerks) {
      this.changingStateOfPerk++;
      this.changeStateOfPerk = false;
    }

    //turn on perk
    if(this.changingStateOfPerk === 1) {
      this.usingPerk = true;
    }

    //turn off perk
    if(this.changingStateOfPerk === 2 || this.changingStateOfPerk === 0) {
      this.usingPerk = false; this.changingStateOfPerk = 0;
    }

    //add total num of using perks
    if(this.usingPerk && !this.addedPerk && this.game.numOfUsingPerks !== this.game.numOfPerks) {
      this.game.numOfUsingPerks++;
      this.addedPerk = true;
      this.subtractedPerk = false;
    }

    //subtract num of using perks
    if(this.boughtPerk && !this.usingPerk && !this.subtractedPerk && !this.ifReachedMaxAmountOfPerks) {
      this.game.numOfUsingPerks--;
      this.subtractedPerk = true;
      this.addedPerk = false;
    }

    //dont alert player about the nested perks
    if(!this.dontAlertPlayer && this.tab > 2 && this.tab !== 5 && this.game.numOfUsingPerks === this.game.numOfPerks) {
      this.dontAlertPlayer = true;
    }
    //alert player on when they click it once instead of 2
    if(this.boughtPerk && !this.usingPerk && this.incrementTimeToAlertPlayer === 0 && this.game.numOfUsingPerks === this.game.numOfPerks) {
      this.alertPlayerOnOne = true;
    }

    //increment time to alert player
    if(this.alertPlayer) {
      this.incrementTimeToAlertPlayer++;
      this.alertPlayer = false;
    }

     //alert player
     if(this.incrementTimeToAlertPlayer >= 2) {
       if(this.boughtPerk && !this.usingPerk && this.game.numOfUsingPerks === this.game.numOfPerks && this.tab !== 5 && this.tab === this.type) { 
         alert('You cannot use this perk because youre using the max number of usable perks \n Try turning off another perk or buying more perks');
      }
       this.incrementTimeToAlertPlayer = 1;
       if(this.alertPlayerOnOne) {
        this.alertPlayerOnOne = false;
       }
     }

    //alert player that they cannot decrease max num of perks
    if(this.playerAlertMorePerks) {
      alert('You cannot turn off this perk because you will have more perks on than usable \n Try turning off other perks to turn off this perk');
      this.playerAlertMorePerks = false;
     }
    //alet player that they cannot decrease max num of perks by turning on less max perks
    if(this.playerAlertPerksMore) {
      alert('You cannot turn on this perk because you will have more perks on than usable \n Try turning off other perks to turn on this perk');
      this.playerAlertPerksMore = false;
    }

    //alert player that they cannot buy this perk because they are too poor
    if(this.playerTooPoor) {
      alert('You do not have enough points to buy this ' + this.specifiedItemForAlert + ' \n Try coming back later when you have more points');
      this.playerTooPoor = false;
    }

    //return all buttons to false whenever I reach nested perks tab
    if(this.tab === 3 && this.button || this.tab === 4 && this.button || this.tab === 5 && this.button) {
      this.button = false;
    }

    //turn off nested perks perks
    for(let i = 0; i < this.game.shopItems.length; i++) {
      //turn off more perks
      if(this.tab === 5 && this.game.shopItems[i].usingPerk === false) {
        this.game.numOfPerks = 2;
      }
      //turn off 'decrease price of spaceships'
      if(this.tab === 4 && this.game.shopItems[i].usingPerk === false && this.cost !== this.originalCost) {
        this.game.decreasedSpaceshipCost = 1;
        if(this.type === 1) {
          this.cost = this.originalCost;
        }
      }

      //turn off 'decrease price of perks'
      if(this.tab === 4 && this.game.shopItems[i].usingPerk === false && this.cost !== this.originalCost && this.type !== 1 && this.game.shopItems[i].cheaperPerks) {
        this.game.decreasedPerkCost = 1;
        if(this.type !== 1) {
          this.cost = this.originalCost;
        }
      }

      for(let one = 11; one < 16; one++) {
        if(this.tab === 3 && this.item == one && this.usingPerk === false) {
          this.game.resetScoreTime = 100;
        }
      }
      for(let second = 16; second < 21; second++) {
        if(this.tab === 3 && this.item == second && this.usingPerk === false) {
          this.game.incrementingPoints = 1;
        }
      }
    }

    //make first item cost a whole number
    if(this.game.decreasedPerkCost === 0.7 && this.cost % 1 !== 0 && this.originalCost === 180) {
      this.cost = 126;
    }
    if(this.game.decreasedPerkCost === 0.7 && this.cost % 1 !== 0 && this.originalCost === 350) {
      this.cost = 245;
    }

     //save file to automatically have shop items turned on
     if(JSON.parse(localStorage.getItem('savedPerkItemsFM')) !== null) {
      this.game.savedPerkItems = JSON.parse(localStorage.getItem('savedPerkItemsFM'));
      for(let i = 0; i < this.game.savedPerkItems.length; i++) {
        if(this.item === this.game.savedPerkItems[i]) {
          this.changingStateOfPerk = 1;
          this.game.numOfUsingPerks = this.game.savedPerkItems.length;
        }
      }
    }
  }

  drawing(ctx) {
    //box and image
    ctx.fillStyle = 'rgb(180, 180, 180)';
    ctx.fillRect(this.x ,this.y, this.w, this.h);
    ctx.fillStyle = 'rgb(20, 20, 20)';
    ctx.fillRect(this.x+1, this.y+1, this.w-2, this.h-2);
    if(this.type === 1) {
      ctx.drawImage(document.getElementById(this.item), this.x + 42.5 - this.Iw/2, this.y + 42 - this.Ih/2, this.Iw, this.Ih);
    }
    //box for text
    ctx.fillStyle = 'rgb(180, 180, 180)';
    ctx.fillRect(this.x ,this.y+80, this.w, this.h-80);
    ctx.fillStyle = 'rgb(20, 20, 20)';
    ctx.fillRect(this.x+1, this.y+81, this.w-2, this.h-82);
    //text
    ctx.textAlign = 'center';
    ctx.font = '18px Arial';
    ctx.fillStyle = 'orange';
    if(this.item !== 20) {
      ctx.fillText(this.text, this.x + this.w/2, this.y+105);
    }
  }

  draw(ctx) {
    if(this.tab === 1 && this.type === 1) {
      this.drawing(ctx);
    }
    if(this.tab === 2 && this.type === 2) {
      //box and item inside it
      this.drawing(ctx);

      //text
      ctx.font = '22px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgb(250, 250, 250)';

      //text inside box
      switch(this.item) {
        case 1:
            ctx.fillText('Revive', this.centeredTextX, this.y+35);
            ctx.drawImage(document.getElementById('heart'), this.x+this.w/2-30/2, this.y+42.5, 30, 30);
          break;
        case 3:
            ctx.font = '19px Arial';
            ctx.fillText('Immunity', this.centeredTextX, this.y+35);
            ctx.font = '22px Arial';
            ctx.fillText('10s', this.centeredTextX, this.y+65);
          break;
        case 5:
            ctx.font = '20px Arial';
            ctx.fillText('Less', this.centeredTextX, this.y+35);
            ctx.fillText('Meteors', this.centeredTextX, this.y+60);
          break;
        case 6:
            ctx.font = '20px Arial';
            ctx.fillText('Smaller', this.centeredTextX, this.y+35);
            ctx.fillText('Meteors', this.centeredTextX, this.y+60);
          break;
        case 7:
            ctx.font = '19px Arial';
            ctx.fillText('Slower', this.centeredTextX, this.y+35);
            ctx.fillText('Meteors', this.centeredTextX, this. y+60);
          break;
        case 8:
            ctx.font = '21px Arial';
            ctx.fillText('Smaller', this.centeredTextX, this.y+35);
            ctx.fillText('Player', this.centeredTextX, this.y+60);
          break;
        case 9:
            ctx.fillText('Faster', this.centeredTextX, this.y+35);
            ctx.fillText('Player', this.centeredTextX, this.y+60);
          break;
      }
    }
    if(this.tab === 3 && this.type === 3) {
      this.drawing(ctx);
      //writting cost in becuase cost is too big to fit inside box
      if(this.item === 20) {
        ctx.font = '18px Arial';
        ctx.fillText(this.text, this.x + this.w / 2, this.y+105, this.w);
      }

      //text
      ctx.font = '22px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgb(250, 250, 250)';
      
      //text inside box
      switch(this.item) {
        case 11:
            ctx.fillText('Score', this.centeredTextX, this.y+35);
            ctx.fillText('1.2x', this.centeredTextX, this.y+60);
          break;
        case 12:
            ctx.fillText('Score', this.centeredTextX, this.y+35);
            ctx.fillText('1.4x', this.centeredTextX, this.y+60);
          break;
        case 13:
            ctx.fillText('Score', this.centeredTextX, this.y+35);
            ctx.fillText('1.6x', this.centeredTextX, this.y+60);
          break;
        case 14:
            ctx.fillText('Score', this.centeredTextX, this.y+35);
            ctx.fillText('1.8x', this.centeredTextX, this.y+60);
          break;
        case 15:
            ctx.fillText('Score', this.centeredTextX, this.y+35);
            ctx.fillText('2.0x', this.centeredTextX, this.y+60);
          break;
        //-----------------
        case 16:
            ctx.fillText('Points', this.centeredTextX, this.y+35);
            ctx.fillText('2.0x', this.centeredTextX, this.y+60);
          break;
        case 17:
            ctx.fillText('Points', this.centeredTextX, this.y+35);
            ctx.fillText('3.0x', this.centeredTextX, this.y+60);
          break;
        case 18:
            ctx.fillText('Points', this.centeredTextX, this.y+35);
            ctx.fillText('4.0x', this.centeredTextX, this.y+60);
          break;
        case 19:
            ctx.fillText('Points', this.centeredTextX, this.y+35);
            ctx.fillText('5.0x', this.centeredTextX, this.y+60);
          break;
        case 20:
            ctx.fillText('Points', this.centeredTextX, this.y+35);
            ctx.fillText('10.0x', this.centeredTextX, this.y+60);
          break;
      }
    }
    if(this.tab === 4 && this.type === 4) {
      this.drawing(ctx);

      //text
      ctx.font = '22px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgb(250, 250, 250)';

      //number multiplier
      switch(this.item) {
        case 21:
            ctx.font = '19px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.font = '15px Arial';
            ctx.fillText('Spaceships', this.centeredTextX, this.y+45);
            ctx.font = '21px Arial';
            ctx.fillText('-10%', this.centeredTextX, this.y+70);
          break;
        case 22:
            ctx.font = '19px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.font = '15px Arial';
            ctx.fillText('Spaceships', this.centeredTextX, this.y+45);
            ctx.font = '21px Arial';
            ctx.fillText('-20%', this.centeredTextX, this.y+70);
          break;
        case 23:
            ctx.font = '19px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.font = '15px Arial';
            ctx.fillText('Spaceships', this.centeredTextX, this.y+45);
            ctx.font = '21px Arial';
            ctx.fillText('-30%', this.centeredTextX, this.y+70);
          break;
        case 24:
            ctx.font = '19px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.font = '15px Arial';
            ctx.fillText('Spaceships', this.centeredTextX, this.y+45);
            ctx.font = '21px Arial';
            ctx.fillText('-40%', this.centeredTextX, this.y+70);
          break;
        case 25:
            ctx.font = '19px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.font = '15px Arial';
            ctx.fillText('Spaceships', this.centeredTextX, this.y+45);
            ctx.font = '21px Arial';
            ctx.fillText('-50%', this.centeredTextX, this.y+70);
          break;
        //-----------------
        case 26:
            ctx.font = '20px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.fillText('Perks', this.centeredTextX, this.y+50);
            ctx.font = '21px Arial';
            ctx.fillText('-10%', this.centeredTextX, this.y+72);
          break;
        case 27:
            ctx.font = '20px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.fillText('Perks', this.centeredTextX, this.y+50);
            ctx.font = '21px Arial';
            ctx.fillText('-20%', this.centeredTextX, this.y+72);
          break;
        case 28:
            ctx.font = '20px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.fillText('Perks', this.centeredTextX, this.y+50);
            ctx.font = '21px Arial';
            ctx.fillText('-30%', this.centeredTextX, this.y+72);
          break;
        case 29:
            ctx.font = '20px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.fillText('Perks', this.centeredTextX, this.y+50);
            ctx.font = '21px Arial';
            ctx.fillText('-40%', this.centeredTextX, this.y+72);
          break;
        case 30:
            ctx.font = '20px Arial';
            ctx.fillText('Cheaper', this.centeredTextX, this.y+25);
            ctx.fillText('Perks', this.centeredTextX, this.y+50);
            ctx.font = '21px Arial';
            ctx.fillText('-50%', this.centeredTextX, this.y+72);
          break;
      }
    }
    if(this.tab === 5 && this.type === 5) {
      this.drawing(ctx);

      ctx.fillStyle = 'white';
      ctx.font = '22px Arial';
      ctx.fillText('More', this.x+this.w/2, this.y+28);
      ctx.fillText('Perks', this.x+this.w/2, this.y+53);

      //text for specific ones
      switch(this.item) {
        case 31:
            ctx.fillText('+3', this.x+this.w/2-2, this.y+75);
          break;
        case 32:
        ctx.fillText('+4', this.x+this.w/2-2, this.y+75);
          break;
        case 33:
        ctx.fillText('+5', this.x+this.w/2-2, this.y+75);
          break;
        case 34:
        ctx.fillText('+6', this.x+this.w/2-2, this.y+75);
          break;
        case 35:
        ctx.fillText('+7', this.x+this.w/2-2, this.y+75);
          break;
        case 36:
        ctx.fillText('+8', this.x+this.w/2-2, this.y+75);
          break;
        case 37:
        ctx.fillText('+9', this.x+this.w/2-2, this.y+75);
          break;
        case 38:
        ctx.fillText('+10', this.x+this.w/2-2, this.y+75);
          break;
        case 39:
        ctx.fillText('+11', this.x+this.w/2-2, this.y+75);
          break;
        case 40:
        ctx.fillText('+12', this.x+this.w/2-2, this.y+75);
          break;
      }
    }
  }
}