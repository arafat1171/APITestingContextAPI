import React, { useContext } from 'react';
import { DataContext } from '../DataContext';
import { useState } from 'react';

const DataDisplay = () => {
  const { data, loading, error, deleteData, editData, addData } = useContext(DataContext);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    Email: '',
    date: Date.now()
  });

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      {!showAddForm && (
        <button 
          className="add-btn"
          onClick={() => setShowAddForm(true)}
        >
          Add New Item
        </button>
      )}
      
      {showAddForm && (
        <div className="add-form">
          <h3>Add New Item</h3>
          <label>
            Name:
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={newItem.Email}
              onChange={(e) => setNewItem({...newItem, Email: e.target.value})}
            />
          </label>
          <div className="form-actions">
            <button 
              onClick={() => {
                addData(newItem);
                setShowAddForm(false);
                setNewItem({ name: '', Email: '', date: Date.now() });
              }}
            >
              Save
            </button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    <div className="data-cards-container">
      {data.map((item) => (
        <div key={item.id} className="data-card">
          <div className="card-header">
        <h3>{item.id}</h3>
        <div className="card-actions">
          <button 
            className="delete-btn"
            onClick={() => deleteData(item.id)}
            aria-label={`Delete item ${item.id}`}
          >
            ×
          </button>
          <button
            className="edit-btn"
            onClick={() => {
              setEditingId(item.id);
              setEditForm({
                name: item.name,
                Email: item.Email,
                date: item.date
              });
            }}
            aria-label={`Edit item ${item.id}`}
          >
            ✎
          </button>
        </div>
      </div>
          {editingId === item.id ? (
            <div className="edit-form">
              <label>
                Name:
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={editForm.Email}
                  onChange={(e) => setEditForm({...editForm, Email: e.target.value})}
                />
              </label>
              <div className="form-actions">
                <button 
                  onClick={() => {
                    editData(item.id, {...editForm, id: item.id});
                    setEditingId(null);
                  }}
                >
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Email:</strong> {item.Email}</p>
              <p><strong>Date:</strong> {new Date(item.date * 1000).toLocaleString()}</p>
             
            </>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default DataDisplay;
