'use strict';

const path = require('path');
const departamentos = require(path.join(__dirname, '..', 'colombia.json'));
const municipios = require(path.join(__dirname, '..', 'colombia-flat.json'));

function normalize(text) {
  if (typeof text !== 'string') return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getDepartamentos() {
  return departamentos.map(d => d.departamento);
}

function getMunicipios(departamento) {
  if (typeof departamento === 'number') {
    const found = departamentos.find(d => d.id === departamento);
    return found ? found.ciudades : [];
  }
  const norm = normalize(String(departamento));
  const found = departamentos.find(d => normalize(d.departamento) === norm);
  return found ? found.ciudades : [];
}

function buscarMunicipios(query) {
  if (!query || typeof query !== 'string') return [];
  const norm = normalize(query);
  return municipios.filter(m => normalize(m.ciudad).includes(norm));
}

function getDepartamentoPorMunicipio(ciudad) {
  if (!ciudad || typeof ciudad !== 'string') return null;
  const norm = normalize(ciudad);
  const found = municipios.find(m => normalize(m.ciudad) === norm);
  return found ? found.departamento : null;
}

module.exports = departamentos;
module.exports.default = departamentos;
module.exports.departamentos = departamentos;
module.exports.municipios = municipios;
module.exports.getDepartamentos = getDepartamentos;
module.exports.getMunicipios = getMunicipios;
module.exports.buscarMunicipios = buscarMunicipios;
module.exports.getDepartamentoPorMunicipio = getDepartamentoPorMunicipio;
