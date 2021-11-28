import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const url = "https://products-api-express.herokuapp.com/api/v1/products";

function SingleProduct() {
  const { getProducts } = useGlobalContext();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  /**
   * @desc    Get product with given id
   * @return  none
   * @params  none
   */
  const getProduct = useCallback(async () => {
    const response = await axios.get(`${url}/${id}`);
    setProduct(response.data.product);
  }, [id]);

  const navigate = useNavigate();
  const navigateToProducts = () => navigate("/", { replace: true });

  const deleteProduct = async (id) => {
    console.log("Deleted: ", id);
    await axios.delete(`${url}/${id}`);
    navigateToProducts();
    getProducts();
  };

  const editProduct = async () => {
    navigate("/products/add", { state: product });
  };

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <>
      <div className="d-flex flex-wrap" style={{ margin: "2rem" }}>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="h-100 p-5 text-white bg-dark">
            <picture>
              <img
                src={product.image}
                alt={product.name}
                style={{ height: "10rem" }}
                className="img-fluid mx-auto d-block h-100 d-inline-block"
              />
            </picture>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <div className="h-100 p-5 bg-light border">
            <h2>{product.title}</h2>
            <p className="card-text fst-normal">{product.description}</p>
            <p className="card-text">
              <span className="fw-bold">Type: </span>
              {product.type}
            </p>
            <p className="card-text">
              <span className="fw-bold">Dimensions: </span>
              {product.height} X {product.width}
            </p>
            <p className="card-text">
              <span className="fw-bold">Rating: </span>
              {product.rating}
            </p>
            <p className="card-text fst-italic fs-5 fw-bold">
              Price: {product.price}
            </p>
            <div
              className="btn-group gap-2"
              role="group"
              aria-label="Basic example"
              style={{ width: "100%" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "50%" }}
                onClick={editProduct}
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-danger"
                style={{ width: "50%" }}
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-success fw-bold"
            style={{ width: "60%", borderRadius: "1.5rem" }}
          >
            Back To Home
          </button>
        </div>
      </Link>
    </>
  );
}

export default SingleProduct;
