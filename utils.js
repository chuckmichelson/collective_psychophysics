const { FRAME_RATE } = require('./constants');
// const { CLOCK_POSITIONS } = require('./constants');


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
  //  // console.log("made it to ouijaGoToLetter")
  //  // xstart = state.planchette.pos.x;
  //  // xend = CLOCK_POSITIONS[letter].x;
  //  // ystart = state.planchette.pos.y;
  //  // yend = CLOCK_POSITIONS[letter].y;
  //  // for ( var i = 0; i < 100; i++ ) {

  //  // }
  //  ouijaAlphabetLength = Object.keys(CLOCK_POSITIONS).length;
  //  for ( var i = 0; i < ouijaAlphabetLength - 1; i++ ) {
  //     if (CLOCK_POSITIONS[i].letter === letter) {
  //        state.planchette.pos.x = CLOCK_POSITIONS[i].x
  //        state.planchette.pos.y = CLOCK_POSITIONS[i].y
  //     }
  //  }
  // return state;
}

function ouijaGetLetter(state) {
   letter = '_';
   // ouijaAlphabetLength = Object.keys(CLOCK_POSITIONS).length;
   // console.log("ouijaAlphabetLength: " + ouijaAlphabetLength);
   // console.log("state.planchette.pos.x: " + state.planchette.pos.x);
   posx = state.planchette.pos.x;
   posy = state.planchette.pos.y;

   for ( var i = 0; i < 1; i++ ) {
      // console.log(i)
      codx = state.current_trial.x;
      cody = state.current_trial.x;
      distance = Math.sqrt(Math.pow(codx - posx, 2) + Math.pow(cody - posy, 2));
      // console.log(distance);
      if (distance <= 15) {
         letter = '1';
         // console.log('Your letter is: ' + letter);
      }
   }
   if (posy >= 494 && posx >= 280 && posx <= 562) {
      letter = '.'; // i.e., GOODBYE
   }
   return letter;
}
