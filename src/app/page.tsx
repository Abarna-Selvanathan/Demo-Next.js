"use client";

import axios from "axios";
import React, { useState } from "react";
import "../../src/globals.css";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

export default function AddProduct() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  // Handle product submission
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/product", {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });

      if (response.status === 200) {
        setMessage(`Success: ${response.data.message}`);
        setProducts((prevProducts) => [
          ...prevProducts,
          { name, price: parseFloat(price), quantity: parseInt(quantity) },
        ]);
        setName("");
        setPrice("");
        setQuantity("");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setMessage(
        `Error: ${error.response?.data?.message || "An error occurred."}`
      );
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={handleAddProduct}>
        <h2>Add Product</h2>

        {/* Product Name Field */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />

        {/* Product Price Field */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="input-field"
        />

        {/* Product Quantity Field */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="input-field"
        />

        <button type="submit" className="add-product-button">
          Add Product
        </button>
      </form>

      {/* Display messages */}
      {message && <p className="message">{message}</p>}

      {/* Product List */}
      <div className="product-list">
        <h3>Products:</h3>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - ${product.price} (Quantity: {product.quantity})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
