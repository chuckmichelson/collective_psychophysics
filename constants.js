const FRAME_RATE = 10;
const CANVAS_WIDTH = 612;
const CANVAS_HEIGHT = 512;
const PLANCHETTE_WIDTH = 120;
const PLANCHETTE_HEIGHT = 120;
const MAX_PLAYERS_PER_ROOM = 100;
const AGREE_DURATION = 3000;
const STIMULI_DISTANCE = 180;

const CTR_POS_X = 256;
const CTR_POS_Y = 256;

const STIMULI = {
  0 : {
    category : 'animals', target_name : 'elephant',
    image_path: 'images/animal_000.jpg',
    x : 296, y : 236,
    },
  1 : {
    category : 'animals', target_name : 'squirrel',
    image_path: 'images/animal_001.jpg',
    x : 196, y : 126,
    },
  2 : {
    category : 'animals', target_name : 'bird',
    image_path: 'images/animal_002.jpg',
    x : 366, y : 176,
    },
}
// const CLOCK_POSITIONS = {
//     0 : {letter : '0', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(90  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(90  * (Math.PI / 180)) },
//     1 : {letter : '1', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(60  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(60  * (Math.PI / 180)) },
//     2 : {letter : '2', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(30  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(30  * (Math.PI / 180)) },
//     3 : {letter : '3', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(0  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(0  * (Math.PI / 180)) },
//     4 : {letter : '4', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-30  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(-30  * (Math.PI / 180)) },
//     5 : {letter : '5', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-60  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(-60  * (Math.PI / 180)) },
//     6 : {letter : '6', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-90  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(-90  * (Math.PI / 180)) },
//     7 : {letter : '7', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-120  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(-120  * (Math.PI / 180)) },
//     8 : {letter : '8', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-150  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(-150  * (Math.PI / 180)) },
//     9 : {letter : '9', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-180  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(-180  * (Math.PI / 180)) },
//     10 : {letter : '10', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-210  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(-210  * (Math.PI / 180)) },
//     11 : {letter : '11', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(-240  * (Math.PI / 180)), y : CTR_POS_Y - STIMULI_DISTANCE * Math.sin(-240  * (Math.PI / 180)) },
// }
// const CLOCK_POSITIONS = {
//     0 : {letter : '0', x : CTR_POS_X + STIMULI_DISTANCE * Math.cos(0 * (Math.PI / 180)), y : CTR_POS_Y - 0 },
// }


module.exports = {
  FRAME_RATE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLANCHETTE_WIDTH,
  PLANCHETTE_HEIGHT,
  MAX_PLAYERS_PER_ROOM,
  // CLOCK_POSITIONS,
  AGREE_DURATION,
  STIMULI,
}
