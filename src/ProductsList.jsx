import Product from "./Product.jsx";
import "./ProductsList.css";

const ProductsList = ({ products }) => {
  return (
    <div className="products-grid">
      {products.length === 0 ? (
        <h3 className="loading-message">Loading products...</h3>
      ) : (
        products.map((product) => (
          <Product key={product.id} details={product} />
        ))
      )}
    </div>
  );
};

export default ProductsList;
