import Area, { movimientos, puntaje } from "./area/Area";
import Modal from "./modals/Modal";
import "./App.css";
import Puntaje from "./puntaje/Puntaje";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Blessd from "./Img/Blessd.png";

function App() {
  const columnas = 17; //17;
  const filas = 15; //15;

  let ultimoTiempo = useRef<number | null>(null); // Almacena el último tiempo de ejecución
  let frameId = useRef<number | null>(null); // ID del frame de animación para poder cancelarlo

  const [habilitarModal1, setHabilitarModal1] = useState(true);
  const [habilitarModal2, setHabilitarModal2] = useState(false);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const minSwipeDistance = 50;
  // useState para almacenar la posicion y tamaño del gusanito
  const [tamGusanito, setTamGusanito] = useState([
    [3, 6],
    [3, 5],
    [4, 5],
    [4, 4],
    [4, 3],
    [5, 3],
    [6, 3],
  ]);

  let direccion = useRef([true, false, false, false]);

  const handleUp = () => {
    if (!direccion.current[0]) {
      direccion.current = [false, true, false, false];
      iniciarMovimiento(() => {
        setTamGusanito((tamGusanito) => {
          const tamGusanitoReversed = [...tamGusanito].reverse();
          return movimientos(tamGusanitoReversed, 0, "UP", (a) => a - 1);
        });
      });
    } else {
      iniciarMovimiento(() => {
        setTamGusanito((tamGusanito) => {
          const tamGusanitoReversed = [...tamGusanito].reverse();
          return movimientos(tamGusanitoReversed, 0, "DOWN", (a) => a + 1);
        });
      });
    }
  };

  const handleDown = () => {
    if (!direccion.current[1]) {
      direccion.current = [true, false, false, false];
      iniciarMovimiento(() => {
        setTamGusanito((tamGusanito) => {
          const tamGusanitoReversed = [...tamGusanito].reverse();
          return movimientos(tamGusanitoReversed, 0, "DOWN", (a) => a + 1);
        });
      });
    } else {
      iniciarMovimiento(() => {
        setTamGusanito((tamGusanito) => {
          const tamGusanitoReversed = [...tamGusanito].reverse();
          return movimientos(tamGusanitoReversed, 0, "UP", (a) => a - 1);
        });
      });
    }
  };

  const handleRight = () => {
    if (!direccion.current[2]) {
      direccion.current = [false, false, false, true];
      iniciarMovimiento(() => {
        setTamGusanito((tamGusanito) => {
          const tamGusanitoReversed = [...tamGusanito].reverse();
          return movimientos(tamGusanitoReversed, 1, "RIGHT", (a) => a + 1);
        });
      });
    } else {
      iniciarMovimiento(() => {
        setTamGusanito((tamGusanito) => {
          const tamGusanitoReversed = [...tamGusanito].reverse();
          return movimientos(tamGusanitoReversed, 1, "LEFT", (a) => a - 1);
        });
      });
    }
  };

  const handleLeft = () => {
    if (!direccion.current[3]) {
      direccion.current = [false, false, true, false];
      iniciarMovimiento(() => {
        setTamGusanito((tamGusanito) => {
          const tamGusanitoReversed = [...tamGusanito].reverse();
          return movimientos(tamGusanitoReversed, 1, "LEFT", (a) => a - 1);
        });
      });
    } else {
      iniciarMovimiento(() => {
        setTamGusanito((tamGusanito) => {
          const tamGusanitoReversed = [...tamGusanito].reverse();
          return movimientos(tamGusanitoReversed, 1, "RIGHT", (a) => a + 1);
        });
      });
    }
  };

  const cancelarAnimacion = () => {
    if (frameId.current) {
      cancelAnimationFrame(frameId.current);
      frameId.current = null;
    }
  };

  const iniciarMovimiento = (direccionFunc: () => void) => {
    cancelarAnimacion();
    const ejecutarMovimiento = (tiempoActual: number) => {
      if (!ultimoTiempo.current || tiempoActual - ultimoTiempo.current >= 120) {
        direccionFunc();
        ultimoTiempo.current = tiempoActual;
      }
      frameId.current = requestAnimationFrame(ejecutarMovimiento);
    };
    frameId.current = requestAnimationFrame(ejecutarMovimiento);
  };

  const presionTecla = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        handleUp();
        break;
      case "ArrowDown":
        handleDown();
        break;
      case "ArrowLeft":
        handleLeft();
        break;
      case "ArrowRight":
        handleRight();
        break;
      case "Escape":
        if (frameId) {
          cancelAnimationFrame(frameId.current!);
        }
        setHabilitarModal1(true);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    //Agregar el evento de presionar tecla
    document.addEventListener("keydown", presionTecla);

    //Eliminar el evento de presionar tecla
    return () => {
      document.removeEventListener("keydown", presionTecla);
      cancelarAnimacion();
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];

    const x = touchStartRef.current!.x - touch.clientX;
    const y = touchStartRef.current!.y - touch.clientY;

    if (Math.abs(x) > Math.abs(y)) {
      if (x > 0) {
        handleLeft();
      } else {
        handleRight();
      }
    } else {
      if (y > 0) {
        handleUp();
      } else {
        handleDown();
      }
    }
  };

  function handleTouchEnd(id: string) {
    console.log(id);
  }

  return (
    <>
      <article>
        <Modal abrirModal={habilitarModal1}>
          <div>
            <img className="logoBlessd" src={Blessd} alt="Blessd" />
          </div>
          <div>
            <button
              className="botonModal"
              onClick={() => setHabilitarModal1(false)}
            >
              Jugar
            </button>
            <button
              className="botonModal"
              onClick={() => {
                setHabilitarModal1(false);
                setHabilitarModal2(true);
              }}
            >
              Personajes
            </button>
          </div>
        </Modal>
        <Modal abrirModal={habilitarModal2}>
          <div className="centrarPersonajes">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img
                      id="person1"
                      onClick={(e) => handleTouchEnd(e.currentTarget.id)}
                      className="personajes"
                      src={Blessd}
                      alt="Person1"
                    />
                  </td>
                  <td>
                    <img
                      id="person2"
                      onClick={(e) => handleTouchEnd(e.currentTarget.id)}
                      className="personajes"
                      src={Blessd}
                      alt="Person2"
                    />
                  </td>
                  <td>
                    <img
                      id="person3"
                      onClick={(e) => handleTouchEnd(e.currentTarget.id)}
                      className="personajes"
                      src={Blessd}
                      alt="Person3"
                    />
                  </td>
                  <td>
                    <img
                      id="person4"
                      onClick={(e) => handleTouchEnd(e.currentTarget.id)}
                      className="personajes"
                      src={Blessd}
                      alt="Person4"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <button
              className="botonModal"
              onClick={() => {
                setHabilitarModal2(false);
                setHabilitarModal1(true);
              }}
            >
              Volver
            </button>
          </div>
        </Modal>
      </article>

      <div
        style={{ width: "100%", height: "100%", margin: "120", padding: "200" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <Puntaje record={0} puntaje={puntaje} />
        <div>
          <Area columnas={columnas} filas={filas} tamGusanito={tamGusanito} />
        </div>
      </div>
    </>
  );
}

/*function touchFuntions(action: string) {
  return (e: React.TouchEvent) => {
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

    const minSwipeDistance = 50;

    switch (action) {
      case "start":
        return setTouchStart({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      case "mover":
        return setTouchEnd({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      case "end":
        const x = touchStart.x - touchEnd.x;
        const y = touchStart.y - touchEnd.y;

        if (Math.abs(x) > minSwipeDistance || Math.abs(y) > minSwipeDistance) {
          if (x > 0) {
            console.log("left");
          } else {
            console.log("right");
          }
        } else {
          if (y > 0) {
            console.log("up");
          } else {
            console.log("down");
          }
        }
        break;
      default:
        break;
    }
  };
}*/
export default App;
