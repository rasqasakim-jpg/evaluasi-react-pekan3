import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCart from "../hooks/useCart";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch detail");
        return res.json();
      })
      .then(data => { if (mounted) { setProduct(data); setLoading(false); }})
      .catch(err => { if (mounted) { setError(err.message); setLoading(false); }});
    return () => mounted = false;
  }, [id]);

  if (loading) return <p>Loading detail...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <div style={{ padding: 16 }}>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ maxHeight: 300 }} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
