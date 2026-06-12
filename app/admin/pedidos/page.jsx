"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import "./pedidos.css";

export default function Pedidos() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      router.push("/login");
    } else {
      fetchOrders();
    }
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError("Error al cargar los pedidos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      // Update local state
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error("Error actualizando pedido:", err);
    }
  }

  return (
    <main className="pedidos-admin">
      <div className="admin-header">
        <h1>Gestión de Pedidos</h1>
        <Link href="/admin" className="back-btn">
          ← Volver al Panel
        </Link>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Cargando pedidos...</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>No hay pedidos aún</p>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Total</th>
                <th>Artículos</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td className="address">{order.address}</td>
                  <td className="price">${order.total}</td>
                  <td>{order.products?.length || 0}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {new Date(order.created_at).toLocaleDateString('es-MX')}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Procesando">Procesando</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="orders-stats">
        <div className="stat-card">
          <h3>Total de Pedidos</h3>
          <p className="stat-number">{orders.length}</p>
        </div>

        <div className="stat-card">
          <h3>Pendientes</h3>
          <p className="stat-number" style={{ color: '#ff6666' }}>
            {orders.filter(o => o.status === 'Pendiente').length}
          </p>
        </div>

        <div className="stat-card">
          <h3>Entregados</h3>
          <p className="stat-number" style={{ color: '#33ff33' }}>
            {orders.filter(o => o.status === 'Entregado').length}
          </p>
        </div>

        <div className="stat-card">
          <h3>Ingresos Totales</h3>
          <p className="stat-number">
            ${orders.reduce((sum, o) => sum + Number(o.total), 0).toFixed(2)}
          </p>
        </div>
      </div>
    </main>
  );
}
