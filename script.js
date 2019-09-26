///////////////////////////////////
// Create gameboard and checkers //
///////////////////////////////////
var gameboard = 
  [['','',''],
   ['','',''],
   ['','','']];
var movesLeft = 9;

var checkRow = (gb, row) => {
  var contents = [];
  for (var i = 0; i < gb.length; i++) {
    contents.push(gb[row][i]);
  }
  contents = contents.join('');
  return (contents === 'xxx' || contents === 'ooo' ? true : false);
};
var checkCol = (gb, col) => {
  var contents = [];
  for (var i = 0; i < gb.length; i++) {
    contents.push(gb[i][col]);
  }
  contents = contents.join('');
  return (contents === 'xxx' || contents === 'ooo' ? true : false);
};
var checkLRD = (gb) => {
  var contents = [];
  for (var i = 0; i < gb.length; i++) {
    for (var k = 0; k < gb[i].length; k++) {
      if (i === k) contents.push(gb[i][k]);
    }
  }
  contents = contents.join('');
  return (contents === 'xxx' || contents === 'ooo' ? true : false);
};
var checkRLD = (gb) => {
  var contents = [];
  for (var i = 0; i < gb.length; i++) {
    for (var k = gb[i].length - 1; k >= 0; k--) {
      if (i + k === 2) contents.push(gb[i][k]);
    }
  }
  contents = contents.join('');
  return (contents === 'xxx' || contents === 'ooo' ? true : false);
};

var checkBoard = () => {
  var checks = {};
  checks['Row0'] = checkRow(gameboard, 0);
  checks['Row1'] = checkRow(gameboard, 1);
  checks['Row2'] = checkRow(gameboard, 2);
  checks['Col0'] = checkCol(gameboard, 0);
  checks['Col1'] = checkCol(gameboard, 1);
  checks['Col2'] = checkCol(gameboard, 2);
  checks['LRD'] = checkLRD(gameboard);
  checks['RLD'] = checkRLD(gameboard);

  for (var key in checks) {
    if (checks[key] === true) return key;
  }
  return false;
};

////////////////////////////////////////////////////////////////////
// Assign a marker to a specific square in the gameboard variable //
////////////////////////////////////////////////////////////////////
var assignMarker = (id, mark) => {
  switch (id) {
    case 'top-left': 
      gameboard[0][0] = mark;
      break;
    case 'top-middle': 
      gameboard[0][1] = mark;
      break;
    case 'top-right': 
      gameboard[0][2] = mark;
      break;
    case 'middle-left': 
      gameboard[1][0] = mark;
      break;
    case 'middle-middle': 
      gameboard[1][1] = mark;
      break;
    case 'middle-right': 
      gameboard[1][2] = mark;
      break;
    case 'bottom-left': 
      gameboard[2][0] = mark;
      break;
    case 'bottom-middle': 
      gameboard[2][1] = mark;
      break;
    case 'bottom-right': 
      gameboard[2][2] = mark;
      break;
    default:
      throw 'Invalid marker assignment. Please ensure all click events are being provided with proper inputs.';
  }
};


//////////////////////////////////////////////////////////////////////
// Assign a winner from a specific square in the gameboard variable //
//////////////////////////////////////////////////////////////////////
var assignWinner = (tile) => {
  switch (tile) {
    case 'Row0':
      return `Player "${gameboard[0][0].toUpperCase()}" is the winner!!!!`
    case 'Row1':
      return `Player "${gameboard[1][0].toUpperCase()}" is the winner!!!!`
    case 'Row2':
      return `Player "${gameboard[2][0].toUpperCase()}" is the winner!!!!`
    case 'Col0':
      return `Player "${gameboard[0][0].toUpperCase()}" is the winner!!!!`
    case 'Col1':
      return `Player "${gameboard[0][1].toUpperCase()}" is the winner!!!!`
    case 'Col2':
      return `Player "${gameboard[0][2].toUpperCase()}" is the winner!!!!`
    case 'LRD':
      return `Player "${gameboard[0][0].toUpperCase()}" is the winner!!!!`
    case 'RLD':
      return `Player "${gameboard[0][2].toUpperCase()}" is the winner!!!!`
    default:
      return 'No Player won this game. Better luck next time!';
  }
};

///////////////////////////////////////////
// Create Click Event Listeners/Handlers //
///////////////////////////////////////////
var $elements = document.getElementsByClassName('square');

for(var i = 0; i < $elements.length; i++){
  $elements[i].addEventListener('click', function(e){
    if (!e.target.innerHTML && movesLeft !== 0) {
      var currentPlayer = JSON.parse(document.getElementById('current-player').innerHTML.slice(-3)).toLowerCase();
      e.target.innerHTML = currentPlayer;
      var tile = e.target.id;
      assignMarker(tile, currentPlayer);
      var nextPlayer = (currentPlayer === 'x' ? 'O' : 'X');
      document.getElementById('current-player').innerHTML = `The board is awaiting an "${nextPlayer}"`;
      movesLeft--;
      if (movesLeft === 0 || checkBoard()) {
        if (checkBoard()) {
          document.getElementById('current-player').innerHTML = assignWinner(checkBoard());
        }
        if (movesLeft === 0 && !checkBoard()) {
          document.getElementById('current-player').innerHTML = assignWinner(checkBoard());
        }
        movesLeft = 0;
        document.getElementById('subtitle').innerHTML = 'Press the button above to clear the board!'
        document.getElementById('moves-left').innerHTML = 'There are no more moves left! <br> Game Complete!';
      }
      document.getElementById('moves-left').innerHTML = `There are ${movesLeft} moves left!`;
    };
  });
}

document.getElementById('button').addEventListener('click', (e) => {
  var coll = document.getElementsByClassName('square');
  for (var tile = 0; tile < coll.length; tile++) {
    coll[tile].innerHTML = '';
  }
  gameboard = [['','',''],['','',''],['','','']];
  document.getElementById('subtitle').innerHTML = 'Select a tile to play the game';
  document.getElementById('current-player').innerHTML = 'The board is awaiting an "X"';
  movesLeft = 9;
  document.getElementById('moves-left').innerHTML = 'There are 9 moves left!';

});