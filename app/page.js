"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "Dark Metal Tee", price: "$29.99", category: "Shirts" },
  { id: 2, name: "Skull Hoodie", price: "$49.99", category: "Hoodies" },
  { id: 3, name: "Chain Vest", price: "$59.99", category: "Vests" },
  { id: 4, name: "Band Logo Tee", price: "$34.99", category: "Shirts" },
  { id: 5, name: "Gothic Jacket", price: "$89.99", category: "Jackets" },
  { id: 6, name: "Spike Boots", price: "$79.99", category: "Footwear" },
];

function Header() {
  return (
    <header>
      <h1>NOCTURNA WEAR</h1>
      <nav>
        <a href="#home">Inicio</a>
        <a href="#products">Productos</a>
        <a href="#about">Acerca de</a>
        <a href="#contact">Contacto</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <h2>ROCK. METAL. ALTERNATIVE.</h2>
      <p>Expresa tu estilo con ropa única y auténtica para verdaderos amantes del rock y metal.</p>
      <button onClick={() => document.getElementById("products").scrollIntoView()}>
        Ver Colección
      </button>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="photo">👕</div>
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <div className="price">{product.price}</div>
      <button>Agregar al Carrito</button>
    </div>
  );
}

function ProductGrid() {
  return (
    <section id="products">
      <div className="container">
        <h2 style={{ textAlign: "center", marginTop: "60px" }}>COLECCIÓN NOCTURNA</h2>
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <h3>NOCTURNA WEAR</h3>
      <p>© 2024 NOCTURNA WEAR. Todos los derechos reservados.</p>
      <p>Rock. Metal. Alternativo. Desde el Corazón.</p>
      <nav style={{ marginTop: "20px" }}>
        <a href="#" style={{ margin: "0 15px", color: "#999", textDecoration: "none" }}>Facebook</a>
        <a href="#" style={{ margin: "0 15px", color: "#999", textDecoration: "none" }}>Instagram</a>
        <a href="#" style={{ margin: "0 15px", color: "#999", textDecoration: "none" }}>Twitter</a>
      </nav>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductGrid />
      <Footer />
    </>
  );
}