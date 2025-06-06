import './App.css';
import type { Item } from './types/Item';
import ItemList from './components/ItemList';
import stonesData from '../data.json';
import { UpdatesAlert } from './components/UpdatesAlert';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Purchase from './components/Purchase';

// Process and transform data from data.json
const items: Item[] = stonesData.map((item) => {
  // Convert isSold from null to false when needed
  const isSold = item.isSold === true;

  // Parse created_at into a standardized format
  const created_at = item.created_at || new Date().toISOString();

  return {
    id: parseInt(item.sku) || 0,
    name: item.description,
    description: '',
    image: `items/${item.sku}.jpg`,
    category: item.category || 'מחזיק מפתחות',
    sku: item.sku || '',
    isSold: isSold,
    created_at: created_at,
    price: item.price,
    size: item.size || '',
  };
});

function App() {
  return (
    <div className="app">
      <Router>
        <header>
          <h1>
            <Link to="/" className="header-link">
              STONEFRAME
            </Link>
          </h1>
          <p className="subtitle">לפעמים הדברים הקטנים ביותר ממלאים הכי הרבה מקום בלב ❣️</p>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ItemList items={items} />} />
            <Route path="/purchase/:sku" element={<Purchase items={items} />} />
          </Routes>
        </main>

        <UpdatesAlert />
        <Toaster position="top-center" />
        <footer>
          <p>© 2025 STONEFRAME</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
