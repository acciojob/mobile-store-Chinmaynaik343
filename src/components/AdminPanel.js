
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminPanel({
  products,
  addProduct,
  updateProduct,
  deleteProduct
}) {
  const emptyForm = {
    name: "",
    description: "",
    image: "",
    price: ""
  };

  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = (data) =>
    data.name.trim() !== "" &&
    data.description.trim() !== "" &&
    data.image.trim() !== "" &&
    data.price !== "" &&
    Number.isFinite(Number(data.price)) &&
    Number(data.price) >= 0;

  const handleAdd = (event) => {
    event.preventDefault();

    if (!isValid(formData)) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    addProduct(formData);
    setFormData(emptyForm);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditData({
      name: product.name,
      description: product.description,
      image: product.image,
      price: String(product.price)
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!isValid(editData)) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    updateProduct({
      ...editData,
      id: editingId,
      price: Number(editData.price)
    });

    setEditingId(null);
  };

  return (
    <section className="admin-panel">
      <h1>Admin Panel</h1>
      <h3>Total Products: {products.length}</h3>

      <form className="admin-form" onSubmit={handleAdd}>
        <h2>Add New Product</h2>

        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control"
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          className="form-control"
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <input
          className="form-control"
          type="number"
          name="price"
          placeholder="Price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <button className="button" type="submit">
          Add
        </button>
      </form>

      <h2>Manage Products</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="admin-list">
          {products.map((product) => (
            <div className="admin-product-row" key={product.id}>
              <div className="admin-product-info">
                <img src={product.image} alt={product.name} />

                <div>
                  <h3>
                    <Link to={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </h3>

                  <p>
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="admin-actions">
                <button
                  type="button"
                  className="button float-right"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>

                <button
                  type="button"
                  className="button secondary float-right"
                  onClick={() => startEdit(product)}
                >
                  Edit
                </button>

                <Link
                  className="button secondary"
                  to={`/products/${product.id}`}
                >
                  View Details
                </Link>
              </div>

              {editingId === product.id && (
                <form
                  className="edit-form"
                  onSubmit={handleUpdate}
                >
                  <h3>Edit {product.name}</h3>

                  <input
                    className="form-control"
                    name="name"
                    placeholder="Product Name"
                    value={editData.name}
                    onChange={handleEditChange}
                    required
                  />

                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    value={editData.description}
                    onChange={handleEditChange}
                    required
                  />

                  <input
                    className="form-control"
                    type="url"
                    name="image"
                    placeholder="Image URL"
                    value={editData.image}
                    onChange={handleEditChange}
                    required
                  />

                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    value={editData.price}
                    onChange={handleEditChange}
                    required
                  />

                  <button
                    type="submit"
                    className="button float-right"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminPanel;
