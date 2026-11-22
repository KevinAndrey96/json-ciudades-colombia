const test = require('node:test');
const assert = require('node:assert');
const lib = require('../lib/index.js');
const {
  departamentos,
  municipios,
  getDepartamentos,
  getMunicipios,
  buscarMunicipios,
  getDepartamentoPorMunicipio
} = lib;

test('Dataset integrity: 32 departments and 1104 municipalities', () => {
  assert.strictEqual(departamentos.length, 32);
  assert.strictEqual(municipios.length, 1104);
});

test('getDepartamentos returns exactly 32 names', () => {
  const depts = getDepartamentos();
  assert.strictEqual(depts.length, 32);
  assert.ok(depts.includes('Antioquia'));
  assert.ok(depts.includes('Cundinamarca'));
  assert.ok(depts.includes('Valle del Cauca'));
});

test('getMunicipios by name (accent and case insensitive)', () => {
  const antioquia1 = getMunicipios('Antioquia');
  const antioquia2 = getMunicipios('antioquia');
  assert.ok(antioquia1.length > 100);
  assert.deepStrictEqual(antioquia1, antioquia2);
  assert.ok(antioquia1.includes('Medellín'));
});

test('getMunicipios by ID', () => {
  const antioquia = getMunicipios(1);
  assert.ok(antioquia.length > 100);
  assert.ok(antioquia.includes('Medellín'));
});

test('buscarMunicipios with accent and case insensitivity', () => {
  // Searching 'medellin' without accent should find 'Medellín'
  const results = buscarMunicipios('medellin');
  assert.ok(results.length >= 1);
  assert.strictEqual(results[0].ciudad, 'Medellín');
  assert.strictEqual(results[0].departamento, 'Antioquia');

  // Searching 'bogota' without accent should find 'Bogotá'
  const bogota = buscarMunicipios('bogota');
  assert.ok(bogota.length >= 1);
  assert.strictEqual(bogota[0].ciudad, 'Bogotá');
  assert.strictEqual(bogota[0].departamento, 'Cundinamarca');
});

test('getDepartamentoPorMunicipio correctly maps capital and regional cities', () => {
  assert.strictEqual(getDepartamentoPorMunicipio('Medellín'), 'Antioquia');
  assert.strictEqual(getDepartamentoPorMunicipio('medellin'), 'Antioquia');
  assert.strictEqual(getDepartamentoPorMunicipio('Bogotá'), 'Cundinamarca');
  assert.strictEqual(getDepartamentoPorMunicipio('Cali'), 'Valle del Cauca');
  assert.strictEqual(getDepartamentoPorMunicipio('Barranquilla'), 'Atlántico');
  assert.strictEqual(getDepartamentoPorMunicipio('NonExistentCity'), null);
});
