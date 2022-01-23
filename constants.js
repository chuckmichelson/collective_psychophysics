const FRAME_RATE = 10;
const CANVAS_WIDTH = 612;
const CANVAS_HEIGHT = 400;
const PLANCHETTE_WIDTH = 120;
const PLANCHETTE_HEIGHT = 120;
const MAX_PLAYERS_PER_ROOM = 100;
const AGREE_DURATION = 1000;
const STIMULI_DISTANCE = 180;
const BLUR = [0, 8, 16, 32];
const NUM_STIMULI = 10;
const DOLLAR_WIDTH = 80;
const DOLLAR_HEIGHT = 38;
const NUM_ANIMALS = 9;
const NUM_DESKS = 8;
const NUM_CHARITIES = 5;

const CTR_POS_X = 256;
const CTR_POS_Y = 256;

const CHARITIES = {
  0 : {
    name: "Austin Pets Alive!",
    x : 195, y : 85,
    },
  1 : {
    name: "Hospice Austin",
    x : 455, y : 85,
    },
  2 : {
    name: "Keep Austin Beautiful",
    x : 145, y : 180,
    },
  3 : {
    name: "Shoal Creek Conservancy",
    x : 345, y : 180,
    },
  4 : {
    name: "Art From The Streets",
    x : 510, y : 180,
    },
}


const ANIMALS = {
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
  3 : {
    category : 'animals', target_name : 'fox',
    image_path: 'images/animal_003.jpg',
    x : 351, y : 201,
    },
  4 : {
    category : 'animals', target_name : 'deer',
    image_path: 'images/animal_004.jpg',
    x : 206, y : 241,
    },
  5 : {
    category : 'animals', target_name : 'owl',
    image_path: 'images/animal_005.jpg',
    x : 311, y : 226,
    },
  6 : {
    category : 'animals', target_name : 'buck',
    image_path: 'images/animal_006.jpg',
    x : 341, y : 216,
    },
  7 : {
    category : 'animals', target_name : 'bear',
    image_path: 'images/animal_007.jpg',
    x : 406, y : 226,
    },
  8 : {
    category : 'animals', target_name : 'orangutan',
    image_path: 'images/animal_008.jpg',
    x : 211, y : 156,
    },
}


const DESKS = {
  0 : {
    category : 'desks', target_name : 'calculator',
    image_path: 'images/desk_000.jpg',
    x : 235, y : 90,
    },
  1 : {
    category : 'desks', target_name : 'earbuds',
    image_path: 'images/desk_001.jpg',
    x : 365, y : 182,
    },
  2 : {
    category : 'desks', target_name : 'crumpled papers',
    image_path: 'images/desk_002.jpg',
    x : 283, y : 304,
    },
  3 : {
    category : 'desks', target_name : 'rubber band ball',
    image_path: 'images/desk_003.jpg',
    x : 492, y : 278,
    },
  4 : {
    category : 'desks', target_name : 'robot toy',
    image_path: 'images/desk_004.jpg',
    x : 552, y : 220,
    },
  5 : {
    category : 'desks', target_name : 'pile of paperclips',
    image_path: 'images/desk_005.jpg',
    x : 532, y : 245,
    },
  6 : {
    category : 'desks', target_name : 'broccoli',
    image_path: 'images/desk_006.jpg',
    x : 552, y : 340,
    },
  7 : {
    category : 'desks', target_name : 'cherry tomatos',
    image_path: 'images/desk_007.jpg',
    x : 355, y : 60,
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
  ANIMALS,
  NUM_ANIMALS,
  DESKS,
  NUM_DESKS,
  CHARITIES,
  NUM_CHARITIES,
  BLUR,
}
