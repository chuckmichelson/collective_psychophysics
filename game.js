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
  state = createGameState();
  console.log(state.players)
  // state = ouijaGoToLetter(state, 'C');
  return state;
}

function createGameState() {
  console.log("made it to createGameState")

//   return {
//     numPlayers: 1,
//     players: [{ x : 0, y : 0 }],
//     planchette: {
//       pos: {
//         x: 100,
//         y: 100,
//       }
//     },
//     letters: {},
//   };
// }

  return {
    players : {
      x : [0],
      y : [0],
    },
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

  // numPlayers = Object.keys([state['AAAAA'].players]).length;
  // console.log("add player numPlayers: " + state.numPlayers)  // state.players[size + 1] = { x: 0, y: 0 };
  // state.players[numPlayers + 1] = {};
  // state.players[numPlayers + 1] = { x : 0, y : 0 };
  // state.players.push([ { x : 0, y : 0 } ]);
  console.log([state.players] == undefined);
  numPlayers = [state.players.x].length;
  console.log("addPlayer numPlayers (before push): " + numPlayers);
  // [state.players].push({ x : 0, y : 0 });
  [state.players].x.push([0]);
  [state.players].y.push([0]);
  numPlayers = [state.players.x].length;
  console.log("addPlayer numPlayers (after push): " + numPlayers);
  // state.players[String(state.numPlayers)].x = 0;
  // state.players[String(state.numPlayers)].y = 0;
  // numPlayers = Object.keys([state.players]).length;
  // console.log("add player numPlayers: " + state.numPlayers)  // state.players[size + 1] = { x: 0, y: 0 };

  // for (let i = 0; i < numPlayers; i++) {
  //   console.log("x vel of player " + i + " : " + state.players[i].x)
  // }
  // return state;

}

function gameLoop(state) {
  console.log("made it to gameLoop")
  if (!state) {
    return;
  }

  // decision rule
  numPlayers = [state.players].length;
  console.log("decision rule numPlayers: " + numPlayers)
  for (let i = 0; i < numPlayers; i++) {
    // console.log("index: " + i)
    console.log("state.players.x[i]: " + state.players.x[i])
    if (state.players.x[i] === 1 ) {
      console.log("RIGHT")
      state.planchette.pos.x += 3;
    }
    if (state.players.x[i] === -1 ) {
      console.log("LEFT")
      state.planchette.pos.x += -3;
    }
    if (state.players.y[i] === 1 ) {
      console.log("DOWN")
      state.planchette.pos.y += 3;
    }
    if (state.players.y[i] === -1 ) {
      console.log("UP")
      state.planchette.pos.y += -3;
    }
  }

  // keep the planchette on the board
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

  console.log("state.planchette.pos.x: " + state.planchette.pos.x)
  console.log("state.planchette.pos.y: " + state.planchette.pos.y)


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
      // console.log("SPACE BAR")
      return { x: 0, y: 0 };
    }
    case 37: { // left
      // console.log("LEFT")
      return { x: -1, y: 0 };
    }
    case 38: { // down
      // console.log("UP")
      return { x: 0, y: -1 };
    }
    case 39: { // right
      // console.log("RIGHT")
      return { x: 1, y: 0 };
    }
    case 40: { // up
      // console.log("DOWN")
      return { x: 0, y: 1 };
    }
  }
}



