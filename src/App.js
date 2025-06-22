// src/App.js
import { DataProvider } from './DataContext';
import DataDisplay from './components/DataDisplay';
import './App.css';

// Debug imports


function App() {
  // Fallback render if components fail
  if (!DataProvider || !DataDisplay) {
    return <div>Error: One or more components failed to load. Check console for details.</div>;
  }

  return (
    <DataProvider>
      <div id="root">
        <nav className="navbar">
          <h1>API Test Using Context API</h1>
          <div>
            <a href="/">Home</a>
          </div>
        </nav>
        <div className="card-container">
          <DataDisplay />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;