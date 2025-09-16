[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Uc_kVv2r)


# ¿Circulo o Cruz?
Para saber si se trata de que jugamos primero (X) o segundo (O) hay que observar si el tablero llega vacio en su totalidad o ya hay un valor en el.

# ¿Como llega el tablero?
El tablero llega por parametro

### "GET /move?board=[0,1,0,2,0,0,0,0,0]"

move seria la instruccion de que la IA 

## Pregunta...

Si no sabés si vas a ser X (jugador 1) o O (jugador 2), necesitás que el árbitro:

Asigne los roles al inicio (ejemplo: responde con "tuMarca": 1 si sos X o "tuMarca": 2 si sos O).