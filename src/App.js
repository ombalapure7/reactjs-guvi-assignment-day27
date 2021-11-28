import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import SingleProduct from "./pages/SingleProduct";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact="true" path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/add" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
