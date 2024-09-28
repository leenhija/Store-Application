import Control from "./Control";
import { useContext, useRef, useState, useEffect } from "react";
import { CartContext } from "../store/CartContext";
import { updateOrder } from "../http";
import ErrorTag from "./ErrorTag";
export default function Checkout({ onClose, isCheckOut }) {
  const { TotalPrice, CartItems , emptyTheCart } = useContext(CartContext);
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);

  function handlesubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const userData = Object.fromEntries(fd.entries());
    async function checkoutorder() {
      setIsFetching(true);
      try {
        const order = await updateOrder(userData, CartItems);
        console.log(order);
        setFetchedData(true);
        emptyTheCart();
      } catch (error) {
        setError({ message: error.message || "Error Fetching Data" });
      }
      setIsFetching(false);
    }
    checkoutorder();
  }

  if (error) {
    return <ErrorTag title="An error occurred!" message={error.message} />;
  }
  if (fetchedData) {
    return (
      <>
        <h2>Success!</h2>
        <p>Your order was submited successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <div className="modal-actions">
          <button className="button" onClick={onClose}>
            Okay
          </button>
        </div>
      </>
    );
  }
  if (!fetchedData) {
    return (
      <>
        <h2>Checkout</h2>
        <p>Total Amount: ${TotalPrice}</p>
        <form onSubmit={handlesubmit}>
          <Control lableName="FullName" type="text" name="name" />
          <Control lableName="E-mail Address" type="email" name="email" />
          <Control lableName="Street" type="text" name="street" />
          <div className="control-row">
            <Control lableName="Postal Code" type="text" name="postal-code" />
            <Control lableName="City" type="text" name="city" />
          </div>
          {!isFetching && (
            <div className="modal-actions">
              <button className="text-button" onClick={onClose}>
                Close
              </button>
              {isCheckOut && (
                <button className="button" type="submit">
                  Submit Order
                </button>
              )}
              {isFetching && <p>sendeing your order...</p>}
            </div>
          )}
        </form>
      </>
    );
  }
}
