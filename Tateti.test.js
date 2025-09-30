// Tateti.test.js
const { iaMove, findWinningMove, determinarRol, marcas, resetSimbolo } = require('./tateti');

describe('Pruebas de iaMove y helpers', () => {

  beforeEach(() => {
    resetSimbolo(); // resetea la variable simbolo antes de cada test
  });

  test('1. La IA devuelve un índice válido (0-8)', () => {
    const board = [0,0,0,0,0,0,0,0,0];
    const resultado = iaMove(board);
    expect(resultado).toBeGreaterThanOrEqual(0);
    expect(resultado).toBeLessThanOrEqual(8);
  });

  test('2. findWinningMove detecta la jugada ganadora', () => {
    const board = [marcas.cruz, marcas.cruz, 0, 0, 0, 0, 0, 0, 0];
    const move = findWinningMove(board, marcas.cruz);
    expect(move).toBe(2);
  });

  test('3. determinarRol devuelve circulo si ya hay una cruz', () => {
    const board = [marcas.cruz, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(determinarRol(board)).toBe(marcas.circulo);
  });

  test('4. determinarRol devuelve cruz si no hay cruces', () => {
    const board = [0,0,0,0,0,0,0,0,0];
    expect(determinarRol(board)).toBe(marcas.cruz);
  });

  test('5. La constante marcas tiene cruz, circulo y vacio', () => {
    expect(marcas).toHaveProperty('cruz');
    expect(marcas).toHaveProperty('circulo');
    expect(marcas).toHaveProperty('vacio');
  });

  test('6. La IA bloquea un posible triunfo del jugador', () => {
    const board = [marcas.cruz, marcas.cruz, 0, 0, 0, 0, 0, 0, 0];
    const move = iaMove(board);
    expect(move).toBe(2);
  });

  test('7. La IA gana si tiene la oportunidad', () => {
    const board = [marcas.circulo, marcas.circulo, 0, 0, 0, 0, 0, 0, 0];
    const move = iaMove(board);
    expect(move).toBe(2);
  });

  test('8. La IA elige centro si está libre', () => {
    const board = [0,0,0,0,0,0,0,0,0];
    const move = iaMove(board);
    expect(move).toBe(4);
  });

});
