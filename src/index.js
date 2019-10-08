import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './board';
import { History } from './history';
import { getPlayerSymbol, checkWinner, BOARD_SIZE } from './game-utils';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
                isXNext: true,
                winner: null,
                draw: false,
                lastX: null,
                lastY: null,
                id: 0
            }],
            reorder: false,
            currentMoveNumber: 0
        };
    }

    render() {
        const currentBoard = this.getCurrentBoard();

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={currentBoard.squares}
                        isXNext={currentBoard.isXNext}
                        winner={currentBoard.winner}
                        draw={currentBoard.draw}
                        onSquareClick={(squareNumber) => this.squareClicked(squareNumber)}
                    />
                </div>
                <History history={this.state.reorder ? this.state.history.slice().reverse() : this.state.history}
                    currentMoveNumber={this.state.currentMoveNumber}
                    goToMove={(i) => this.goToMove(i)}
                    onReorderHistory={() => this.reorderHistory()} />
            </div>
        );
    }

    squareClicked(squareNumber) {
        const currentBoard = this.getCurrentBoard();

        // If the game is still ongoing and the clicked square is empty
        if (!currentBoard.winner && !currentBoard.squares[squareNumber]) {
            const squaresCopy = currentBoard.squares.slice();
            squaresCopy[squareNumber] = getPlayerSymbol(currentBoard.isXNext);

            const newBoardState = {
                squares: squaresCopy,
                isXNext: !currentBoard.isXNext,
                winner: checkWinner(squaresCopy),
                lastX: (squareNumber % BOARD_SIZE) + 1,
                lastY: Math.floor(squareNumber / BOARD_SIZE) + 1,
                draw: this.state.history.length === BOARD_SIZE * BOARD_SIZE,
                id: this.state.currentMoveNumber + 1
            };

            const prevHistory = this.state.history.length - 1 === this.state.currentMoveNumber
                ? this.state.history.slice()
                : this.state.history.slice(0, this.state.currentMoveNumber + 1);

            this.setState({
                history: [...prevHistory, newBoardState],
                currentMoveNumber: this.state.currentMoveNumber + 1,
                reorder: this.state.reorder
            });
        }
    }

    goToMove(moveNumber) {
        this.setState(Object.assign({}, this.state, { currentMoveNumber: moveNumber }))
    }

    reorderHistory() {
        this.setState(Object.assign({}, this.state, {reorder: !this.state.reorder}));
    }

    getCurrentBoard() {
        return this.state.history.find(b => b.id === this.state.currentMoveNumber);
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
