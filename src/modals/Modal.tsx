import "./modal.css";

interface ModalProps {
  abrirModal: Boolean;
  children: React.ReactNode;
}

function Modal({ children, abrirModal }: ModalProps) {
  return (
    <article className={`modals ${abrirModal && "isOpen"}`}>
      <div className="modalContainer">
        {/* <button className="modalClose">X</button> */}
        {children}
      </div>
    </article>
  );
}
export default Modal;
