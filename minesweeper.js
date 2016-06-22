document.addEventListener('DOMContentLoaded', startGame)

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
  showSurrounding(evt.target);
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
}

function getRow (element) {
  var cellList = element.classList;
    for (var i = 0; i < cellList.length; i++) {
      if (cellList[i].substring(0,3) === 'row') {
        return Number(cellList[i].split('-')[1]);
      }
    }
}

function getCol (element) {
  var cellList = element.classList;
    for (var i = 0; i < cellList.length; i++) {
      if (cellList[i].substring(0,3) === 'col') {
        return Number(cellList[i].split('-')[1]);
      }
    }
}

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