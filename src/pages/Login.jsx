import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import backgroundImage from "../assets/download.jpeg"; 

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !email.trim()) {
      alert("Masukkan username, email, dan password.");
      return;
    }

    login({ username, email });

    alert("Login berhasil!");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    // Terapkan gaya ke body saat komponen dimuat
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    // Hapus gaya saat komponen dilepas (unmount)
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundAttachment = "";
    };
  }, []);

  const loginPageContainerStyle = {
    minHeight: "calc(100vh - 180px)", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0",
  };

  const formContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.75)", 
    backdropFilter: "blur(0px)", 
    padding: "30px 40px",
    borderRadius: "10px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)", 
    maxWidth: 420,
    width: "100%",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  return (
    <div style={loginPageContainerStyle}>
      <div style={formContainerStyle}>
        <h1 style={{ textAlign: "center", color: "#333" }}>🛒 TrendMart</h1>
        <br />
        <h2 style={{ textAlign: "center", color: "#555" }}>Login</h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16, marginTop: 20 }}>
          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 5, border: "1px solid #ccc" }}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 5, border: "1px solid #ccc" }}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              style={{ width: "100%", padding: 10, marginTop: 6, borderRadius: 5, border: "1px solid #ccc" }}
            />
          </label>

          <button type="submit" style={{ padding: "12px", marginTop: 10 }}>
            Login & Go to Home
          </button>
        </form>
      </div>
    </div>
  );
}
