import { useState, useEffect } from "react";
import { fetchAvailableMeals } from "../http";
import Mealitem from "./MealItem";
import ErrorTag from "./ErrorTag";
export default function Meals() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try {
        const meals = await fetchAvailableMeals();
        setAvailableMeals(meals);
      } catch (error) {
        setError({ message: error.message || "Error Fetching Data" });
      }
      setIsFetching(false);
    }
    fetchMeals();
  }, []);
  if (error) {
    return <ErrorTag title="An error occurred!" message={error.message} />;
  }
  return (
    <ul id="meals">
      {availableMeals &&
        availableMeals.map((meal) => (
          <Mealitem key={meal.id} meal={meal} isLoading={isFetching} />
        ))}
    </ul>
  );
}
