// --------- Document methods --------- //
const gameBoardContainer = document.querySelector('.gameboard');

// --------- Factory Functions declaration  --------- //
const Player = (choosedMark) => {
    const mark = () => choosedMark;
    return { mark };
};

const gameBoardController = (() => {
    const startButton = document.getElementById('btn-start');
    const restartButton = document.getElementById('btn-restart');

    let board = ['', '', '', '', '', '', '', '', ''];
    let playerA = '';
    let playerB = '';
    let turn = '';
    let roundMark = '';

    startButton.addEventListener('click', () => {
        displayController.isWarning();
    });

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    const addBoard = (cellIndex, spot) => {
        board[cellIndex] = spot;
    };

    const initRound = () => {
        if (turn === 'playerA') {
            turn = 'playerB';
            roundMark = playerB.mark();
        } else {
            turn = 'playerA';
            roundMark = playerA.mark();
        }
    };

    const isSpotEvent = () => {
        const gridCells = document.querySelectorAll('.cell');
        gridCells.forEach((cell) => {
            cell.addEventListener('click', (event) => {
                const cellIndex = cell.dataset.index;
                if (board[cellIndex] === '') {
                    const spot = event.target;
                    spot.classList.add('spot');
                    spot.textContent = roundMark;
                    addBoard(cellIndex, spot.textContent);
                }
                initRound();
            });
        });
    };

    const createField = () => {
        resetBoard();
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
        isSpotEvent();
    };

    const restartGame = () => {
        restartButton.addEventListener('click', () => {
            resetBoard();
            createField();
            turn = 'playerA';
            roundMark = playerA.mark();
        });
    };

    const startGame = (mark) => {
        playerA = Player(mark);
        turn = 'playerA';
        roundMark = playerA.mark();
        if (mark === 'X') {
            playerB = Player('O');
        } else {
            playerB = Player('X');
        }

        createField();
        restartGame();
    };

    return { startGame };
})();

const displayController = (() => {
    const settingsButton = document.getElementById('btn-settings');
    const markX = document.querySelector('.mark-x');
    const markO = document.querySelector('.mark-o');
    const warning = document.getElementById('warning');
    const modal = document.querySelector('.modal');

    const setWarning = () => {
        warning.textContent = 'Please choose a mark!';
    };

    const removeWarning = () => {
        warning.textContent = '';
    };

    const showBoard = () => {
        modal.style.display = 'none';
        gameBoardContainer.classList.remove('inactive');
    };

    const showModal = () => {
        modal.style.display = 'block';
        gameBoardContainer.classList.add('inactive');
    };

    const isWarning = () => {
        if (markX.classList.contains('active')) {
            showBoard();
            gameBoardController.startGame(markX.textContent);
        } else if (markO.classList.contains('active')) {
            showBoard();
            gameBoardController.startGame(markO.textContent);
        } else setWarning();
    };

    markX.addEventListener('click', () => {
        removeWarning();
        markO.classList.remove('active');
        markX.classList.add('active');
    });

    markO.addEventListener('click', () => {
        removeWarning();
        markX.classList.remove('active');
        markO.classList.add('active');
    });

    settingsButton.addEventListener('click', () => {
        showModal();
    });

    return { isWarning };
})();
