const FRAME_RATE = 20;
const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;
const PLANCHETTE_WIDTH = 120;
const PLANCHETTE_HEIGHT = 120;
const MAX_PLAYERS_PER_ROOM = 100;
const AGREE_DURATION = 3000;
const STIMULI_DISTANCE = 120;

const CTR_POS_X = CANVAS_WIDTH / 2;
const CTR_POS_Y = CANVAS_HEIGHT / 2;

const CLOCK_POSITIONS = {
    1 : {letter : 'clock_pos_1', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(60), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(60) },
    2 : {letter : 'clock_pos_2', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(30), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(30) },
    3 : {letter : 'clock_pos_3', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(0), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(0) },
    4 : {letter : 'clock_pos_4', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-30), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(-30) },
    5 : {letter : 'clock_pos_5', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-60), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(-60) },
    6 : {letter : 'clock_pos_6', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-90), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(-90) },
    7 : {letter : 'clock_pos_7', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-120), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(-120) },
    8 : {letter : 'clock_pos_8', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-150), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(-150) },
    9 : {letter : 'clock_pos_9', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-180), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(-180) },
    10 : {letter : 'clock_pos_10', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-210), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(-210) },
    11 : {letter : 'clock_pos_11', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-240), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(-240) },
    12 : {letter : 'clock_pos_11', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-270), y : CTR_POS_Y + STIMULI_DISTANCE * Math.sin(-270) },
}



module.exports = {
  FRAME_RATE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLANCHETTE_WIDTH,
  PLANCHETTE_HEIGHT,
  MAX_PLAYERS_PER_ROOM,
  CLOCK_POSITIONS,
  AGREE_DURATION,
}
