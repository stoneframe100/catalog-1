import { useState, useEffect } from 'react';
import type { Item } from '../types/Item';
import ItemCard from './ItemCard';
import ItemModal from './ItemModal';

type ItemListProps = {
  items: Item[];
};

const ItemList = ({ items }: ItemListProps) => {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('תמונה');
  const [showSold, setShowSold] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Initialize category filter from URL parameter on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    if (categoryFromUrl) {
      setCategoryFilter(categoryFromUrl);
    } else {
      setCategoryFilter('תמונה');
    }

    const selectedSku = urlParams.get('item');
    if (selectedSku) {
      const item = items.find(i => i.sku === selectedSku);
      if (item) {
        setSelectedItem(item);
        setIsModalOpen(true);
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
      }
    }
  }, []);

  // Update URL parameter when category filter changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (categoryFilter) {
      url.searchParams.set('category', categoryFilter);
    } else {
      url.searchParams.delete('category');
    }
    window.history.replaceState({}, '', url.toString());
  }, [categoryFilter]);

    // Update URL parameter when item is selected or deselected
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedItem) {
      url.searchParams.set('item', selectedItem.sku);
    } else {
      url.searchParams.delete('item');
    }
    window.history.replaceState({}, '', url.toString());
  }, [selectedItem]);

  // Get unique categories for filter
  const categories = Array.from(new Set(items.map(item => item.category))).sort();

  // Filter the stones based on search, category and sold status
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(filter.toLowerCase()) || 
      item.description.toLowerCase().includes(filter.toLowerCase()) || 
      item.sku.toLowerCase().includes(filter.toLowerCase());
    
    const matchesCategory = item.category === categoryFilter;
    const matchesSoldFilter = showSold || !item.isSold;
    
    return matchesSearch && matchesCategory && matchesSoldFilter;
  }).sort((a, b) => {
    // Sort by date in descending order (newest first)
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

  // Check if there are Hebrew categories for proper text direction
  const containsHebrew = (text: string) => {
    return /[\u0590-\u05FF]/.test(text);
  };

  return (
    <div className="stone-catalog">
      <div className="filter-controls">
        <input
          type="text"
          placeholder="חיפוש פריטים..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input hebrew-text"
        />
        
        <select 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`category-filter ${containsHebrew(categoryFilter) ? 'hebrew-text' : ''}`}
          dir={containsHebrew(categoryFilter) ? 'rtl' : 'ltr'}
        >
          {categories.map(category => (
            <option 
              key={category} 
              value={category}
              dir={containsHebrew(category) ? 'rtl' : 'ltr'}
            >
              {category}
            </option>
          ))}
        </select>
        
        <label className="sold-filter hebrew-text">
          <input 
            type="checkbox" 
            checked={showSold} 
            onChange={() => setShowSold(!showSold)} 
          />
          הצג פריטים שנמכרו
        </label>
      </div>
      
      <div className="stone-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onClick={handleItemClick}
            />
          ))
        ) : (
          <p className="no-results">No items found matching your criteria</p>
        )}
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default ItemList;