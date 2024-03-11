// import components:
import Assortment from "./components/Assortment/Assortment";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

// import static:
import "./styles/App.scss";

const App = () => {
    return (
        <div className="App">
            <Assortment/>
            <ShoppingCart/>
        </div>
    );
};

export default App;