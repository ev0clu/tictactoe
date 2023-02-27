// --------- Document methods --------- //
const gameBoardContainer = document.querySelector('.gameboard');

// --------- Factory Functions declaration  --------- //
const Player = (choosedMark) => {
    const mark = () => choosedMark;
    return { mark };
};

const gameBoardController = (() => {
    const restartButton = document.getElementById('btn-restart');
    const select = document.querySelector('select');
    let board = ['', '', '', '', '', '', '', '', ''];
    let playerA = '';
    let playerB = '';
    let turn = '';
    let roundMark = '';
    let winner = '';

    const getEnemy = () => {
        const enemy = select.value;
        return enemy;
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        winner = '';
    };

    const checkWinner = () => {
        const winPattern = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        if (!board.includes('')) {
            for (let row = 0; row < winPattern.length; row++) {
                if (
                    board[winPattern[row][0]] === board[winPattern[row][1]] &&
                    board[winPattern[row][0]] === board[winPattern[row][2]]
                ) {
                    winner = `The winner is ${board[winPattern[row][0]]}`;
                    displayController.showWinner(winner);
                    break;
                }
            }
            if (winner === '') {
                winner = `It's a tie`;
                displayController.showWinner(winner);
            }
        } else {
            for (let row = 0; row < winPattern.length; row++) {
                if (
                    board[winPattern[row][0]] === board[winPattern[row][1]] &&
                    board[winPattern[row][0]] === board[winPattern[row][2]] &&
                    board[winPattern[row][0]] !== ''
                ) {
                    winner = `The winner is ${board[winPattern[row][0]]}`;
                    displayController.showWinner(winner);
                    break;
                }
            }
        }
    };

    const addBoard = (cellIndex, spot) => {
        board[cellIndex] = spot;
        checkWinner();
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

    const playerSpot = (index, eventTarget) => {
        const cellIndex = index;

        const spot = eventTarget;
        spot.classList.add('spot');
        spot.textContent = roundMark;
        addBoard(cellIndex, spot.textContent);
    };

    const computerSpot = (gridCells) => {
        let index = 0;
        const availableIndex = [];
        let cellIndex = 0;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                availableIndex[index] = i;
                index += 1;
            }
        }
        cellIndex = availableIndex[Math.floor(Math.random() * availableIndex.length)];
        gridCells.forEach((cell) => {
            const spot = cell;
            if (Number(cell.dataset.index) === cellIndex) {
                spot.classList.add('spot');
                spot.textContent = roundMark;
                addBoard(cellIndex, spot.textContent);
            }
        });
    };

    const isSpotEvent = () => {
        const gridCells = document.querySelectorAll('.cell');
        gridCells.forEach((cell) => {
            cell.addEventListener('click', (event) => {
                if (board[cell.dataset.index] === '') {
                    playerSpot(cell.dataset.index, event.target);
                    initRound();
                    const enemy = getEnemy();
                    if (enemy === 'computer') {
                        computerSpot(gridCells);
                        initRound();
                    }
                }
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
    const startButton = document.getElementById('btn-start');
    const settingsButton = document.getElementById('btn-settings');
    const markX = document.querySelector('.mark-x');
    const markO = document.querySelector('.mark-o');
    const warning = document.getElementById('warning');
    const modalStartContainer = document.querySelector('.modal-start-container');
    const modalWinnerContainer = document.querySelector('.modal-winner-container');
    const modalWinner = document.querySelector('.winner-text');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const playAgainButton = document.getElementById('btn-play-again');

    const setWarning = () => {
        warning.textContent = 'Please choose a mark!';
    };

    const removeWarning = () => {
        warning.textContent = '';
    };

    const showBoard = () => {
        modalStartContainer.style.display = 'none';
        gameBoardContainer.classList.remove('inactive');
    };

    const showModalStart = () => {
        modalStartContainer.style.display = 'block';
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

    const resetBoard = () => {
        gameBoardContainer.classList.remove('winner');
        main.classList.remove('winner');
        header.classList.remove('winner');
        footer.classList.remove('winner');
        modalWinnerContainer.style.display = 'none';
        modalWinner.textContent = '';
    };

    const showWinner = (winner) => {
        modalWinnerContainer.style.display = 'block';
        modalWinner.textContent = winner;
        gameBoardContainer.classList.add('winner');
        main.classList.add('winner');
        header.classList.add('winner');
        footer.classList.add('winner');

        playAgainButton.addEventListener('click', () => {
            resetBoard();
            isWarning();
        });
    };

    startButton.addEventListener('click', () => {
        isWarning();
    });

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
        showModalStart();
    });

    return { showWinner };
})();
