import { useCartContext } from "../contexts/CartContext";

export default function useCart() {
  const { cart, addToCart, removeFromCart, updateQty, total, itemCount } = useCartContext();
  return { cart, addToCart, removeFromCart, updateQty, total, itemCount };
}
