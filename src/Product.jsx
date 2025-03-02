import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi"; // Import cart icon
import "./Product.css";

const Product = ({ details }) => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const handleRemoveFromCart = () => {
    setCartCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <div className="product-card">
      <img
        src={details.thumbnail}
        alt={details.title}
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-title">{details.title}</h3>
        <p className="product-brand">Brand: {details.brand}</p>
        <p className="product-price">
          ${details.price}{" "}
          <span className="discount">(-{details.discountPercentage}%)</span>
        </p>
        <p className="product-rating">⭐ {details.rating}</p>
        <p
          className={`stock ${details.stock > 0 ? "in-stock" : "out-of-stock"}`}
        >
          {details.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
        <div className="cart-actions">
          <button
            className={`add-to-cart ${cartCount > 0 ? "added" : ""} ${
              details.stock === 0 ? "disabled" : ""
            }`}
            onClick={handleAddToCart}
            disabled={details.stock === 0}
          >
            {details.stock === 0
              ? "Out of Stock"
              : cartCount > 0
              ? "Add"
              : "Add to Cart"}
          </button>
          {cartCount > 0 && (
            <>
              <span className="cart-count">
                <FiShoppingCart className="cart-icon" /> {cartCount}
              </span>
              <button
                className="remove-from-cart"
                onClick={handleRemoveFromCart}
              >
                -
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
