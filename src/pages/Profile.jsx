import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import profileImage from "../assets/foto.jpeg"; // foto default

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Profil Saya</h2>

      <img
        src={profileImage}
        alt="Foto Profil"
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          objectFit: "cover",
          margin: "20px 0",
          border: "3px solid #eee",
        }}
      />

      <p><strong>Nama:</strong> {user.username || "Guest"}</p>
      <p><strong>Email:</strong> {user.email || "Tidak ada email"}</p>
      <p><strong>Role:</strong> Customer</p>
    </div>
  );
}
