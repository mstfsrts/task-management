import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
