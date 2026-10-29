# Zonas críticas de un perno

Aplicación web interactiva que ilustra dónde tienden a concentrarse los esfuerzos en un perno según las condiciones de carga. La visualización permite explorar y comparar cuatro casos: tracción axial, flexión, cortante y torsión de apriete.

El esquema identifica zonas como la primera rosca engranada, la salida de rosca, el filete bajo la cabeza, el plano de corte entre placas y el contacto con el agujero. Los colores y las etiquetas indican de forma cualitativa la severidad relativa de cada zona para el caso seleccionado.

## Contenido del repositorio

- `index.html`: estructura de la página y esquema SVG del perno, las placas y las cargas.
- `src/main.ts`: lógica de interacción y actualización de las zonas críticas según el caso seleccionado.
- `src/style.css`: estilos de la interfaz y de la visualización.
- `package.json` y `package-lock.json`: dependencias y comandos del proyecto.
- `tsconfig.json`: configuración de TypeScript.

## Requisitos

- Node.js (versión compatible con Vite 8).
- npm, incluido con Node.js.

## Instalación y ejecución

Clona el repositorio y entra en su directorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <DIRECTORIO_DEL_REPOSITORIO>
```

Reemplaza los valores entre `< >` por la URL y el nombre de carpeta correspondientes.

Instala las dependencias:

```bash
npm install
```

Inicia el servidor local de desarrollo:

```bash
npm run dev
```

Abre en el navegador la dirección local que muestre Vite en la terminal.

## Comandos disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve localmente la versión generada para revisarla.

## Alcance

La visualización es esquemática y cualitativa: ayuda a entender cómo puede variar la concentración de esfuerzos en distintas zonas del perno, pero no reemplaza cálculos de diseño, análisis de fatiga ni una evaluación de ingeniería para una unión real.
