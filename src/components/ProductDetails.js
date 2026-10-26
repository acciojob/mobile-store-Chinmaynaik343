
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProductDetails({ products, updateProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  if (!product) {
    return (
      <section>
        <h2>Product not found</h2>
        <button className="btn" onClick={() => navigate("/")}>
          Back
        </button>
      </section>
    );
  }

  const startEditing = () => {
    setFormData({
      ...product,
      price: String(product.price)
    });
    setEditing(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.image.trim() ||
      formData.price === "" ||
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) < 0
    ) {
      alert("Please enter valid product details.");
      return;
    }

    updateProduct(formData);
    setEditing(false);
  };

  return (
    <section className="details">
      <button
        className="btn"
        onClick={() => navigate("/")}
      >
        Back
      </button>

      {editing ? (
        <form onSubmit={handleSave} className="edit-form">
          <h2>Edit Product</h2>

          <label>Product Name</label>
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Image URL</label>
          <input
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <label>Price</label>
          <input
            className="form-control"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <button type="submit" className="button">
            Save Changes
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <img
            className="details-image"
            src={product.image}
            alt={product.name}
          />

          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h2 className="price">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </h2>

            <button
              className="button"
              onClick={startEditing}
            >
              Edit Product
            </button>

            <p>
              <Link to="/admin">Go to Admin Panel</Link>
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export default ProductDetails;
