import React from "react";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  const handlePay = () => {
    alert("Pembayaran berhasil! Terima kasih.");
    navigate("/products");
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Checkout</h2>
      <p>Items: {cart.length}</p>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handlePay}>Bayar Sekarang</button>
    </div>
  );
}
