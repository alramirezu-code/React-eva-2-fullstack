// ==========================================
// FUENTE DE DATOS SIMULADA (como una base de datos)
// ==========================================
export const productosFijos = [
  {
    codigo: "PRO001",
    nombre: "Set de herramientas manuales",
    descripcion:
      "Set de herramientas manuales para el hogar y trabajos de mantención. Reúne las herramientas básicas para armar, ajustar, apretar y reparar, en un solo kit fácil de guardar y transportar.",
    precio: 16500,
    stock: 20,
    stockCritico: 5,
    categoria: "Herramientas",
    imagen: "/img/Set Herramientas.webp",
  },
  {
    codigo: "PRO002",
    nombre: "Concertina Alambre Púas",
    descripcion:
      "Rollo de concertina de alambre de púas para reforzar cierres perimetrales de terrenos, bodegas y recintos. Se instala sobre muros o rejas como barrera adicional. Manipular con guantes de protección.",
    precio: 15000,
    stock: 15,
    stockCritico: 5,
    categoria: "Materiales",
    imagen: "/img/Concertina_Alambre_Puas.webp",
  },
  {
    codigo: "PRO003",
    nombre: "Rollo aislante aluminio 1,20 m x 10 m",
    descripcion:
      "Rollo aislante térmico de aluminio de 1,20 m x 10 m. Se instala bajo techumbres y en muros para reducir la pérdida de calor en invierno y el ingreso de calor en verano.",
    precio: 6990,
    precioOferta: 5490, 
    stock: 20,
    stockCritico: 5,
    categoria: "Materiales",
    imagen: "/img/Rollo_aislante_aluminio.webp",
  },
  {
    codigo: "PRO004",
    nombre: "Panel PVC con revestimiento de metal",
    descripcion:
      "Panel de PVC con revestimiento de metal para muros y cielos. Es resistente a la humedad, tiene un acabado decorativo y es fácil de limpiar.",
    precio: 5750,
    stock: 25,
    stockCritico: 5,
    categoria: "Materiales",
    imagen: "/img/Panel_Pvc.webp",
  },
  {
    codigo: "PRO005",
    nombre: "Panel metal con revestimiento de madera",
    descripcion:
      "Panel metálico con terminación tipo madera para revestir muros y cielos. Da la apariencia de la madera con la resistencia del metal y sin necesidad de barnizado.",
    precio: 8500,
    stock: 15,
    stockCritico: 5,
    categoria: "Materiales",
    imagen: "/img/Panel_metal_look_madera.webp",
  },
  {
    codigo: "PRO006",
    nombre: "Plancha de yeso cartón",
    descripcion:
      "Plancha de yeso cartón para construir tabiques, cielos falsos y revestimientos interiores. Deja una superficie lisa lista para masillar y pintar.",
    precio: 9990,
    stock: 30,
    stockCritico: 10,
    categoria: "Materiales",
    imagen: "/img/Plancha_yeso_carton.webp",
  },
  {
    codigo: "PRO007",
    nombre: "Pegamento para madera",
    descripcion:
      "Adhesivo para trabajos en madera, útil en carpintería, reparación de muebles y manualidades. Genera uniones firmes y es fácil de aplicar.",
    precio: 7000,
    precioOferta: 5490,
    stock: 20,
    stockCritico: 5,
    categoria: "Adhesivos",
    imagen: "/img/Pegamento_para_Madera.webp",
  },
  {
    codigo: "PRO008",
    nombre: "Taladro atornillador",
    descripcion:
      "Taladro atornillador para trabajos de construcción y mantención. Permite perforar y atornillar con un solo equipo. Usar con elementos de protección personal.",
    precio: 15500,
    stock: 10,
    stockCritico: 3,
    categoria: "Herramientas",
    imagen: "/img/Taladro.webp",
  },
  {
    codigo: "PRO009",
    nombre: "Mortero impermeabilizante 500 g",
    descripcion:
      "Mortero impermeabilizante de 500 g para sellar superficies frente a la humedad y filtraciones. Se usa en muros, terrazas y zonas expuestas al agua.",
    precio: 12750,
    precioOferta: 9990,
    stock: 15,
    stockCritico: 5,
    categoria: "Materiales",
    imagen: "/img/Mortero_Impermeabilizante.webp",
  },
];

const CLAVE_STORAGE = "productos";

const CLAVE_AJUSTES_STOCK = "stockAjustes";

function leerAjustesStock() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_AJUSTES_STOCK)) || {};
  } catch {
    return {};
  }
}

function guardarAjustesStock(ajustes) {
  localStorage.setItem(CLAVE_AJUSTES_STOCK, JSON.stringify(ajustes));
}

// ==========================================
// CRUD sobre los productos agregados desde el admin
// (persisten en localStorage, igual que en la Evaluación 1)
// ==========================================

export function leerProductosAdmin() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];
  } catch {
    return [];
  }
}

export function leerTodosLosProductos() {
  return productosFijos.concat(leerProductosAdmin());
}

export function leerProductoPorCodigo(codigo) {
  if (!codigo) return undefined;
  return leerTodosLosProductos().find(
    (p) => p.codigo && p.codigo.trim().toUpperCase() === codigo.trim().toUpperCase()
  );
}

function guardarProductosAdmin(lista) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
}

export function crearProducto(producto) {
  const lista = leerProductosAdmin();
  lista.push(producto);
  guardarProductosAdmin(lista);
  return lista;
}

export function actualizarProducto(codigo, datosNuevos) {
  const lista = leerProductosAdmin();
  const i = lista.findIndex((p) => p.codigo === codigo);
  if (i === -1) return lista;
  lista[i] = datosNuevos;
  guardarProductosAdmin(lista);
  return lista;
}

export function eliminarProducto(codigo) {
  const lista = leerProductosAdmin().filter((p) => p.codigo !== codigo);
  guardarProductosAdmin(lista);
  return lista;
}

export const comunasPorRegion = {
  RM: ["Santiago", "La Florida", "Maipú", "Providencia", "Puente Alto"],
  ARAUCANIA: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"],
  NUBLE: ["Chillán", "Linares", "Longaví", "Concepción"],
};

export function leerProductosEnOferta() {
  return leerTodosLosProductos().filter(
    (p) => p.precioOferta && p.precioOferta < p.precio
  );
}

export function descontarStock(codigo, cantidad) {
  const productosAdmin = leerProductosAdmin();
  const indiceAdmin = productosAdmin.findIndex((p) => p.codigo === codigo);

  if (indiceAdmin !== -1) {
    // Producto creado desde el admin: vive directo en localStorage["productos"]
    const nuevoStock = Math.max(0, productosAdmin[indiceAdmin].stock - cantidad);
    productosAdmin[indiceAdmin] = { ...productosAdmin[indiceAdmin], stock: nuevoStock };
    guardarProductosAdmin(productosAdmin);
    return;
  }

  // Producto fijo (hardcodeado en el código): su stock se guarda aparte, como "ajuste"
  const fijo = productosFijos.find((p) => p.codigo === codigo);
  if (!fijo) return;

  const ajustes = leerAjustesStock();
  const stockActual = ajustes[codigo] !== undefined ? ajustes[codigo] : fijo.stock;
  ajustes[codigo] = Math.max(0, stockActual - cantidad);
  guardarAjustesStock(ajustes);
}