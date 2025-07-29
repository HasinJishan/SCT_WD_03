const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

let boardState = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0 };

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function renderBoard() {
  board.innerHTML = '';
  boardState.forEach((val, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.textContent = val;
    if (val) cell.classList.add(val.toLowerCase());
    if (!val && gameActive) {
      cell.addEventListener('click', handleClick);
    }
    board.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  renderBoard();

  if (checkWinner(currentPlayer)) {
    scores[currentPlayer]++;
    updateScores();
    winSound.play();
    endGame(`🎉 Player ${currentPlayer} wins!`);
  } else if (boardState.every(cell => cell)) {
    drawSound.play();
    endGame("🤝 It's a draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner(player) {
  const win = winCombos.find(combo =>
    combo.every(index => boardState[index] === player)
  );
  if (win) {
    win.forEach(i => {
      document.querySelectorAll('.cell')[i].classList.add('win');
    });
    return true;
  }
  return false;
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function endGame(message) {
  gameActive = false;
  statusDiv.textContent = message;
}

resetBtn.addEventListener('click', () => {
  boardState = Array(9).fill('');
  gameActive = true;
  currentPlayer = 'X';
  statusDiv.textContent = "Player X's turn";
  renderBoard();
});

renderBoard();
