//import React from "react";

interface PropsButton {
  randomFil: number;
  randomCol: number;
  onClick: () => void;
}

interface PropsButtonGusanito {
  direccion: string;
  onClick: () => void;
}

function Button({ randomCol, randomFil, onClick }: PropsButton) {
  return (
    <button type="button" onClick={onClick}>
      {randomFil + " " + randomCol}
    </button>
  );
}

export function ButtonGusanito({ direccion, onClick }: PropsButtonGusanito) {
  return (
    <button type="button" onClick={onClick}>
      {direccion}
    </button>
  );
}

export default Button;
