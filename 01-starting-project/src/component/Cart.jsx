import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/CartContext";
import CartItem from "./CartItem";
export default function Cart({ onClose, isCheckOut, handleCheckOut }) {
  const { CartItems, calculateTotalPrice, TotalPrice } =
    useContext(CartContext);
  function handleTotal() {
    calculateTotalPrice();
  }
  return (
    <section>
      <h2>Your Cart</h2>
      <ul id="meals">
        {CartItems &&
          CartItems.map((item) => (
            <CartItem key={item.id} item={item} handleTotal={handleTotal} />
          ))}
      </ul>
      <div className="cart-total">${TotalPrice}</div>
      <div className="modal-actions">
        <button className="text-button" onClick={onClose}>
          {" "}
          Close
        </button>
        {!isCheckOut && (
          <button className="button" onClick={handleCheckOut}>
            Go to Checkout
          </button>
        )}
      </div>
    </section>
  );
}
