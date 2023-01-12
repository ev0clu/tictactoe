// --------- Document methods --------- //
let gameBoardContainer = document.querySelector('.gameboard');
const startButton = document.getElementById('btn-start');
const markX = document.querySelector('.mark-x');
const markO = document.querySelector('.mark-o');
const warning = document.getElementById('warning');
const modal = document.querySelector('.modal');

// --------- Functions declaration  --------- //
const Player = (mark) => {
    const storeMark = () => mark;
    return { storeMark };
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
        gameBoardContainer.textContent = '';
        let index = 0;
        board.forEach((cell) => {
            const gridCell = document.createElement('div');
            gridCell.setAttribute('class', 'cell');
            gridCell.setAttribute('data-index', `${index}`);
            gridCell.textContent = cell;
            gameBoardContainer.appendChild(gridCell);
            index += 1;
        });
        setSpot();
    };
    const startGame = () => {};

    return { create };
})();

const displayController = (() => {
    const setWarning = () => {
        warning.textContent = 'Please choose a mark!';
    };

    const removeWarning = () => {
        warning.textContent = '';
    };

    const showBoard = () => {
        modal.style.display = 'none';
        gameBoardContainer.classList.remove('inactive');
        gameBoard.create();
    };

    const isWarning = () => {
        if (markX.classList.contains('active')) {
            ///storeMark(markX.textContent);
            showBoard();
        } else if (markO.classList.contains('active')) {
            showBoard();
            //storeMark(markO.textContent);
        } else setWarning();
    };

    return { isWarning, removeWarning };
})();

// --------- Event listeners --------- //
// Pressed 'Add button' open the Pop up menu
startButton.addEventListener('click', () => {
    displayController.isWarning();

    //gameBoard.create();
    //const mark = Player();
    //const mark = displayController.getMark;
    //console.log(mark);
});

markX.addEventListener('click', () => {
    displayController.removeWarning();
    markO.classList.remove('active');
    markX.classList.add('active');
    //const mark = Player(markX.textContent);
});

markO.addEventListener('click', () => {
    displayController.removeWarning();
    markX.classList.remove('active');
    markO.classList.add('active');
    //displayController.storeMark(markO.textContent);
});
