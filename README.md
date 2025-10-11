[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Uc_kVv2r)


# Proyecto: TA-TE-TI 5X5

*Participantes:* Ariadna Santillan, Roman Acuña, Oriana Moyano, Santiago Marranti  
*Profesor:* Christian Di Guardia  



Un servidor de Tateti (Cuatro en Línea) 5x5 con Inteligencia Artificial implementado en Node.js.
  ¿Qué hace este proyecto?
Este proyecto es un servidor web que responde a peticiones HTTP con movimientos de IA para el juego Tateti en un tablero 5x5.

Características principales:
Tablero 5x5 (25 posiciones)

4 en línea para ganar (en lugar de 3 tradicional)

IA inteligente que usa el algoritmo Minimax con poda Alpha-Beta

API REST simple - solo envía el estado del tablero y recibe el movimiento

# ¿Cómo usarlo?
1. Iniciar el servidor
bash
npm start
El servidor estará disponible en: http://localhost:3002

2. Hacer una petición
bash
# Ejemplo: tablero vacío
curl "http://localhost:3002/move?board=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"
3. La respuesta
json
{
  "movimiento": 12,
  "tablero": [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]
}
 API
Endpoint: GET /move
Parámetro:

board: Array JSON de 25 números (0=vacío, 1=X, 2=O)

Respuesta:

movimiento: Índice donde la IA jugó (0-24)

tablero: Estado actualizado del tablero

 La IA
La inteligencia artificial incluye:

Detección de amenazas: Bloquea jugadas ganadoras del oponente

Búsqueda Minimax: Analiza múltiples movimientos futuros

Poda Alpha-Beta: Optimiza el análisis para mayor profundidad

Heurística inteligente: Evalúa posiciones estratégicas

 Tests
Ejecutar las pruebas:

bash
npm test
Los tests verifican:

 Generación de combinaciones ganadoras

 Detección de ganadores

 Lógica de la IA

 Funcionamiento del API

 Tecnologías
Node.js + Express - Servidor web

Jest - Framework de testing

Algoritmos de juego - Minimax + Alpha-Beta


 ## Estructura del proyecto
text
tateti-5x5/
├── tateti-5x5.js     # Servidor principal + IA
├── tateti.test.js    # Tests
├── package.json      # Configuración
└── README.md         # Este archivo





# Proyecto: TA-TE-TI 3x3 

*Participantes:* Ariadna Santillan, Roman Acuña, Oriana Moyano, Santiago Marranti  
*Profesor:* Christian Di Guardia  

Este proyecto implementa un servidor de Ta-Te-Ti (Tres en Raya) que permite jugar contra una IA básica, escrito en JavaScript con Node.js y Express.

## Descripción
- El tablero se representa como un arreglo de 9 posiciones (índices de 0 a 8)
- Cada casillero puede ser:
  - 0 → vacío  
  - 1 → cruz 
  - 2 → círculo 
- Estrategia de la IA:
  1. Gana si puede (busca un movimiento ganador)  
  2. Bloquea al jugador si el rival está por ganar  
  3. Juega al centro, luego esquinas, luego bordes, en ese orden de prioridad

## Tecnologías
- Node.js: entorno de ejecución de JavaScript
- Express: framework para levantar el servidor HTTP

## Instalación y uso
1. Clonar el repositorio
   git clone <URL_DEL_REPO>
   cd <NOMBRE_DEL_PROYECTO>

2. Instalar dependencias
   npm install express 
 
3. Ejecutar el servidor
   node tateti.js

El servidor escuchará por defecto en http://localhost:3000

## Endpoint principal
GET /move - Calcula el próximo movimiento de la IA

Parámetros:
board (query): Un array JSON de 9 elementos con el estado actual del tablero

Ejemplo:
/move?board=[0,1,0,2,0,0,0,0,0]

Respuesta exitosa:
{
  "movimiento": 6,
  "tablero": [0,1,0,2,0,0,2,0,0]
}

movimiento: índice (0–8) donde la IA jugó
tablero: tablero actualizado

Posibles errores:
400 → parámetro inválido o tablero incorrecto 

Lógica principal:
iaMove(board): decide el mejor movimiento
findWinningMove(board, player): busca jugadas ganadoras
checkWinner(board): verifica si hay un ganador o empate

## Ejemplos de rutas y comportamiento de la IA

1. Tablero vacío
Request:
GET /move?board=[0,0,0,0,0,0,0,0,0]

Comportamiento esperado:
La IA juega en el centro (posición 4)

Response (ejemplo):
{
  "movimiento": 4,
  "tablero": [0,0,0,0,2,0,0,0,0]
}

2. Oponente juega en el centro
Request:
GET /move?board=[0,0,0,0,1,0,0,0,0]

Comportamiento esperado:
La IA elige una esquina aleatoria (0, 2, 6 o 8)

Response (ejemplo):
{
  "movimiento": 0,
  "tablero": [2,0,0,0,1,0,0,0,0]
}

(El índice puede variar entre 0, 2, 6, 8) 

# Archivos Docker 

docker build -t tateti-node:1.0 . # Paso 1: Construir la imagen con el nombre tateti-node:1.0
docker run --rm -d -p 3000:3000 --name tateti tateti-node:1.0  # Paso 2: Ejecutar el contenedor en segundo plano
docker stop tateti        # Detiene el contenedor en ejecución
docker rm tateti          # (Opcional) Elimina el contenedor si no usaste --rm
docker rmi tateti-node:1.0  # Borra la imagen de Docker
