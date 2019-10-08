import React from 'react';
import {Square} from './square';
import {getPlayerSymbol, getPlayerClass, getPlayerClassBySymbol} from './game-utils';

export class Board extends React.Component {
    renderSquare(i) {
        const isWinner = this.props.winner && this.props.winner.squares.some(si => si === i);

        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                winnerColor={isWinner ? getPlayerClassBySymbol(this.props.winner.symbol) : ''}
                onClick={() => this.props.onSquareClick(i)} />
        );
    }

    render() {
        let status;
        if (this.props.winner) {
            status = (
                <div className="status">
                    <span className={getPlayerClassBySymbol(this.props.winner.symbol)}>{this.props.winner.symbol}</span>
                    has won!
                </div>
            );
        } else if (this.props.draw) {
            status = (<div className="status">Draw!</div>);
        } else {
            status = (
                <div className="status">
                    Next player:
                    <span className={getPlayerClass(this.props.isXNext)}>
                        {getPlayerSymbol(this.props.isXNext)}
                    </span>
                </div>
            );
        }

        const boardRows = [0, 3, 6].map(i => (
            <div className="board-row" key={i}>
                {this.renderSquare(i)}
                {this.renderSquare(i + 1)}
                {this.renderSquare(i + 2)}
            </div>
        ))

        return (
            <div>
                {status}
                {boardRows}
            </div>
        );
    }
}