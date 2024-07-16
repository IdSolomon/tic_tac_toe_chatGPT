const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (boardState[index] !== null || isGameOver) return;

    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    if (checkWin()) {
        showAlert(`Player ${currentPlayer} wins!`);
        isGameOver = true;
        return;
    }
    
    if (boardState.every(cell => cell !== null)) {
        showAlert('Congratulations, it\'s a tie!');
        isGameOver = true;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    isGameOver = false;
}

function showAlert(message) {
    swal({
        title: 'Game Over',
        text: message,
        type: 'success',
        confirmButtonText: 'Well Done!',
				allowEscapeKey: false,
				allowOutsideClick: false,
				backdrop: `
					rgba(255,116,0,0.4)
				`
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);