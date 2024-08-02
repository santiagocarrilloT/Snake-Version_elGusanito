import styles from "./puntaje.module.css";
import ImagenPuntaje from "../Img/Manuela.png";
import ImagenRecord from "../Img/Yaper.png";

interface ProposPuntaje {
  puntaje: number;
  record: number;
}
function Puntaje({ puntaje, record }: ProposPuntaje) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.classDiv1}>
        <img
          className={styles.imagenPuntaje}
          src={ImagenPuntaje}
          alt="Puntaje"
        />
        <label className={styles.textoInformacion}>{puntaje}</label>
      </div>
      <div className={styles.classDiv2}>
        <img className={styles.imagenRecord} src={ImagenRecord} alt="Record" />
        <label className={styles.textoInformacion}>{record}</label>
      </div>
    </div>
  );
}

export default Puntaje;
