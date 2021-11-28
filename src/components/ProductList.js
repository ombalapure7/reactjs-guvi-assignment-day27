import { useGlobalContext } from "../context";
import Product from "./Product";

function ProductList() {
  const { products } = useGlobalContext();

  return (
    <div className="d-flex flex-row justify-content-around flex-wrap">
      {products.map((product) => {
        return <Product key={product._id} {...product} />;
      })}
    </div>
  );
}

export default ProductList;
