import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shoppingCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Gagal memuat keranjang dari localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
    } catch (error) {
      console.error("Gagal menyimpan keranjang ke localStorage", error);
    }
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx === -1) {
        return [...prev, { ...product, qty: 1 }];
      } else {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  }, []);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  }, [cart]);

  const itemCount = useMemo(() => {
    return cart.reduce((cnt, item) => cnt + (item.qty || 1), 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
