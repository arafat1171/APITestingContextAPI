import React, { useContext, useState } from 'react';
import { DataContext } from '../DataContext';
import './ProductDisplay.css';

const ProductDisplay = () => {
  const {
    products, productsLoading, productsError,
    addProduct, editProduct, deleteProduct
  } = useContext(DataContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  if (productsLoading) return <div>Loading products...</div>;
  if (productsError) return <div>Error: {productsError}</div>;

  return (
    <div className="product-management">
      <button onClick={() => setShowAddForm(true)}>Add New Product</button>

      {showAddForm && (
        <div className="product-form">
          <input
            placeholder="Product Name"
            value={newProduct.name}
            onChange={e => setNewProduct({...newProduct, name: e.target.value})}
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={e => setNewProduct({...newProduct, description: e.target.value})}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={e => setNewProduct({...newProduct, price: e.target.value})}
          />
          <button
            onClick={() => {
              addProduct(newProduct);
              setShowAddForm(false);
              setNewProduct({ name: '', description: '', price: '', image: '' });
            }}
          >
            Save Product
          </button>
        </div>
      )}

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            {editingProduct?.id === product.id ? (
              <div className="edit-form">
                <input
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                />
                <textarea
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={e => setEditingProduct({...editingProduct, price: e.target.value})}
                />
                <button onClick={() => editProduct(product.id, editingProduct)}>
                  Save Changes
                </button>
              </div>
            ) : (
              <>
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <div className="product-actions">
                  <button onClick={() => setEditingProduct(product)}>Edit</button>
                  <button onClick={() => deleteProduct(product.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;