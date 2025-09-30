// server.js
const express = require('express');
const { iaMove, determinarRol, marcas } = require('./tateti');

const app = express();
const PORT = 3000;

let simbolo = 0;

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

  if(simbolo === 0) {
    simbolo = determinarRol(board);
  } else {
    const emptyPositions = board.map((v,i)=>v===0?i:null).filter(i=>i!==null);
    if (emptyPositions.length === 0) {
      return res.status(400).json({ error: 'No hay movimientos disponibles.' });
    }
  }

  const movimientoIA = iaMove(board);
  board[movimientoIA] = simbolo;

  res.json({ movimiento: movimientoIA });
});

app.listen(PORT, () => {
  console.log(`Servidor de tateti escuchando en el puerto ${PORT}`);
});
