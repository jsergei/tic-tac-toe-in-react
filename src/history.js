import React from 'react';
import {getPlayerClass} from './game-utils';

export function History(props) {
    const moveList = props.history.map((m, i) =>
        (
            <li key={m.id}
                className={'history-row ' + (props.currentMoveNumber === m.id ? 'active' : '')}>
                Go To Move
                <button className="move-number" onClick={() => props.goToMove(m.id)}>{m.id}</button>
                <span className={'hint-label ' + getPlayerClass(!m.isXNext)}>
                    (col: {m.lastX}, row: {m.lastY})
                </span>
            </li>
        ));

    return (
        <div className="game-info">
            <div>History</div>
            <button className="reorder-history" onClick={props.onReorderHistory}>Reorder history</button>
            <ul>{moveList}</ul>
        </div>
    );
}