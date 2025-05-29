import { useEffect } from 'react';
import type { Stone } from '../types/Stone';

type StoneCardProps = {
  stone: Stone;
  onClick: (stone: Stone) => void;
};

const StoneCard = ({ stone, onClick }: StoneCardProps) => {

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('event', 'open_item_model', {
      'item': stone.sku,
    });
  }, []);

  // Check if the stone is new (created within the last 2 months)
  const isNew = () => {
    const createdDate = new Date(stone.created_at);
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    return createdDate >= twoMonthsAgo;
  };

  // Check if the text contains Hebrew characters
  const containsHebrew = (text: string) => {
    return /[\u0590-\u05FF]/.test(text);
  };

  return (
    <div className="stone-card" onClick={() => onClick(stone)}>
      <div className="stone-image">
        <img src={stone.image} alt={stone.name} />
        {stone.isSold && <div className="sold-overlay">SOLD</div>}
        {isNew() && <div className="new-badge">NEW</div>}
        <div className="sku-label">#{stone.sku.padStart(4, '0')}</div>
      </div>
      <div className="stone-info">
        {stone.name && <h3 className={containsHebrew(stone.name) ? 'hebrew-text' : ''}>{stone.name}</h3>}
        <p className={`stone-description ${containsHebrew(stone.description) ? 'hebrew-text' : ''}`}>{stone.description}</p>
        <div className="stone-meta">
          <span className={`stone-category ${containsHebrew(stone.category) ? 'hebrew-text' : ''}`}>{stone.category}</span>
        </div>
      </div>
    </div>
  );
};

export default StoneCard;