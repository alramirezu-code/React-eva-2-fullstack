import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Carrito from "./pages/Carrito.jsx";
import InicioSesion from "./pages/InicioSesion.jsx";
import Registro from "./pages/Registro";
import Categorias from "./pages/Categorias";
import CategoriaDetalle from "./pages/CategoriaDetalle";
import Checkout from "./pages/Checkout";
import CompraExitosa from "./pages/CompraExitosa";
import CompraFallida from "./pages/CompraFallida";
import Admin from "./pages/Admin";
import Ofertas from "./pages/Ofertas";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Blogs from "./pages/Blogs";
import BlogDetalle from "./pages/BlogDetalle";

 function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:codigo" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:categoria" element={<CategoriaDetalle />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-fallida" element={<CompraFallida />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetalle />} />
      </Routes>
    </>
  );
}

export default App;
