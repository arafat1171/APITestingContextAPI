import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DataDisplay from './components/DataDisplay';
import ProductDisplay from './components/ProductDisplay';
import { DataProvider } from './DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <nav className="navbar">
            <h1>API Test Using Context API</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
            </ul>
          </nav>

          <div className="main-content">
            <Routes>
              <Route path="/" element={<DataDisplay />} />
              <Route path="/products" element={<ProductDisplay />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;