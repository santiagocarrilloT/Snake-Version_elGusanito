import { ReactNode, useMemo } from "react";
import styles from "./Area.module.css";
import React from "react";

let filaRand = 12;
let colRand = 6;
let posManzana = posicionManzana(0, 0);
let posLimites = limiteArea(9999, 9999);
export let puntaje = 0;

interface PropsArea extends PropsGusanito {
  columnas: number;
  filas: number;
  //children: React.ReactNode;
}

interface PropsGusanito {
  tamGusanito: number[][];
}

function Area({ columnas, filas, tamGusanito }: PropsArea) {
  //Enviar los 2 parámetros de la función encargada de validar el aumento del tamaño del gusanito
  posManzana = useMemo(
    () => posicionManzana(filas, columnas),
    [filas, columnas]
  );
  posLimites = useMemo(() => limiteArea(filas, columnas), [filas, columnas]);

  //Componente encargado de renderizar las celdas
  const Celda = React.memo(
    ({ className }: { f: number; c: number; className: string }) => (
      <td className={className}>{/*f + ", " + c*/}</td>
    )
  );

  //Precalcular las clases de las celdas
  const clasesCeldas = useMemo(
    () =>
      Array.from({ length: filas }).map((_, f) =>
        Array.from({ length: columnas }).map((_, c) =>
          (f % 2 === 0 && c % 2 === 0) || (f % 2 !== 0 && c % 2 !== 0)
            ? styles.areas1
            : styles.areas2
        )
      ),
    [filas, columnas]
  );
  //Conseguir la ultima posición del gusanito
  const cabezaGusano = tamGusanito[tamGusanito.length - 1];
  return (
    <table className={[styles.areaBorder].join(" ")}>
      <tbody>
        {Array.from({ length: filas }, (_, f) => (
          <tr key={f} className={[styles.areaTd].join(" ")}>
            {Array.from({ length: columnas }, (_, c) => (
              <Celda
                key={c}
                f={f}
                c={c}
                className={
                  `${clasesCeldas[f][c]} ${
                    f == cabezaGusano[0] && c == cabezaGusano[1]
                      ? styles.gusanitoCabeza
                      : tamGusanito.slice(1).some((e) => e[0] == f && e[1] == c)
                      ? styles.gusanito
                      : c == colRand && f == filaRand
                      ? styles.manzana
                      : ""
                  }`
                  /*f == cabezaGusano[0] && c == cabezaGusano[1]
                    ? styles.gusanitoCabeza
                    : tamGusanito.slice(1).some((e) => e[0] == f && e[1] == c)
                    ? styles.gusanito
                    : c == colRand && f == filaRand
                    ? [styles.manzana, styles.fondoCuadricula] + ""
                    : clasesCeldas[f][c]*/
                }
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function posicionManzana(filas: number, columnas: number) {
  return function () {
    filaRand = Math.floor(Math.random() * filas);
    colRand = Math.floor(Math.random() * columnas);
  };
}

//Función encargada de mover el gusanito
export function movimientos(
  elGusanito: number[][],
  direccion: number,
  direction: string,
  operacion: (a: number) => number
) {
  // Cabeza del gusanito que será el punto de referencia
  let cabezaGusanito = [elGusanito[0][0], elGusanito[0][1]];

  // Variable que valida si se puede avanzar en esa dirección
  let noMover = false;

  let nuevoGusanito = [...elGusanito];
  /*let head = [
    nuevoGusanito[nuevoGusanito.length - 1][0],
    nuevoGusanito[nuevoGusanito.length - 1][1],
  ];*/

  nuevoGusanito.forEach((segmento, index) => {
    if (index === 0) {
      // Cabeza del gusanito
      if (
        !validarGolpe([segmento], nuevoGusanito) &&
        posLimites(cabezaGusanito[0], cabezaGusanito[1])
      ) {
        segmento[direccion] = operacion(segmento[direccion]);
      } else {
        noMover = true;
        window.location.reload();
      }
    } else if (!noMover) {
      // Mover el resto del gusanito
      const posicionActual = [segmento[0], segmento[1]];
      segmento[0] = cabezaGusanito[0];
      segmento[1] = cabezaGusanito[1];
      cabezaGusanito = posicionActual;
    }
  });

  if (aumentarTamañoGusanito(nuevoGusanito[0][0], nuevoGusanito[0][1])) {
    posManzana();
    puntaje += 1;
    nuevoGusanito.push([cabezaGusanito[0], cabezaGusanito[1]]);
  }

  return nuevoGusanito.reverse();
  // Actualizar la posición de la cabeza
  /*switch (direction) {
    case "UP":
      head[0] -= 1;
      break;
    case "DOWN":
      head[0] += 1;
      break;
    case "LEFT":
      head[1] -= 1;
      break;
    case "RIGHT":
      head[1] += 1;
      break;
    default:
      break;
  }

  // Validar colisión con los límites o con el cuerpo
  if (!posLimites(head[0], head[1]) || validarGolpe([head], nuevoGusanito)) {
    // Aquí deberías manejar el reinicio del juego de forma más eficiente
    // por ejemplo, estableciendo un estado inicial
    console.log("Game Over");
    return nuevoGusanito;
  }

  // Agregar la nueva cabeza al gusanito
  nuevoGusanito.push(head);

  // Verificar si se ha comido una manzana
  if (aumentarTamañoGusanito(head[0], head[1])) {
    posManzana();
    puntaje += 1;
  } else {
    // Si no se ha comido una manzana, remover la cola
    nuevoGusanito.shift();
  }

  return nuevoGusanito;*/
}

function validarGolpe(cabezaGusanito: number[][], gusanito: number[][]) {
  //Eliminar la cabeza del gusanito para validar correctamente
  gusanito = gusanito.slice(1);
  //Validar si la cabeza del gusanito choca con el cuerpo
  return gusanito.some(
    (e) => e[0] == cabezaGusanito[0][0] && e[1] == cabezaGusanito[0][1]
  );
}

function limiteArea(fila: number, columna: number) {
  return function (cabezaFil: number, cabezaCol: number) {
    return (
      cabezaFil < fila &&
      cabezaCol < columna &&
      cabezaFil >= 0 &&
      cabezaCol >= 0
    );
  };
}

function aumentarTamañoGusanito(filaGus: number, colGus: number) {
  return filaGus == filaRand && colGus == colRand;
}

export function aumentarVelocidad(velocidad: number) {
  return velocidad - 10;
}

export default Area;
