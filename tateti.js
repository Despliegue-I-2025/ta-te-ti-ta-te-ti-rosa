// tateti.js
let marcas = { cruz: 1, circulo: 2, vacio: 0 };
let simbolo = 0;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Función IA estratégica
function iaMove(board) {
  const X = marcas.cruz;
  const O = marcas.circulo;

  // 1. Bloquea al humano
  const block = findWinningMove(board, X);
  if (block !== null) return block;

  // 2. Gana si puede
  const win = findWinningMove(board, O);
  if (win !== null) return win;

  // 3. Estrategia defensiva
  if (board[4] === 0) return 4; 
  const corners = [0,2,6,8].filter(i => board[i] === 0);
  if (corners.length > 0) return corners[Math.floor(Math.random()*corners.length)]; 
  const edges = [1,3,5,7].filter(i => board[i] === 0);
  if (edges.length > 0) return edges[Math.floor(Math.random()*edges.length)]; 

  return board.findIndex(v => v === 0);
}

function findWinningMove(board, player) {
  for (const [a,b,c] of winningCombos) {
    const line = [board[a], board[b], board[c]];
    if (line.filter(v => v === player).length === 2 && line.includes(0)) {
      if (board[a] === 0) return a;
      if (board[b] === 0) return b;
      if (board[c] === 0) return c;
    }
  }
  return null;
}

function determinarRol(board){
  for (let i = 0; i < 9; i++){
    if (board[i] === marcas.cruz){
      return marcas.circulo;
    }
  }
  return marcas.cruz;
}

// Funciones auxiliares para tests
function resetSimbolo(val = 0) { simbolo = val; }
function getSimbolo() { return simbolo; }

// Exportamos todo para usarlo en tests o en server.js
module.exports = {
  marcas,
  iaMove,
  findWinningMove,
  determinarRol,
  resetSimbolo,
  getSimbolo
};
