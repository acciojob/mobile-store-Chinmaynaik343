
import React from "react";
import { Link } from "react-router-dom";

function ProductList({ products }) {
  return (
    <section>
      <h1>Available Mobiles</h1>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="product-link"
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>
              </Link>

              <p className="price">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>

              <Link
                className="button"
                to={`/products/${product.id}`}
              >
                View Details
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
