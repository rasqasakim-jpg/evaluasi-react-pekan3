import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const onAdd = useCallback(() => addToCart(product), [addToCart, product]);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
        <div className="product-info">
          <h4 className="product-title">{product.title}</h4>
        </div>
      </Link>
      <div className="product-actions">
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button onClick={onAdd} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
