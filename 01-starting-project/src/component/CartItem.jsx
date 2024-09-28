import { useState, useContext, useEffect } from "react";
import { CartContext } from "../store/CartContext";
export default function CartItem({ item, handleTotal }) {
  const { removeItem } = useContext(CartContext);
  const [itemQuantity, setItemQuantity, calculateTotalPrice] = useState(1);
  function handleIncreasItems() {
    setItemQuantity(itemQuantity + 1);
    item.quantity += 1;
    handleTotal();
  }
  function handleDecreasItems() {
    setItemQuantity(itemQuantity - 1);
    item.quantity -= 1;
    handleTotal();
  }

  useEffect(() => {
    if (item.quantity <= 0) {
      removeItem(item);
      return;
    }
  }, [itemQuantity]);

  return (
    <div className="cart-item">
      <p>
        {item.name}-{item.quantity} x ${item.price}
      </p>
      <div className="cart-item-actions">
        <button onClick={handleDecreasItems}>-</button>
        <p>{item.quantity}</p>
        <button onClick={handleIncreasItems}>+</button>
      </div>
    </div>
  );
}
