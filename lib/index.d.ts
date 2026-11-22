export interface Departamento {
  id: number;
  departamento: string;
  ciudades: string[];
}

export interface MunicipioPlano {
  id: number;
  departamento_id: number;
  departamento: string;
  ciudad: string;
}

/** Lista anidada de los 32 departamentos y sus municipios */
export declare const departamentos: Departamento[];

/** Lista plana de los 1.104 municipios con id de departamento */
export declare const municipios: MunicipioPlano[];

/**
 * Retorna los nombres de los 32 departamentos de Colombia.
 */
export declare function getDepartamentos(): string[];

/**
 * Obtiene los municipios de un departamento dado su nombre o ID numérico.
 * Insensible a mayúsculas y acentos.
 * @param departamento Nombre del departamento (ej. 'Antioquia') o su ID numérico (ej. 1).
 */
export declare function getMunicipios(departamento: string | number): string[];

/**
 * Busca municipios por coincidencia parcial de texto.
 * Insensible a mayúsculas y acentos (ej. buscar 'medellin' encuentra 'Medellín').
 * @param query Texto a buscar en el nombre del municipio.
 */
export declare function buscarMunicipios(query: string): MunicipioPlano[];

/**
 * Retorna el nombre del departamento al que pertenece un municipio.
 * @param ciudad Nombre del municipio.
 */
export declare function getDepartamentoPorMunicipio(ciudad: string): string | null;

declare const _default: Departamento[];
export default _default;
