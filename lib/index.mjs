import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

export const departamentos = require(join(__dirname, '..', 'colombia.json'));
export const municipios = require(join(__dirname, '..', 'colombia-flat.json'));

function normalize(text) {
  if (typeof text !== 'string') return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function getDepartamentos() {
  return departamentos.map(d => d.departamento);
}

export function getMunicipios(departamento) {
  if (typeof departamento === 'number') {
    const found = departamentos.find(d => d.id === departamento);
    return found ? found.ciudades : [];
  }
  const norm = normalize(String(departamento));
  const found = departamentos.find(d => normalize(d.departamento) === norm);
  return found ? found.ciudades : [];
}

export function buscarMunicipios(query) {
  if (!query || typeof query !== 'string') return [];
  const norm = normalize(query);
  return municipios.filter(m => normalize(m.ciudad).includes(norm));
}

export function getDepartamentoPorMunicipio(ciudad) {
  if (!ciudad || typeof ciudad !== 'string') return null;
  const norm = normalize(ciudad);
  const found = municipios.find(m => normalize(m.ciudad) === norm);
  return found ? found.departamento : null;
}

export default departamentos;
