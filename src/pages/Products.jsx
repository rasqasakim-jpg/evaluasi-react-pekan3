import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCart";
import { useSearchParams } from "react-router-dom";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then(res => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then(data => { if (mounted) { setProducts(data); setLoading(false); }})
      .catch(err => { if (mounted) { setError(err.message || "Gagal fetch"); setLoading(false); }});
    return () => mounted = false;
 }, []);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, padding: 16 }}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
  

  
}