# 🇨🇴 Departamentos y Ciudades de Colombia (JSON, SQL & Librería npm)

[![CI](https://github.com/KevinAndrey96/json-ciudades-colombia/actions/workflows/ci.yml/badge.svg)](https://github.com/KevinAndrey96/json-ciudades-colombia/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/ciudades-colombia.svg?color=CB3837&logo=npm)](https://www.npmjs.com/package/ciudades-colombia)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](lib/index.d.ts)
[![Municipalities](https://img.shields.io/badge/Municipios-1%2C104-brightgreen?style=flat)]()
[![Departments](https://img.shields.io/badge/Departamentos-32-blue?style=flat)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Colección estandarizada, tipada y actualizada de los **32 departamentos y 1.104 municipios de Colombia** disponible como **librería npm** para Node.js/TypeScript/React/Vue, archivos **JSON** (estructurado y plano), **JSON minificado** para producción web, y scripts **SQL** listos para bases de datos relacionales (MySQL, MariaDB, PostgreSQL).

---

## 📦 Instalación vía npm

```bash
npm install ciudades-colombia
# o con yarn / pnpm / bun:
yarn add ciudades-colombia
pnpm add ciudades-colombia
```

### Uso en TypeScript / JavaScript (ESM & CommonJS):

```typescript
import {
  getDepartamentos,
  getMunicipios,
  buscarMunicipios,
  getDepartamentoPorMunicipio,
  departamentos,
  municipios
} from 'ciudades-colombia';

// 1. Obtener lista de los 32 departamentos
const listaDeptos = getDepartamentos();
console.log(listaDeptos); // ['Amazonas', 'Antioquia', ..., 'Vichada']

// 2. Obtener municipios por nombre o ID (insensible a acentos/mayúsculas)
const ciudadesAntioquia = getMunicipios('antioquia'); // o getMunicipios(1)
console.log(ciudadesAntioquia.includes('Medellín')); // true

// 3. Búsqueda insensible a acentos (ej. buscar 'bogota' sin tilde)
const resultados = buscarMunicipios('bogota');
console.log(resultados);
// [{ id: 495, departamento_id: 12, departamento: 'Cundinamarca', ciudad: 'Bogotá' }]

// 4. Mapear de ciudad a departamento
console.log(getDepartamentoPorMunicipio('Cali')); // 'Valle del Cauca'
```

---

## 📁 Archivos Disponibles

| Archivo | Formato | Descripción | Enlace Raw (CDN) |
|---|---|---|---|
| **`colombia.json`** | JSON | Agrupado por departamentos con su lista de municipios | [Descargar Raw](https://raw.githubusercontent.com/KevinAndrey96/json-ciudades-colombia/master/colombia.json) |
| **`colombia.min.json`** | JSON | Versión compacta y minificada (ideal para frontend / CDN) | [Descargar Raw](https://raw.githubusercontent.com/KevinAndrey96/json-ciudades-colombia/master/colombia.min.json) |
| **`colombia-flat.json`** | JSON | Lista plana normalizada (`id`, `departamento_id`, `departamento`, `ciudad`) | [Descargar Raw](https://raw.githubusercontent.com/KevinAndrey96/json-ciudades-colombia/master/colombia-flat.json) |
| **`colombia.sql`** | SQL | Esquema relacional DDL e instrucciones `INSERT` para SQL | [Descargar Raw](https://raw.githubusercontent.com/KevinAndrey96/json-ciudades-colombia/master/colombia.sql) |
| **`cities.json`** | JSON | Archivo original exportado para compatibilidad hacia atrás | [Descargar Raw](https://raw.githubusercontent.com/KevinAndrey96/json-ciudades-colombia/master/cities.json) |

---

## 📊 Estructura de los Datos

### Formato Agrupado (`colombia.json`)
```json
[
  {
    "id": 0,
    "departamento": "Amazonas",
    "ciudades": [
      "Leticia",
      "Puerto Nariño"
    ]
  },
  {
    "id": 1,
    "departamento": "Antioquia",
    "ciudades": [
      "Medellín",
      "Bello",
      "Envigado",
      "Itagüí",
      "Rionegro"
    ]
  }
]
```

### Formato Plano Normalizado (`colombia-flat.json`)
```json
[
  {
    "id": 1,
    "departamento_id": 0,
    "departamento": "Amazonas",
    "ciudad": "Leticia"
  },
  {
    "id": 3,
    "departamento_id": 1,
    "departamento": "Antioquia",
    "ciudad": "Medellín"
  }
]
```

---

## 💻 Ejemplos de Integración

### 1. JavaScript / TypeScript (Fetch directo vía CDN)
```javascript
const URL = 'https://raw.githubusercontent.com/KevinAndrey96/json-ciudades-colombia/master/colombia.min.json';

async function cargarColombia() {
  const response = await fetch(URL);
  const departamentos = await response.json();
  
  // Imprimir departamentos
  departamentos.forEach(d => {
    console.log(`${d.departamento} tiene ${d.ciudades.length} municipios.`);
  });
}

cargarColombia();
```

### 2. React / Vue / Angular (Selects en Cascada)
```javascript
import React, { useState, useEffect } from 'react';

export default function SelectorUbicacion() {
  const [data, setData] = useState([]);
  const [selectedDepto, setSelectedDepto] = useState('');
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/KevinAndrey96/json-ciudades-colombia/master/colombia.min.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  const handleDeptoChange = (e) => {
    const deptoNombre = e.target.value;
    setSelectedDepto(deptoNombre);
    const encontrado = data.find(d => d.departamento === deptoNombre);
    setCiudades(encontrado ? encontrado.ciudades : []);
  };

  return (
    <div>
      <select onChange={handleDeptoChange} value={selectedDepto}>
        <option value="">Selecciona Departamento</option>
        {data.map(d => (
          <option key={d.id} value={d.departamento}>{d.departamento}</option>
        ))}
      </select>

      <select disabled={!ciudades.length}>
        <option value="">Selecciona Ciudad / Municipio</option>
        {ciudades.map((c, i) => (
          <option key={i} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
```

### 3. Python (Pandas & Dict)
```python
import json
import urllib.request

url = "https://raw.githubusercontent.com/KevinAndrey96/json-ciudades-colombia/master/colombia-flat.json"
req = urllib.request.urlopen(url)
ciudades = json.loads(req.read().decode())

print(f"Total registros cargados: {len(ciudades)}")
# Filtrar municipios de Cundinamarca
cundinamarca = [c['ciudad'] for c in ciudades if c['departamento'] == 'Cundinamarca']
print("Municipios de Cundinamarca:", len(cundinamarca))
```

### 4. PHP / Laravel Database Seeder
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ColombiaLocationSeeder extends Seeder
{
    public function run()
    {
        $json = File::get(base_path('colombia.json'));
        $departamentos = json_decode($json, true);

        foreach ($departamentos as $depto) {
            $deptoId = DB::table('departamentos')->insertGetId([
                'id' => $depto['id'],
                'nombre' => $depto['departamento']
            ]);

            $ciudadesData = array_map(function ($ciudad) use ($deptoId) {
                return [
                    'departamento_id' => $deptoId,
                    'nombre' => $ciudad,
                ];
            }, $depto['ciudades']);

            DB::table('ciudades')->insert($ciudadesData);
        }
    }
}
```

### 5. Importar directamente en MySQL / MariaDB / PostgreSQL
```bash
# Para MySQL / MariaDB
mysql -u root -p nombre_basedatos < colombia.sql

# Para PostgreSQL
psql -U postgres -d nombre_basedatos -f colombia.sql
```

---

## 🏷️ Lista de Departamentos Incluidos (32 + Bogotá D.C.)
- Amazonas
- Antioquia
- Arauca
- Atlántico
- Bogotá D.C.
- Bolívar
- Boyacá
- Caldas
- Caquetá
- Casanare
- Cauca
- Cesar
- Chocó
- Córdoba
- Cundinamarca
- Guainía
- Guaviare
- Huila
- La Guajira
- Magdalena
- Meta
- Nariño
- Norte de Santander
- Putumayo
- Quindío
- Risaralda
- San Andrés y Providencia
- Santander
- Sucre
- Tolima
- Valle del Cauca
- Vaupés
- Vichada

---

## 🤝 Contribuciones
Las contribuciones, mejoras de ortografía o ajustes de nomenclatura DANE son bienvenidas mediante Pull Requests o creando un Issue.

## 📄 Licencia
Distribuido bajo la licencia [MIT](LICENSE). Libre para uso personal y comercial.

---

**Autor:** [Kevin Andrey Herrera Silva](https://github.com/KevinAndrey96) · Bogotá, Colombia 🇨🇴
