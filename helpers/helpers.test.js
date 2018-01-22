const helpers = require('./helpers');

/* normalizePort function */
test('Should return the exact port given', () => {
  expect(helpers.normalizePort(3001)).toBe(3001);
});

test('Should return false with a negative port', () => {
  expect(helpers.normalizePort(-3001)).toBe(false);
});

test('Should return port (int) with a port (string) given', () => {
  expect(helpers.normalizePort('3001')).toBe(3001);
});

test('Should return false with a negative port (string) given', () => {
  expect(helpers.normalizePort('-3001')).toBe(false);
});
