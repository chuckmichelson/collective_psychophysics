// const { FRAME_RATE } = require('./constants');
// const { CANVAS_WIDTH } = require('./constants');
// const { CANVAS_HEIGHT } = require('./constants');
// const { PLANCHETTE_WIDTH } = require('./constants');
// const { PLANCHETTE_HEIGHT } = require('./constants');

const FRAME_RATE = 20;
const CANVAS_WIDTH = 838;
const CANVAS_HEIGHT = 554;
const PLANCHETTE_WIDTH = 120;
const PLANCHETTE_HEIGHT = 120;

const { makeid } = require('./utils');
const { ouijaGoToLetter } = require('./utils');
const { ouijaGetLetter } = require('./utils');


module.exports = {
  initGame,
  addPlayer,
  gameLoop,
  getUpdatedVelocity,
}


// state = initGame()

function initGame() {
  console.log("made it to initGame()")
  var state = createGameState();
  state = ouijaGoToLetter(state, 'C');
  return state;
}

function createGameState() {
  console.log("made it to createGameState")

var alerts = {
    1: {app:'helloworld',message:'message'},
    2: {app:'helloagain',message:'another message'}
}

  return {
    players: { 1: { x : 0, y : 0} },
    planchette: {
      pos: {
        x: 100,
        y: 100,
      }
    },
    letters: {},
  };
}

function addPlayer(state) {
  console.log("made it to addPlayer ****************************")
  size = Object.keys([state.players]).length
  console.log("add player size: " + size)  // state.players[size + 1] = { x: 0, y: 0 };
  state.players[size + 1] = {};
  state.players[size + 1].x = 0;
  state.players[size + 1].y = 0;

  // for (let i = 0; i < size; i++) {
  //   console.log("x vel of player " + i + " : " + state.players[i].vel.x)
  // }
  return state;

}

function gameLoop(state) {
  // console.log("made it to gameLoop")
  // console.log(state.planchette.pos.x)
  if (!state) {
    return;
  }

  // decision rule
  size = Object.keys([state.players]).length
  console.log("decision rule size: " + size)
  for (let i = 0; i < size; i++) {
    if (state.players[i+1].x === 1 ) {
      state.planchette.pos.x += 3;
    }
    if (state.players[i+1].x === -1 ) {
      state.planchette.pos.x += -3;
    }
    if (state.players[i+1].y === 1 ) {
      state.planchette.pos.y += 3;
    }
    if (state.players[i+1].y === -1 ) {
      state.planchette.pos.y += -3;
    }
  }

  if (state.planchette.pos.x < 0 + PLANCHETTE_WIDTH / 2) {
    state.planchette.pos.x = 0 + PLANCHETTE_WIDTH / 2;
  }
  if (state.planchette.pos.x > CANVAS_WIDTH - PLANCHETTE_WIDTH / 2) {
    state.planchette.pos.x = CANVAS_WIDTH - PLANCHETTE_WIDTH / 2;
  }
  if (state.planchette.pos.y < 0 + PLANCHETTE_WIDTH / 2) {
    state.planchette.pos.y = 0 + PLANCHETTE_WIDTH / 2;
  }
  if (state.planchette.pos.y > CANVAS_HEIGHT - PLANCHETTE_WIDTH / 2) {
    state.planchette.pos.y = CANVAS_HEIGHT - PLANCHETTE_WIDTH / 2;
  }

  var letter = ouijaGetLetter(state);

  if (letter === undefined || letter === '') {
    // do nothing
  } else {
    // console.log("It's a letter! Specifically, " + letter)
    state.letters += letter;
  }


  return false;
}


function getUpdatedVelocity(keyCode) {
  console.log("made it to getUpdatedVelocity()")
  switch (keyCode) {
    case 32: { // space bar
      return { x: 0, y: 0 };
    }
    case 37: { // left
      return { x: -1, y: 0 };
    }
    case 38: { // down
      return { x: 0, y: -1 };
    }
    case 39: { // right
      return { x: 1, y: 0 };
    }
    case 40: { // up
      return { x: 0, y: 1 };
    }
  }
}



