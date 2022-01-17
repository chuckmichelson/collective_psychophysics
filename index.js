const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;
const PLANCHETTE_WIDTH = 120;
const PLANCHETTE_HEIGHT = 120;
const STIMULI_DISTANCE = 180;
const STIMULI_OFFSET = 12;

const CTR_POS_X = 256;
const CTR_POS_Y = 256;

const CLOCK_POSITIONS = {
    0 : {letter : '0', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(90  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(90  * (Math.PI / 180)) },
    1 : {letter : '1', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(60  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(60  * (Math.PI / 180)) },
    2 : {letter : '2', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(30  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(30  * (Math.PI / 180)) },
    3 : {letter : '3', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(0  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(0  * (Math.PI / 180)) },
    4 : {letter : '4', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(-30  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(-30  * (Math.PI / 180)) },
    5 : {letter : '5', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(-60  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(-60  * (Math.PI / 180)) },
    6 : {letter : '6', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(-90  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(-90  * (Math.PI / 180)) },
    7 : {letter : '7', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(-120  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(-120  * (Math.PI / 180)) },
    8 : {letter : '8', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(-150  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(-150  * (Math.PI / 180)) },
    9 : {letter : '9', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(-180  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(-180  * (Math.PI / 180)) },
    10 : {letter : '10', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(-210  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(-210  * (Math.PI / 180)) },
    11 : {letter : '11', x : CTR_POS_X - STIMULI_OFFSET + STIMULI_DISTANCE * Math.cos(-240  * (Math.PI / 180)), y : CTR_POS_Y + STIMULI_OFFSET - STIMULI_DISTANCE * Math.sin(-240  * (Math.PI / 180)) },
}

// ***** CHANGE THIS TO RUN ON HEROKU
const socket = io('http://localhost:3000');
// const socket = io('https://collective-psychophysics.herokuapp.com/');

socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('gameScore', handleScore);
socket.on('unknownCode', handleUnknownCode);

console.log("sockets on")

// const gameScreen = document.getElementById('gameScreen');
// const initialScreen = document.getElementById('initialScreen');
// const newGameBtn = document.getElementById('newGameButton');
// const joinGameBtn = document.getElementById('joinGameButton');
// const gameCodeInput = document.getElementById('gameCodeInput');
// const gameCodeDisplay = document.getElementById('gameCodeDisplay');
// const smokeBtn = document.getElementById('smokeBtn');
// const scoreDisplay = document.getElementById('scoreDisplay');

document.body.style.backgroundColor = "black";
// setTimeout(() => { collapseSplash(); joinGame();}, 2000);

// var btn = document.getElementById('blurBtn');
var img = document.getElementById('blurImg');
img.style.display = "none";



joinGame();

function collapseSplash() {
  var x = document.getElementById("myDIV");
  x.style.display = "none";
}


function setImageVisible(id, visible) {
    var img = document.getElementById(id);
    img.style.visibility = (visible ? 'visible' : 'hidden');
}


function newGame() {
  console.log("made it to NewGame")
  socket.emit('newGame');
}

function joinGame() {
  console.log("made it to joinGame")
  socket.emit('joinGame', 'AAAAA');
}


let playerNumber = 1;
let gameActive = false;


function init() {

  const layer1 = document.getElementById('layer1');
  const ctx1 = layer1.getContext('2d');
  layer1.height = 512;
  layer1.width = 512;

  search_image = new Image();
  search_image.src = "images/cluttered_desk.jpg";
  imgClip = new Image();
  imgClip.src = "images/fovea_mask.png";
  layer1.style.filter = "blur(10px)";
  ctx1.drawImage(search_image, 0, 0);


  // /// draw the shape we want to use for clipping
  // ctx1.drawImage(imgClip, 0, 0);

  // /// change composite mode to use that shape
  // ctx1.globalCompositeOperation = 'source-in';

  // /// draw the image to be clipped
  // ctx1.drawImage(img, 0, 0);



  const layer2 = document.getElementById('layer2');
  const ctx2 = layer2.getContext('2d');
  layer2.height = 512;
  layer2.width = 512;

  // background
  ctx2.clearRect(255, 255, CANVAS_WIDTH, CANVAS_HEIGHT);

  document.addEventListener('keydown', keyDown);
  // console.log("added keydown event listener")
  gameActive = true;

}

function keyDown(e) {
  if (gameActive == true) {
    socket.emit('keydown', e.keyCode);
  }
}

function paintGame(state) {

  // display planchette
  const layer2 = document.getElementById('layer2');
  const ctx2 = layer2.getContext('2d');
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  var planchette = new Image();
  planchette.src = "images/fovea_mask.png";
  ctx2.drawImage(planchette, state.planchette.pos.x - PLANCHETTE_WIDTH/2, state.planchette.pos.y - PLANCHETTE_HEIGHT/2);

  // display score (spirits present)
  const left_layer2 = document.getElementById("left_layer2");
  const left_ctx2 = left_layer2.getContext("2d");
  left_ctx2.clearRect(0, 0, 100, 512);
  left_ctx2.font = "120px Copperplate, Papyrus, fantasy";
  left_ctx2.fillStyle = 'rgba(255, 255, 255, .3)';
  left_ctx2.textAlign = "center";
  numSpirits = state.numSpirits;
  if (numSpirits == undefined) {
    numSpirits = '1';
  }
  left_ctx2.fillText(numSpirits, 50, 80);
  left_ctx2.fillStyle = 'rgba(255, 255, 255, .3)';
  left_ctx2.font = "24px Copperplate, Papyrus, fantasy";
  display_text = "Players"
  if (numSpirits == 1) {
    display_text = "Player"
  }
  left_ctx2.fillText(display_text, 50, 110);
  left_ctx2.fillText("Present", 50, 135);

  // display current letter
  const right_layer2 = document.getElementById("right_layer2");
  const right_ctx2 = right_layer2.getContext("2d");
  right_ctx2.clearRect(0, 0, 100, 512);
  right_ctx2.font = "120px Copperplate, Papyrus, fantasy";
  // streak = calculateLetterStreak(state);
  // alpha = streak / state.letter_buffer.length;
  right_ctx2.fillStyle = 'rgba(255, 255, 255, .3)';
  right_ctx2.textAlign = "center";

  current_letter = state.current_letter;
  if (current_letter == '_' || current_letter == undefined) {
    current_letter = ' ';
  }
  display_string = current_letter;
  if (current_letter == '+') {
    right_ctx2.font = "48px Copperplate, Papyrus, fantasy";
    display_string = 'Yes'
  }
  if (current_letter == '-') {
    right_ctx2.font = "48px Copperplate, Papyrus, fantasy";
    display_string = 'No'
  }
  if (current_letter == '.') {
    right_ctx2.font = "48px Copperplate, Papyrus, fantasy";
    display_string = 'Bye'
  }
  right_ctx2.fillText(display_string, 60, 80);


  // // display stimuli around the clock
  // const layer1 = document.getElementById('layer1');
  // const ctx1 = layer1.getContext('2d');
  // ctx1.fillStyle = 'rgba(0, 0, 0, 1)';
  // ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // ctx1.fillStyle = 'rgba(255, 255, 255, 1)';
  // ctx1.font = "48px Copperplate, Papyrus, fantasy";
  // ctx1.textAlign = "left";
  // var clock_letters = "MWMMMMMMMMMM";
  // for ( var i = 0; i < 12; i++ ) {
  //   codx = CLOCK_POSITIONS[i].x;
  //   cody = CLOCK_POSITIONS[i].y;
  //   ctx1.fillText(clock_letters[i], codx, cody);
  // }

  // display agreed letters
  const layer_agreed = document.getElementById("layer_agreed");
  const agreed_ctx = layer_agreed.getContext("2d");
  agreed_ctx.fillStyle = 'black';
  agreed_ctx.clearRect(0, 0, 512, 48);
  agreed_ctx.font = "48px Copperplate, Papyrus, fantasy";
  agreed_ctx.fillStyle = 'rgba(255, 255, 255, .5)';
  agreed_ctx.textAlign = "center";
  agreed_ctx.fillText(state.agreed_letters, 419, 40);
}

function handleInit(number) {
  playerNumber = number;
  console.log("*****playerNumber: " + playerNumber)
  init(playerNumber)
}

function handleGameState(gameState) {
  if (!gameActive) {
    return;
  }
  gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState));
}

function handleGameOver(state) {
  // if (!gameActive) {
  //   console.log("game not active")
  //   return;
  // }

  state = JSON.parse(state);

  // clear the top of the screen
  const layer_agreed = document.getElementById("layer_agreed");
  const agreed_ctx = layer_agreed.getContext("2d");
  agreed_ctx.fillStyle = 'black';
  agreed_ctx.clearRect(0, 0, 512, 48);

  const right_layer2 = document.getElementById("right_layer2");
  const right_ctx2 = right_layer2.getContext("2d");
  right_ctx2.clearRect(0, 0, 100, 512);

  // remove the planchette
  const layer2 = document.getElementById('layer2');
  const ctx2 = layer2.getContext('2d');
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // remove the ouija board
  const layer1 = document.getElementById('layer1');
  const ctx1 = layer1.getContext('2d');
  ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // // display a dimmed board
  // const dim = new Image();
  // dim.src = "images/ouija_board_dim.png";
  // ctx1.drawImage(dim,0,0);

  // game over messages
  const layer4 = document.getElementById('layer4');
  const ctx4 = layer4.getContext('2d');
  ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx4.fillStyle = "white";
  ctx4.textAlign = "center";
  ctx4.font = "96px Copperplate, Papyrus, fantasy";
  var final_message = state.agreed_letters.substring(0, state.agreed_letters.length - 1);;
  ctx4.fillText(final_message, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);

  // data = JSON.parse(data);
  gameActive = false;

}

function handleGameCode(gameCode) {
  // console.log("made it to handleGameCode()")
  //gameCodeDisplay.innerText = gameCode;
}

function handleScore(gameScore) {
  // gameScore = JSON.parse(gameScore);
  // console.log("*****handleScore(): gameScore: " + gameScore)
  // const left_layer2 = document.getElementById("left_layer2");
  // const left_ctx = left_layer2.getContext("2d");
  // left_ctx.clearRect(0, 0, 100, 554);
  // left_ctx.font = "60px Copperplate, Papyrus, fantasy";
  // left_ctx.textAlign = "center";
  // left_ctx.fillStyle = 'rgba(255, 255, 255, .3)';
  // left_ctx.fillText(gameScore, 50, 80);
  // left_ctx.font = "18px Copperplate, Papyrus, fantasy";
  // left_ctx.fillText("Spirits", 50, 110);
  // left_ctx.fillText("Present", 50, 130);

}

function handleUnknownCode() {
  reset();
  alert('Unknown Game Code')
}

function reset() {
  playerNumber = null;
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}
