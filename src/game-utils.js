export const X_SYMBOL = 'X';
export const O_SYMBOL = 'O';
export const BOARD_SIZE = 3;
export const X_PLAYER_CLASS = 'x-player';
export const O_PLAYER_CLASS = 'o-player';

export function checkWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return {
              symbol: squares[a],
              squares: lines[i]
          };
        }
      }
      return null;
}

export function getPlayerSymbol(isXNext) {
    return isXNext ? X_SYMBOL : O_SYMBOL;
}

export function getPlayerClass(isXNext) {
    return isXNext ? X_PLAYER_CLASS : O_PLAYER_CLASS;
}

export function getPlayerClassBySymbol(symbol) {
    return symbol === X_SYMBOL ? X_PLAYER_CLASS : O_PLAYER_CLASS;
}
