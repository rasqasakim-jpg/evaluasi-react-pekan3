import React from "react";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, itemCount } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h2>Keranjang kosong</h2>
        <Link to="/products">Belanja sekarang</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Keranjang ({itemCount} items)</h2>
      {cart.map(item => (
        <div key={item.id} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: "contain" }} />
          <div style={{ flex: 1 }}>
            <div>{item.title}</div>
            <div>${item.price}</div>
          </div>
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => updateQty(item.id, Number(e.target.value))}
            style={{ width: 60 }}
          />
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <hr />
      <h3>Total: ${total.toFixed(2)}</h3>
      <Link to="/checkout"><button>Checkout</button></Link>
    </div>
  );
}
