import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import Cart from "./Cart";
import Checkout from "./Checkout";
function Modal({ onOpen, onClose }) {
  const { calculateTotalPrice } = useContext(CartContext);
  const [isCheckOut, setIsCheckOut] = useState(false);
  function handleCheckOut() {
    setIsCheckOut(true);

    calculateTotalPrice();
  }
  const dialog = useRef();
  useEffect(() => {
    if (onOpen) {
      dialog.current.showModal();
      calculateTotalPrice();
      setIsCheckOut(false);
    } else {
      dialog.current.close();
    }
  }, [onOpen]);
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {onOpen && (
        <>
          {!isCheckOut && (
            <>
              <Cart
                onClose={onClose}
                isCheckOut={isCheckOut}
                handleCheckOut={handleCheckOut}
              />
            </>
          )}
          {isCheckOut && <Checkout isCheckOut={isCheckOut} onClose={onClose} />}
        </>
      )}
    </dialog>,
    document.getElementById("modal")
  );
}
export default Modal;
