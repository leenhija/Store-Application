import { useContext } from "react";
import { CartContext } from "../store/CartContext";
export default function Mealitem({ meal, isLoading }) {
  const { addItem } = useContext(CartContext);
  return (
    <>
      {isLoading && <p className="fallback-text">Fetching Meals DAta...</p>}
      {!isLoading && meal == undefined && (
        <p className="fallback-text">Fetching Data Failed</p>
      )}
      <div className="meal-item">
        <article>
          <img src={`http://localhost:3000/${meal.image}`} />
          <h3>{meal.name}</h3>
          <p className="meal-item-price">${meal.price}</p>
          <p className="meal-item-description ">{meal.description}</p>
          <button
            className="meal-item-actions button"
            onClick={() => addItem(meal)}
          >
            Add to Cart
          </button>
        </article>
      </div>
    </>
  );
}
