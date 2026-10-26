
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import initialProducts from "./data";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AdminPanel from "./components/AdminPanel";
import "./styles/App.css";

function App() {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      price: Number(product.price)
    };

    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id
          ? { ...updatedProduct, price: Number(updatedProduct.price) }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <BrowserRouter>
      <header className="navbar">
        <Link to="/" className="brand">
          Mobile Store
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin Panel</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<ProductList products={products} />}
          />

          <Route
            path="/products/:id"
            element={
              <ProductDetails
                products={products}
                updateProduct={updateProduct}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <AdminPanel
                products={products}
                addProduct={addProduct}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            }
          />

          <Route
            path="*"
            element={
              <div>
                <h2>Page not found</h2>
                <Link to="/">Return Home</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
