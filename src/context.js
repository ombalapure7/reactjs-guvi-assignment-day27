import React, { useContext, useState } from "react";
import axios from "axios";

const url = "https://products-api-express.herokuapp.com/api/v1/products";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(url);
    setProducts(response.data.products);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        getProducts,
        products,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
