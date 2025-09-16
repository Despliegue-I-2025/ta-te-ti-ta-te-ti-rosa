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

  // 2. Bloquea al humano
  const block = findWinningMove(board, X);
  if (block !== null) return block;

  // 1. Gana si puede
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

  console.log("Busca un movimiento...")
  return null;
}

function determinarRol(board){
    for(i=0; i<9;i++){
        if(board[i] == marcas.cruz){
            return marcas.circulo;
        }
    }

    //No encontró nada, asi que debe ser cruz.
    return marcas.cruz;
}

const express = require('express');
const app = express();
const PORT = 3000;

// GET /move?board=[0,1,0,2,0,0,0,0,0]
app.get('/move', (req, res) => {

    let boardParam = req.query.board;
    let board;
    try {
        board = JSON.parse(boardParam);
    } catch (e) {
        return res.status(400).json({ error: 'Parámetro board inválido. Debe ser un array JSON.' });
    }
    if (!Array.isArray(board) || board.length !== 9) {
        return res.status(400).json({ error: 'El tablero debe ser un array de 9 posiciones.' });
    }
        
    // Obtiene si juega con X o O.
    if(simbolo == 0){
        simbolo = determinarRol(board);
    } else {
        // Buscar posiciones vacías (asumiendo que 0 es vacío)
        const emptyPositions = board
            .map((v, i) => v === 0 ? i : null)
            .filter(i => i !== null);
    
        if (emptyPositions.length === 0) {
            return res.status(400).json({ error: 'No hay movimientos disponibles.' });
        }
    }

    const movimientoIA = iaMove(board);
    board[movimientoIA] = simbolo;
    //const nuevoEstado = checkWinner(board);

    // Elegir una posición vacía al azar
    //const move = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    res.json({ movimiento: movimientoIA });
});

app.listen(PORT, () => {
    console.log(`Servidor de tateti escuchando en el puerto ${PORT}`);
});
