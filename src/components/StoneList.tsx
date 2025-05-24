import { useState, useEffect } from 'react';
import type { Stone } from '../types/Stone';
import StoneCard from './StoneCard';
import StoneModal from './StoneModal';

type StoneListProps = {
  stones: Stone[];
};

const StoneList = ({ stones }: StoneListProps) => {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showSold, setShowSold] = useState(true);
  const [selectedStone, setSelectedStone] = useState<Stone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize category filter from URL parameter on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    if (categoryFromUrl) {
      setCategoryFilter(categoryFromUrl);
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

  // Get unique categories for filter
  const categories = Array.from(new Set(stones.map(stone => stone.category))).sort();

  // Filter the stones based on search, category and sold status
  const filteredStones = stones.filter(stone => {
    const matchesSearch = 
      stone.name.toLowerCase().includes(filter.toLowerCase()) || 
      stone.description.toLowerCase().includes(filter.toLowerCase()) || 
      stone.sku.toLowerCase().includes(filter.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || stone.category === categoryFilter;
    const matchesSoldFilter = showSold || !stone.isSold;
    
    return matchesSearch && matchesCategory && matchesSoldFilter;
  }).sort((a, b) => {
    // Sort by date in descending order (newest first)
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });

  const handleStoneClick = (stone: Stone) => {
    setSelectedStone(stone);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStone(null);
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
          <option value="">כל הקטגוריות</option>
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
        {filteredStones.length > 0 ? (
          filteredStones.map(stone => (
            <StoneCard 
              key={stone.id} 
              stone={stone} 
              onClick={handleStoneClick}
            />
          ))
        ) : (
          <p className="no-results">No items found matching your criteria</p>
        )}
      </div>

      {selectedStone && (
        <StoneModal
          stone={selectedStone}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default StoneList;