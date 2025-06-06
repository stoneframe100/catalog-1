import './App.css';
import type { Item } from './types/Item';
import ItemList from './components/ItemList';
import stonesData from '../data.json';
import { UpadatesAlert } from './components/UpdatesAlert';
import { Toaster } from 'react-hot-toast';

// Process and transform data from data.json
const stoneData: Item[] = stonesData.map(item => {
  // Convert isSold from null to false when needed
  const isSold = item.isSold === true;
  
  // Parse created_at into a standardized format
  const created_at = item.created_at || new Date().toISOString();
  
  // Only use name if it exists in the original data, otherwise empty string
  const name = "";

  return {
    id: parseInt(item.sku) || 0,
    name: name,
    description: item.description || "",
    image: `items/${item.sku}.jpg`,
    category: item.category || "מחזיק מפתחות",
    sku: item.sku || "",
    isSold: isSold,
    created_at: created_at,
    price: item.price,
    size: item.size || ''
  };
});

function App() {
  return (
    <div className="app">
      <header>
        <h1>STONEFRAME</h1>
        <p className="subtitle">לפעמים הדברים הקטנים ביותר ממלאים הכי הרבה מקום בלב ❣️</p>
      </header>
      
      <main>
        <ItemList items={stoneData} />
      </main>

      <UpadatesAlert />
      <Toaster position="top-center" />
      <footer>
        <p>© 2025 STONEFRAME</p>
      </footer>
    </div>
  );
}

export default App;