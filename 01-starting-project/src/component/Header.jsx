import { useState, useContext } from "react";
import { CartContext } from "../store/CartContext";
import logo from "../assets/logo.jpg";
import Modal from "./Modal";
export default function Header() {
  const { CartItems } = useContext(CartContext);
  const CartCount = CartItems.length;
  const [openCart, setOpenCart] = useState(false);
  function handleOpenCart() {
    setOpenCart(true);
  }
  function handleCloseCart() {
    setOpenCart(false);
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} />
        <h1> FoodsHere</h1>
      </div>
      <button className="text-button" onClick={handleOpenCart}>
        Cart{CartCount > 0 ? ` (${CartCount})` : ""}
      </button>
      <Modal onOpen={openCart} onClose={handleCloseCart} />
    </header>
  );
}
