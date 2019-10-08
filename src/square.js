import React from 'react';

export function Square(props) {
    return (
        <button className={'square ' + props.winnerColor}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}