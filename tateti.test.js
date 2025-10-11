const request = require('supertest');

// Importamos las funciones desde el archivo principal
const {
    iaMove,
    checkWinner,
    determinarRol,
    generateWinningCombos,
    findThreatMove,
    app
} = require('./tateti-5x5');

describe('🧩 Pruebas del juego Tateti 5x5', () => {

    test('1️⃣ Genera correctamente las combinaciones ganadoras', () => {
        const combos = generateWinningCombos(5, 4);
        expect(combos.length).toBeGreaterThan(0);
        expect(Array.isArray(combos[0])).toBe(true);
    });

    test('2️⃣ Determina el rol correctamente', () => {
        const board = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const rol = determinarRol(board);
        expect(rol).toBe(2); // Si hay X, debe jugar O
    });

    test('3️⃣ Detecta ganador horizontal', () => {
        const board = [
            1, 1, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ];
        expect(checkWinner(board)).toBe(1);
    });


    test('5️⃣ La IA bloquea un posible triunfo del jugador', () => {
        const board = [
            1, 1, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ];
        const move = findThreatMove(board, 1, 3);
        expect(move).toBe(3);
    });

    test('6️⃣ La IA devuelve un índice válido para mover', () => {
        const board = new Array(25).fill(0);
        const move = iaMove(board);
        expect(move).toBeGreaterThanOrEqual(0);
        expect(move).toBeLessThan(25);
    });

    test('7️⃣ El endpoint /move responde con un movimiento válido', async () => {
        const board = new Array(25).fill(0);
        const res = await request(app)
            .get(`/move?board=${JSON.stringify(board)}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.movimiento).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(res.body.tablero)).toBe(true);
    });

    test('8️⃣ El endpoint rechaza un parámetro inválido', async () => {
        const res = await request(app)
            .get('/move?board=INVALID');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBeDefined();
    });
});