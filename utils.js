const { FRAME_RATE } = require('./constants');
const { OUIJA_CODES } = require('./constants');


module.exports = {
  makeid,
  ouijaGoToLetter,
  ouijaGetLetter,
}

function makeid(length) {
   var result           = '';
   // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var characters       = 'A';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function ouijaGoToLetter(state, letter) {
  console.log("made it to ouijaGoToLetter")
  // xstart = state.planchette.pos.x;
  // xend = OUIJA_CODES[letter].x;
  // ystart = state.planchette.pos.y;
  // yend = OUIJA_CODES[letter].y;
  // for ( var i = 0; i < 100; i++ ) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //  }
  ouijaAlphabetLength = Object.keys(OUIJA_CODES).length;
  for ( var i = 0; i < ouijaAlphabetLength - 1; i++ ) {
      if (OUIJA_CODES[i].letter === letter) {
         xpos = OUIJA_CODES[i].x
         ypos = OUIJA_CODES[i].y
      }
  }
  state.planchette.pos.x = xpos;
  state.planchette.pos.y = ypos;
  return state;
}

function ouijaGetLetter(state) {
   letter = '';
   ouijaAlphabetLength = Object.keys(OUIJA_CODES).length;
   console.log("ouijaAlphabetLength: " + ouijaAlphabetLength);
   console.log("state.planchette.pos.x: " + state.planchette.pos.x);
   posx = state.planchette.pos.x;
   posy = state.planchette.pos.y;

   for ( var i = 0; i < ouijaAlphabetLength - 1; i++ ) {
      console.log(i)
      codx = OUIJA_CODES[i].x;
      cody = OUIJA_CODES[i].y;
      distance = Math.sqrt(Math.pow(codx - posx, 2) + Math.pow(cody - posx, 2));
      console.log(distance);
      if (distance <= 10) {
         letter = OUIJA_CODES[i].letter;
         console.log('Your letter is: ' + letter);
      }
   }
   return letter;

}
