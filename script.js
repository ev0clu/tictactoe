// --------- Document methods --------- //
let gameBoardDiv = document.getElementById('gameboard');
const startButton = document.getElementById('btn-start');

// --------- Functions declaration  --------- //
const Player = (name) => {
    //let name;
};

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const addBoard = (cellIndex, spot) => {
        board[cellIndex] = spot;

        console.log(board);
    };

    const checkCell = () => {};

    const setSpot = () => {
        const gridCells = document.querySelectorAll('.cell');
        gridCells.forEach((cell) => {
            cell.addEventListener('click', (event) => {
                const cellIndex = cell.dataset.index;
                if (board[cellIndex] === '') {
                    const spot = event.target;
                    spot.textContent = 'X';
                    addBoard(cellIndex, spot.textContent);
                }
            });
        });
    };

    const create = () => {
        gameBoardDiv.textContent = '';
        let index = 0;
        board.forEach((cell) => {
            const gridCell = document.createElement('div');
            gridCell.setAttribute('class', `cell`);
            gridCell.setAttribute('data-index', `${index}`);
            gridCell.textContent = cell;
            gameBoardDiv.appendChild(gridCell);
            index += 1;
        });
        setSpot();
    };
    const startGame = () => {};

    return { create };
})();

const displayController = (() => {})();

// --------- Event listeners --------- //
// Pressed 'Add button' open the Pop up menu
startButton.addEventListener('click', () => {
    gameBoard.create();
});
