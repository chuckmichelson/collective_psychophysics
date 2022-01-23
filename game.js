const { FRAME_RATE } = require('./constants');
const { CANVAS_WIDTH } = require('./constants');
const { CANVAS_HEIGHT } = require('./constants');
const { PLANCHETTE_WIDTH } = require('./constants');
const { PLANCHETTE_HEIGHT } = require('./constants');
const { MAX_PLAYERS_PER_ROOM } = require('./constants');
const { AGREE_DURATION } = require('./constants');
const { ANIMALS } = require('./constants');
const { DESKS } = require('./constants');
const { CHARITIES } = require('./constants');
const { NUM_ANIMALS } = require('./constants');
const { NUM_DESKS } = require('./constants');
const { NUM_CHARITIES } = require('./constants');
const { BLUR } = require('./constants');
const { DOLLAR_WIDTH } = require('./constants');
const { DOLLAR_HEIGHT } = require('./constants');





const { makeid } = require('./utils');
const { ouijaGoToLetter } = require('./utils');
const { ouijaGetLetter } = require('./utils');

module.exports = {
  initGame,
  addPlayer,
  gameLoop,
  getUpdatedVelocity,
}

function initGame() {
  console.log("made it to initGame()")
  state = createGameState();
  state.current_game_active = true;
  state = makeTrial(state);
  // state = ouijaGoToLetter(state, '5');
  start = 0;
  return state;
}

function createGameState() {
  return {
    current_game_active: false,
    level_num: 1,
    trial_num: 1,
    stimIndices: [],
    is_bonus_round: false,
    showThankYouPage: false,
    numSpirits: 1,
    x: Array(100).fill(0),
    y: Array(100).fill(0),
    planchette: {
      pos: {
        x: 256,
        y: 256,
      }
    },
    target: {
      pos: {
        x: 0,
        y: 0,
      }
    },
    dollar: {
      pos: {
        x: CANVAS_WIDTH / 2,
        y: 320,
      },
      picked_up: false,
      put_down: false,
    },
    previous_letter: '_',
    current_letter: '_',
    agreed_letters: '1',
    current_trial: {},
    agreed_charity: '',
    triggerNewTrial: false,
  };
}


function addPlayer(state) {
  state.numSpirits += 1;
  console.log(state.numSpirits)
}

function gameLoop(state) {

  if (!state) {
    return;
  }

  // update levels
  if (state.agreed_letters.substr(state.agreed_letters.length - 1) == '1') {
    state.agreed_letters = '_';
    if (state.trial_num > 4) {
      state.trial_num = 1;
      state.level_num += 1;
      if (state.level_num > 2) {
        state.is_bonus_round = true;
      }
    }
    if (state.trial_num == 1) {
      state = makeTrialList(state);
    }
    state = makeTrial(state);
    state.trial_num += 1;
  }
  if (state.agreed_letters.substr(state.agreed_letters.length - 1) == 'C') {
    // console.log(state.agreed_charity)
    state.dollar.put_down = true;
  }


  // decision rule
  for (let i = 0; i < MAX_PLAYERS_PER_ROOM; i++) {
    // console.log("index: " + i)
    if (state.x[i] === 1 ) {
      // console.log("RIGHT")
      state.planchette.pos.x += 5;
    }
    if (state.x[i] === -1 ) {
      // console.log("LEFT")
      state.planchette.pos.x += -5;
    }
    if (state.y[i] === 1 ) {
      // console.log("DOWN")
      state.planchette.pos.y += 5;
    }
    if (state.y[i] === -1 ) {
      // console.log("UP")
      state.planchette.pos.y += -5;
    }

    // once we read the velocity, zero it out
    state.x[i] = 0;
    state.y[i] = 0;

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

  // read letter
  state.previous_letter = state.current_letter;
  state.current_letter = ouijaGetLetter(state);
  // console.log(state.current_letter)

  // run timer to determine agreed letter
  if (state.current_letter == '_') {
    start = Date.now();
  }
  if (state.current_letter != state.previous_letter) {
    start = Date.now();
  }
  if (Date.now() - start > AGREE_DURATION && state.current_letter != '_') {
    state.agreed_letters += state.current_letter;
    console.log("AGREED: " + state.agreed_letters)
    start = Date.now();
  }


  last_agreed = state.agreed_letters.substr(state.agreed_letters.length - 1);
  if(last_agreed == 'C') {
      state.showThankYouPage = true;
  }
  // reset all player velocities to 0 so the user must hold down the arrow keys
  state.x = Array(5).fill(0);
  state.y = Array(5).fill(0);


  if (state.is_bonus_round == true) {
    posx = state.planchette.pos.x;
    posy = state.planchette.pos.y;
    codx = state.dollar.pos.x;
    cody = state.dollar.pos.y;
    // console.log("posx: " + posx + "posy: " + posy + "codx: " + codx + "cody: " + cody)
    distance = Math.sqrt(Math.pow(codx - posx, 2) + Math.pow(cody - posy, 2));
    // console.log(distance)
    if (distance < 15) {
      state.dollar.picked_up = true;
    }
    if (state.dollar.picked_up == true) {
      state.dollar.pos.x = state.planchette.pos.x;
      state.dollar.pos.y = state.planchette.pos.y;

    }
  }

  // return with no exit code
  return false;
}


function getUpdatedVelocity(keyCode) {
  // console.log("made it to getUpdatedVelocity()")
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


function makeTrialList(state) {
  // stimIndex = 8;
  console.log("made it to makeTrialList")
  if (state.level_num == 1) { // animals
    console.log("level 1")
    const array = Array.from({length: NUM_ANIMALS}, (_, index) => index);
    const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
    state.stimIndices = array.slice(0, 4);
    console.log(state.stimIndices)
    console.log(state.stimIndices[0])
  }
  if (state.level_num == 2) { // desks
    console.log("level 2")
    const array = Array.from({length: NUM_DESKS}, (_, index) => index);
    const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
    state.stimIndices = array.slice(0, 4);
    console.log(state.stimIndices)
    console.log(state.stimIndices[0])
  }
  return state;
}

function makeTrial(state) {
  console.log("made it to makeTrial")
  console.log(state.stimIndices)
  console.log(state.trial_num)
  console.log(state.stimIndices[state.trial_num - 1])
  if (state.level_num == 1) { // animals
    console.log("#level 1")
    state.current_trial.stimulus = ANIMALS[state.stimIndices[state.trial_num - 1]];
  }
  if (state.level_num == 2) { // desks
    state.current_trial.stimulus = DESKS[state.stimIndices[state.trial_num - 1]];
    console.log("#level 2")
  }
  state.current_trial.blur = BLUR[state.trial_num - 1];
  state.planchette.pos.x = Math.floor(Math.random() * CANVAS_WIDTH);
  state.planchette.pos.y = Math.floor(Math.random() * CANVAS_HEIGHT);
  state.triggerNewTrial = true;
  return state;
}
