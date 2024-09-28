import Header from "./component/Header";
import Meals from "./component/Meals";
import CartContextProvider from "./store/CartContext";
function App() {
  return (
    <CartContextProvider>
      <main>
        <Header />
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
