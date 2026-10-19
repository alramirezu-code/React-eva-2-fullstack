import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { descontarStock } from "../data/productos";

const CartContext = createContext(null);

function obtenerOrdenes() {
  try {
    return JSON.parse(localStorage.getItem("ordenes")) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = useCallback((producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.codigo === producto.codigo);
      if (existe) {
        return prev.map((item) =>
          item.codigo === producto.codigo ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }, []);

  const cambiarCantidad = useCallback((codigo, cambio) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.codigo === codigo ? { ...item, cantidad: item.cantidad + cambio } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }, []);

  const eliminarProducto = useCallback((codigo) => {
    setCarrito((prev) => prev.filter((item) => item.codigo !== codigo));
  }, []);

  const vaciarCarrito = useCallback(() => {
    setCarrito([]);
  }, []);

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  // Crea y guarda la orden, pero NO toca el carrito — eso lo decide quien la llama
  // (Checkout), según si la "compra" resultó exitosa o no.
  const crearOrden = useCallback((usuarioActivo, datosEnvio) => {
    const ordenes = obtenerOrdenes();

    const nuevaOrden = {
      id: "ORD-" + String(ordenes.length + 1).padStart(4, "0"),
      fecha: new Date().toLocaleString("es-CL"),
      cliente: usuarioActivo ? `${usuarioActivo.nombre} ${usuarioActivo.apellidos || ""}`.trim() : datosEnvio.nombre,
      correo: usuarioActivo ? usuarioActivo.correo : datosEnvio.correo,
      estado: "Pendiente",
      total,
      productos: carrito,
      envio: datosEnvio,
    };

    ordenes.push(nuevaOrden);
    localStorage.setItem("ordenes", JSON.stringify(ordenes));

        // Descuenta el stock de cada producto comprado
    carrito.forEach((item) => {
      descontarStock(item.codigo, item.cantidad);
    });

    return nuevaOrden;
  }, [carrito, total]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        cambiarCantidad,
        eliminarProducto,
        vaciarCarrito,
        crearOrden,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}