document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells:[]
};

function startGame () {
   var boardCells = document.getElementsByClassName('board')[0].children;
    for (var i = 0; i < boardCells.length; i ++) {
     addListeners(boardCells[i]);
    }
}

function addListeners(element) {
  element.addEventListener('click', showCell);
  element.addEventListener('contextmenu', markCell);
}

function showCell(evt) {
  evt.target.classList.remove('hidden');
}

function markCell (evt) {
  evt.preventDefault()
  evt.target.classList.toggle('marked')
}

function getRow (element) {
  var cellList = element.classList
    for (var i = 0; i < cellList.length; i ++) {
      if (cellList[i].substring(0,3) === 'row') {
        return Number(cellList[i].split("-")[1]);
      }
    }
}

function getCol (element) {
  var cellList = element.classList
    for (var i = 0; i < cellList.length; i ++) {
      if (cellList[i].substring(0,3) === 'col') {
        return Number(cellList[i].split("-")[1]);
      }
    }
}