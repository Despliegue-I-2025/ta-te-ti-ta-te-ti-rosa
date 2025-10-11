let marcas = { cruz: 1, circulo: 2, vacio: 0 };
let simbolo = 0;

const SIZE = 5;
const WIN_LENGTH = 4;
const TOTAL_CELLS = SIZE * SIZE;
const MAX_DEPTH = 4;

// Genera combinaciones ganadoras
function generateWinningCombos(size, k) {
    let combos = [];
    for (let row = 0; row < size; row++) {
        for (let col = 0; col <= size - k; col++) {
            let combo = [];
            for (let i = 0; i < k; i++) combo.push(row * size + col + i);
            combos.push(combo);
        }
    }
    for (let col = 0; col < size; col++) {
        for (let row = 0; row <= size - k; row++) {
            let combo = [];
            for (let i = 0; i < k; i++) combo.push((row + i) * size + col);
            combos.push(combo);
        }
    }
    for (let row = 0; row <= size - k; row++) {
        for (let col = 0; col <= size - k; col++) {
            let combo = [];
            for (let i = 0; i < k; i++) combo.push((row + i) * size + col + i);
            combos.push(combo);
        }
    }
    for (let row = 0; row <= size - k; row++) {
        for (let col = k - 1; col < size; col++) {
            let combo = [];
            for (let i = 0; i < k; i++) combo.push((row + i) * size + col - i);
            combos.push(combo);
        }
    }
    return combos;
}

const winningCombos = generateWinningCombos(SIZE, WIN_LENGTH);

// Función checkWinner que FALTABA
function checkWinner(board) {
    for (const combo of winningCombos) {
        const first = board[combo[0]];
        if (first !== 0 && combo.every(i => board[i] === first)) {
            return first;
        }
    }
    if (!board.includes(0)) {
        return "empate";
    }
    return null;
}

function iaMove(board) {
    const ai = simbolo;
    const human = ai === marcas.cruz ? marcas.circulo : marcas.cruz;

    const winMove = findThreatMove(board, ai, WIN_LENGTH - 1);
    if (winMove !== null) return winMove;

    const blockMove = findThreatMove(board, human, WIN_LENGTH - 1);
    if (blockMove !== null) return blockMove;

    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < TOTAL_CELLS; i++) {
        if (board[i] === 0) {
            board[i] = ai;
            let score = alphaBeta(board, 0, -Infinity, Infinity, false, ai, human);
            board[i] = 0;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    if (bestMove === null) {
        const empty = board.map((v, i) => v === 0 ? i : null).filter(i => i !== null);
        return empty[Math.floor(Math.random() * empty.length)];
    }

    return bestMove;
}

function alphaBeta(board, depth, alpha, beta, maximizing, ai, human) {
    const term = evaluate(board, ai, human);
    if (term !== null) {
        return term + (MAX_DEPTH - depth) * (term > 0 ? 1 : -1);
    }
    if (depth >= MAX_DEPTH) {
        return heuristic(board, ai, human);
    }

    if (maximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < TOTAL_CELLS; i++) {
            if (board[i] === 0) {
                board[i] = ai;
                let evaluation = alphaBeta(board, depth + 1, alpha, beta, false, ai, human);
                board[i] = 0;
                maxEval = Math.max(maxEval, evaluation);
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha) break;
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < TOTAL_CELLS; i++) {
            if (board[i] === 0) {
                board[i] = human;
                let evaluation = alphaBeta(board, depth + 1, alpha, beta, true, ai, human);
                board[i] = 0;
                minEval = Math.min(minEval, evaluation);
                beta = Math.min(beta, evaluation);
                if (beta <= alpha) break;
            }
        }
        return minEval;
    }
}

function evaluate(board, ai, human) {
    const winner = checkWinner(board);
    if (winner === ai) return 100000;
    if (winner === human) return -100000;
    if (!board.includes(0)) return 0;
    return null;
}

function heuristic(board, ai, human) {
    let score = 0;
    for (const combo of winningCombos) {
        let countAi = 0, countHuman = 0;
        for (const pos of combo) {
            if (board[pos] === ai) countAi++;
            else if (board[pos] === human) countHuman++;
        }
        if (countHuman === 0) score += Math.pow(10, countAi);
        if (countAi === 0) score -= Math.pow(10, countHuman);
    }
    return score;
}

function findThreatMove(board, player, threatLevel) {
    for (const combo of winningCombos) {
        let line = combo.map(i => board[i]);
        let countPlayer = line.filter(v => v === player).length;
        let countEmpty = line.filter(v => v === 0).length;
        if (countPlayer === threatLevel && countEmpty === WIN_LENGTH - threatLevel) {
            for (const pos of combo) {
                if (board[pos] === 0) return pos;
            }
        }
    }
    return null;
}

function determinarRol(board) {
    for (let i = 0; i < TOTAL_CELLS; i++) {
        if (board[i] === marcas.cruz) {
            return marcas.circulo;
        }
    }
    return marcas.cruz;
}

// ================== SERVIDOR ==================
const express = require('express');
const app = express();
const PORT = 3002;

// GET /move?board=[0,1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
app.get('/move', (req, res) => {
    let boardParam = req.query.board;
    let board;
    try {
        board = JSON.parse(boardParam);
    } catch (e) {
        return res.status(400).json({ error: 'Parámetro board inválido. Debe ser un array JSON.' });
    }
    if (!Array.isArray(board) || board.length !== TOTAL_CELLS) {
        return res.status(400).json({ error: `El tablero debe ser un array de ${TOTAL_CELLS} posiciones.` });
    }

    const ganador = checkWinner(board);
    if (ganador) {
        return res.json({ resultado: ganador });
    }

    if (simbolo === 0) {
        simbolo = determinarRol(board);
    }

    const movimientoIA = iaMove(board);
    board[movimientoIA] = simbolo;

    res.json({ movimiento: movimientoIA, tablero: board });
});

// SOLO ejecutar el servidor si es el archivo principal
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor de tateti 5x5 escuchando en el puerto ${PORT}`);
    });
}

// UN SOLO module.exports
module.exports = {
    iaMove,
    checkWinner,
    determinarRol,
    generateWinningCombos,
    findThreatMove,
    heuristic,
    evaluate,
    alphaBeta,
    app
};