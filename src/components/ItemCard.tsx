import type { Item } from '../types/Item';

type ItemCardProps = {
  item: Item;
  onClick: (item: Item) => void;
};

const ItemCard = ({ item, onClick }: ItemCardProps) => {
  // Check if the item is new (created within the last 2 months)
  const isNew = () => {
    const createdDate = new Date(item.created_at);
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    return createdDate >= twoMonthsAgo;
  };

  // Check if the text contains Hebrew characters
  const containsHebrew = (text: string) => {
    return /[\u0590-\u05FF]/.test(text);
  };

  return (
    <div className="stone-card" onClick={() => onClick(item)}>
      <div className="stone-image">
        <img src={item.image} alt={item.name} />
        {item.isSold && <div className="sold-overlay">SOLD</div>}
        {isNew() && <div className="new-badge">NEW</div>}
        <div className="sku-label">#{item.sku.padStart(4, '0')}</div>
      </div>
      <div className="stone-info">
        {item.name && <h3 className={containsHebrew(item.name) ? 'hebrew-text' : ''}>{item.name}</h3>}
        <p className={`stone-description ${containsHebrew(item.description) ? 'hebrew-text' : ''}`}>{item.description}</p>
        <div className="stone-meta">
          <span className={`stone-category ${containsHebrew(item.category) ? 'hebrew-text' : ''}`}>{item.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;