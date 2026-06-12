"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          🔥 NOCTURNA WEAR
        </Link>
        
        <div className="navbar-menu">
          <Link href="/" className="navbar-link">
            Home
          </Link>
          <Link href="/tienda" className="navbar-link">
            Tienda
          </Link>
          <Link href="/carrito" className="navbar-link">
            Carrito ({cart.length})
          </Link>
          <Link href="/cuenta" className="navbar-link">
            Mi Cuenta
          </Link>
          <Link href="/login" className="navbar-link admin-link">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
