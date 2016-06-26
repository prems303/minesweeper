document.addEventListener('DOMContentLoaded', startGame)
//global variable
var board = {
  cells:[]
};

function startGame () {
   var boardCells = document.getElementsByClassName('board')[0].children;
    for (var i = 0; i < boardCells.length; i++) {
     addListeners(boardCells[i]);
     addCellToBoard(boardCells[i]);
    }
      for (var i = 0; i < board.cells.length; i++) {
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
      }
}

function addListeners (element) {
  element.addEventListener('click', showCell);
  element.addEventListener('contextmenu', markCell);
}

function showCell (evt) {
  evt.target.classList.remove('hidden');
  if (evt.target.classList.contains('mine')) {
    showAllMines();
    //play the sound of bomb
    document.getElementsByTagName("audio")[0].play();
    alert("You have Lost! Try again");
    resetGame();
  } else {
    showSurrounding(evt.target);
    checkForWin();
   } 
}

function markCell (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('marked');
  evt.target.classList.toggle('hidden');
    for (var i = 0; i < board.cell.length; i++) {
      if (board.cells[i].row === getRow(evt.target) && board.cells[i].col === getCol(evt.target)) {
        board.cells[i].isMarked = true;
      }
    }
    checkForWin();
}

//get row number
function getRow (element) {
  var cellList = element.classList;
    for (var i = 0; i < cellList.length; i++) {
      if (cellList[i].substring(0,3) === 'row') {
        return Number(cellList[i].split('-')[1]);
      }
    }
}

//get column number
function getCol (element) {
  var cellList = element.classList;
    for (var i = 0; i < cellList.length; i++) {
      if (cellList[i].substring(0,3) === 'col') {
        return Number(cellList[i].split('-')[1]);
      }
    }
}

//add row & column cells to board
function addCellToBoard (element) {
  var newCell = {
    row: getRow(element),
    col: getCol(element),
    isMine: element.classList.contains('mine')
  };
  board.cells.push(newCell);
}

function countSurroundingMines (cell) {
  var surroundingCells = getSurroundingCells(cell.row, cell.col)
    var number = 0;
      for (var i = 0; i < surroundingCells.length; i++) {
        if (surroundingCells[i].isMine) {
          number++;
        }
      }
      return number;
}

//check if you have won the game & reset the game
function checkForWin () {
  var number = 0,
      boardCells = document.getElementsByClassName('board')[0].children;
    for (var i = 0; i < board.cells.length; i++) {
      if (board.cells[i].isMine === false && board.cells[i].isMarked === true) {
      number++;
      }else if (board.cells[i].isMine === true && board.cells[i].isMarked === true) {
        number++;
        }
    }
    for (var i = 0; i < boardCells.length; i++) {
      if (boardCells[i].classList.contains('hidden')) {
        return;
      }
    }
    //play the sound of applause
    document.getElementsByTagName("audio")[1].play();
    alert("You have Won!");
    resetGame();
}

function showAllMines () {
  var boardCells = document.getElementsByClassName('board')[0].children;
    for (var i = 0; i < boardCells.length; i++) {
      if (boardCells[i].classList.contains('hidden')) {
        boardCells[i].classList.remove('hidden');
        boardCells[i].classList.remove('marked');
      } 
    }

  }

//reset the game
  function resetGame () {
    var boardCells = document.getElementsByClassName('board')[0].children;
      for (var i = 0; i < boardCells.length; i++) {
          boardCells[i].classList.add('hidden');
          boardCells[i].classList.remove('marked');
          boardCells[i].innerHTML = '';
      }
      //re-initialize with empty cells & start game again
      board = {
      cells:[]
    };
    randomMine(5);
    startGame();
    
  }
  
  //place mines randomly when game is reset
  function randomMine (number) {
    var boardCells = document.getElementsByClassName('board')[0].children;
      for (var i = 0; i < number.length; i++) {
        var random = Math.floor(Math.random()*number.length);
          if (i === mine) {
            boardCells[i].classList.add('mine');
          }
      }
  }
