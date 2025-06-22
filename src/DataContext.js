
import { createContext, useState, useEffect, useCallback } from 'react';


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const localData = localStorage.getItem('appData');
    return localData ? JSON.parse(localData) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteData = useCallback(async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
      });
      const newData = data.filter(item => item.id !== id);
      setData(newData);
      localStorage.setItem('appData', JSON.stringify(newData));
    } catch (err) {
      setError(err.message);
    }
  }, [data]);

  const editData = useCallback(async (id, updatedItem) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      
      const newData = data.map(item => item.id === id ? updatedItem : item);
      setData(newData);
      localStorage.setItem('appData', JSON.stringify(newData));
    } catch (err) {
      setError(err.message);
    }
  }, [data]);

  const addData = useCallback(async (newItem) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add data');
      }
      
      const result = await response.json();
      const newData = [...data, {...result, id: Date.now()}];
      setData(newData);
      localStorage.setItem('appData', JSON.stringify(newData));
    } catch (err) {
      setError(err.message);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('https://68549c9c6a6ef0ed662f90d7.mockapi.io/Arafat');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
        
          if (!localStorage.getItem('appData')) {
            setData(result);
            localStorage.setItem('appData', JSON.stringify(result));
          }
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchData();
    }, []); 

    return (
      <DataContext.Provider value={{ data, loading, error, deleteData, editData, addData }}>
        {children}
      </DataContext.Provider>
    );
};

