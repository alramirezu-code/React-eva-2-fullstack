import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";

export default function BlogDetalle() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <main className="container my-5 text-center">
        <h1>Blog no encontrado</h1>
        <Link to="/blogs" className="btn btn-primary mt-3">Volver a Blogs</Link>
      </main>
    );
  }

  return (
    <main className="container my-5">
      <article className="card p-4">
        <img src={blog.imagen} className="img-fluid rounded mb-4" alt={blog.titulo} />
        <h1 className="text-dark">{blog.titulo}</h1>
        {blog.contenido.map((parrafo, i) => (
          <p className="text-dark" key={i}>{parrafo}</p>
        ))}
        <Link to="/blogs" className="btn btn-primary">
          Volver a Blogs
        </Link>
      </article>
    </main>
  );
}