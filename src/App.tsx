import './App.css';
import type { Stone } from './types/Stone';
import StoneList from './components/StoneList';
import stonesData from './data/data.json';

// Process and transform data from data.json
const stoneData: Stone[] = stonesData.map(item => {
  // Convert isSold from null to false when needed
  const isSold = item.isSold === true;
  
  // Parse created_at into a standardized format
  const created_at = item.created_at || new Date().toISOString();
  
  // Only use name if it exists in the original data, otherwise empty string
  const name = "";
  
  // Set price based on category
  const price = item.category === "תמונה" ? 150 : 40;
  
  return {
    id: parseInt(item.sku) || 0,
    name: name,
    description: item.description || "",
    image: item.image || "",
    category: item.category || "מחזיק מפתחות",
    sku: item.sku || "",
    isSold: isSold,
    created_at: created_at,
    price: price
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
        <StoneList stones={stoneData} />
      </main>
      
      <footer>
        <p>© 2025 Stoneframe</p>
      </footer>
    </div>
  );
}

export default App;