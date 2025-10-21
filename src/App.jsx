import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // useAuth diimpor di sini
import { CartProvider } from "./contexts/CartContext";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Anda berhasil logout.");
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo">
          🛍️ <span>Shopping App</span>
        </NavLink>
      </div>
      <div className="navbar-center">
        <NavLink to="/products" className="nav-link">Products</NavLink>
        <NavLink to="/cart" className="nav-link">Cart</NavLink>
        <NavLink to="/checkout" className="nav-link">Checkout</NavLink>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <NavLink to="/profile" className="nav-link profile-link" title="Profil Saya">
              <span role="img" aria-label="user-profile">👤</span>
            </NavLink>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="nav-link login-btn">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route
                path="/cart"
                element={
                  <ErrorBoundary>
                    <Cart />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <footer className="footer">© 2025 Shopping Cart App - Made with  irgi</footer>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
