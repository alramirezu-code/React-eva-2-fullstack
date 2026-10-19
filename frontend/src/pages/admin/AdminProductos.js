import { useState } from "react";
import {
  leerProductosAdmin,
  leerTodosLosProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../data/productos";

const estadoInicial = {
  codigo: "", nombre: "", descripcion: "", precio: "", stock: "",
  stockCritico: "", categoria: "", imagen: "",
};

export default function AdminProductos() {
  const [productosAdmin, setProductosAdmin] = useState(leerProductosAdmin());
  const [editando, setEditando] = useState(null); // código del producto en edición, o null
  const [mostrarForm, setMostrarForm] = useState(false);
  const [valores, setValores] = useState(estadoInicial);
  const [errores, setErrores] = useState({});

  const todos = leerTodosLosProductos();

  function validar() {
    const e = {};

    if (valores.codigo.trim() === "") {
      e.codigo = "El código es obligatorio.";
    } else if (valores.codigo.trim().length < 3) {
      e.codigo = "El código debe tener al menos 3 caracteres.";
    } else {
      const repetido = todos.some(
        (p) => p.codigo.toLowerCase() === valores.codigo.trim().toLowerCase() && p.codigo !== editando
      );
      if (repetido) e.codigo = "Ya existe un producto con este código.";
    }

    if (valores.nombre.trim() === "") e.nombre = "El nombre es obligatorio.";
    else if (valores.nombre.length > 100) e.nombre = "Máximo 100 caracteres.";

    if (valores.descripcion.length > 500) e.descripcion = "Máximo 500 caracteres.";

    function validarCampo(campo, valor) {
      const e = { ...errores };
      if (campo === "precio") {
        if (valor === "") e.precio = "El precio es obligatorio.";
        else if (isNaN(Number(valor)) || Number(valor) < 0) e.precio = "El precio debe ser un número mayor o igual a 0.";
        else delete e.precio;
      }
      if (campo === "stock") {
        if (valor === "") e.stock = "El stock es obligatorio.";
        else if (!/^\d+$/.test(valor)) e.stock = "Debe ser un número entero mayor o igual a 0.";
        else delete e.stock;
      }
      if (campo === "stockCritico") {
        if (valor !== "" && !/^\d+$/.test(valor)) e.stockCritico = "Debe ser un número entero mayor o igual a 0.";
        else delete e.stockCritico;
      }
      setErrores(e);
    }

    if (valores.categoria === "") e.categoria = "Seleccione una categoría.";

    setErrores(e);
    return Object.keys(e).length === 0;
  }

  function nuevoProducto() {
    setEditando(null);
    setValores(estadoInicial);
    setErrores({});
    setMostrarForm(true);
  }

  function editarProducto(codigo) {
    const p = productosAdmin.find((x) => x.codigo === codigo);
    if (!p) return;

    setEditando(codigo);
    setValores({
      codigo: p.codigo,
      nombre: p.nombre,
      descripcion: p.descripcion || "",
      precio: String(p.precio),
      stock: String(p.stock),
      stockCritico: p.stockCritico ? String(p.stockCritico) : "",
      categoria: p.categoria,
      imagen: p.imagen || "",
    });
    setErrores({});
    setMostrarForm(true);
  }

  function borrarProducto(codigo) {
    if (!window.confirm(`¿Seguro que deseas eliminar el producto ${codigo}?`)) return;
    eliminarProducto(codigo);
    setProductosAdmin(leerProductosAdmin());
  }

  function manejarEnvio(e) {
    e.preventDefault();
    if (!validar()) return;

    const criticoTexto = valores.stockCritico.trim();
    const producto = {
      codigo: valores.codigo.trim(),
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      stockCritico: criticoTexto === "" ? 0 : Number(criticoTexto),
      categoria: valores.categoria,
      imagen: valores.imagen.trim() || "/img/producto_default.jpg",
    };

    if (editando) {
      actualizarProducto(editando, producto);
    } else {
      crearProducto(producto);
    }

    alert(editando ? "Producto actualizado correctamente." : "Producto agregado correctamente.");

    if (criticoTexto !== "" && producto.stock <= producto.stockCritico) {
      alert("⚠️ Atención: el stock de este producto está en nivel crítico.");
    }

    setProductosAdmin(leerProductosAdmin());
    setMostrarForm(false);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Productos</h3>
        {!mostrarForm && (
          <button className="btn btn-primary" onClick={nuevoProducto}>
            Agregar producto
          </button>
        )}
      </div>

      {mostrarForm ? (
        <form noValidate onSubmit={manejarEnvio} className="bg-white text-dark p-4 rounded shadow-sm">
          <h5>{editando ? "Editar producto" : "Agregar producto"}</h5>

          <div className="mb-2">
            <label className="form-label">Código *</label>
            <input
              type="text"
              className={`form-control ${errores.codigo ? "is-invalid" : ""}`}
              value={valores.codigo}
              readOnly={!!editando}
              onChange={(e) => setValores({ ...valores, codigo: e.target.value })}
            />
            {errores.codigo && <div className="invalid-feedback d-block">{errores.codigo}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Nombre *</label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
              value={valores.nombre}
              onChange={(e) => setValores({ ...valores, nombre: e.target.value })}
            />
            {errores.nombre && <div className="invalid-feedback d-block">{errores.nombre}</div>}
          </div>

          <div className="mb-2">
            <label className="form-label">Descripción</label>
            <textarea
              className={`form-control ${errores.descripcion ? "is-invalid" : ""}`}
              value={valores.descripcion}
              onChange={(e) => setValores({ ...valores, descripcion: e.target.value })}
            />
            {errores.descripcion && <div className="invalid-feedback d-block">{errores.descripcion}</div>}
          </div>

          <div className="row">
            <div className="col-md-4 mb-2">
              <label className="form-label">Precio *</label>
              <input
                type="number"
                className={`form-control ${errores.precio ? "is-invalid" : ""}`}
                value={valores.precio}
                onChange={(e) => setValores({ ...valores, precio: e.target.value })}
              />
              {errores.precio && <div className="invalid-feedback d-block">{errores.precio}</div>}
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Stock *</label>
              <input
                type="number"
                className={`form-control ${errores.stock ? "is-invalid" : ""}`}
                value={valores.stock}
                onChange={(e) => setValores({ ...valores, stock: e.target.value })}
              />
              {errores.stock && <div className="invalid-feedback d-block">{errores.stock}</div>}
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Stock crítico</label>
              <input
                type="number"
                className={`form-control ${errores.stockCritico ? "is-invalid" : ""}`}
                value={valores.stockCritico}
                onChange={(e) => setValores({ ...valores, stockCritico: e.target.value })}
              />
              {errores.stockCritico && <div className="invalid-feedback d-block">{errores.stockCritico}</div>}
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">Categoría *</label>
            <select
              className={`form-select ${errores.categoria ? "is-invalid" : ""}`}
              value={valores.categoria}
              onChange={(e) => setValores({ ...valores, categoria: e.target.value })}
            >
              <option value="">-- Seleccione categoría --</option>
              <option value="Herramientas">Herramientas</option>
              <option value="Materiales">Materiales</option>
              <option value="Adhesivos">Adhesivos</option>
            </select>
            {errores.categoria && <div className="invalid-feedback d-block">{errores.categoria}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Imagen (ruta)</label>
            <input
              type="text"
              className="form-control"
              value={valores.imagen}
              onChange={(e) => setValores({ ...valores, imagen: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-success me-2">
            {editando ? "Guardar cambios" : "Guardar producto"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setMostrarForm(false)}>
            Cancelar
          </button>
        </form>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((p) => {
                const esAdminProducto = productosAdmin.some((ad) => ad.codigo === p.codigo);
                const critico = p.stock <= p.stockCritico;
                return (
                  <tr key={p.codigo}>
                    <td>{p.codigo}</td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>${Number(p.precio).toLocaleString("es-CL")}</td>
                    <td>
                      {p.stock}{" "}
                      {critico && <span className="badge bg-warning text-dark">Stock crítico</span>}
                    </td>
                    <td>
                      {esAdminProducto ? (
                        <>
                          <button className="btn btn-sm btn-warning me-1" onClick={() => editarProducto(p.codigo)}>
                            Editar
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => borrarProducto(p.codigo)}>
                            Eliminar
                          </button>
                        </>
                      ) : (
                        <span className="text-muted small">Predeterminado</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}