import { createContext, useState } from "react";
export const CartContext = createContext({
  CartItems: [],
  TotalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  calculateTotalPrice: () => {},
});
export default function CartContextProvider({ children }) {
  const [CartItems, setCartItems] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const addItem = (newItem) => {
    const itemExist = CartItems.includes(newItem);
    if (itemExist) {
      return;
    }
    newItem = { ...newItem, quantity: 1 };
    setCartItems((prevItems) => {
      return [...prevItems, newItem];
    });
    calculateTotalPrice();
  };
  const removeItem = (itemToRemove) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item != itemToRemove)
    );
  };
  function calculateTotalPrice() {
    const total = CartItems.reduce(
      (accumulator, item) =>
        accumulator + Number(item.price) * Number(item.quantity),
      0
    );
    setTotalPrice(total.toFixed(2));
  }
  return (
    <CartContext.Provider
      value={{
        CartItems,
        TotalPrice,
        addItem,
        removeItem,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
