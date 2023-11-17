export function saveScore(game) {
  game.highScore = game.Score;
  localStorage.setItem('savedScoreFM', JSON.stringify(game.Score));
}

export function savePoints(game) {
  game.totalPoints += game.pointsScored;
  game.totalPoints = game.totalPoints;
  localStorage.setItem('savedPointFM', JSON.stringify(game.totalPoints));
}

export function saveShips(game, item) {
  game.savedSpaceShips.push(item);
  localStorage.setItem('savedShipsFM', JSON.stringify(game.savedSpaceShips));
}

export function savePerks(game, item) {
  game.savedPerks.push(item);
  localStorage.setItem('savedPerksFM', JSON.stringify(game.savedPerks));
}

export function savePerkItems(game, item, changeState) {
  if(changeState === 1 && game.savedPerkItems.includes(item) === false) {
    game.savedPerkItems.push(item);
  } else if(changeState === 2 && game.savedPerkItems.includes(item)) {
    game.savedPerkItems.splice(game.savedPerkItems.indexOf(item), 1);
  }
  //game.centerPlayer = false;
  localStorage.setItem('savedPerkItemsFM', JSON.stringify(game.savedPerkItems));
}

export function saveSpaceShipItem(game, item) {
  game.savedSpaceShipItem = item;
  localStorage.setItem('saveSpaceShipItemFM', JSON.stringify(game.savedSpaceShipItem));
}

export function fullScreen(game, state) {
  game.refresh = state;
  localStorage.setItem('refreshScreenFM', JSON.stringify(game.refresh));
}

export function saveScene(game, trueFalse, shop) {
  localStorage.setItem('saveRefreshSceneFM', JSON.stringify([game.gamestate, trueFalse, shop]));
}

export function saveEarnedPoints(game) {
  localStorage.setItem('saveEarnedPointsFM', JSON.stringify(game.pointsScored));
}