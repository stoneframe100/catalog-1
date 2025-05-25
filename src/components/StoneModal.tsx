import type { Stone } from '../types/Stone';

type StoneModalProps = {
  stone: Stone;
  isOpen: boolean;
  onClose: () => void;
};

const StoneModal = ({ stone, isOpen, onClose }: StoneModalProps) => {
  if (!isOpen) return null;

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-details-container">
            <div className="modal-details">
              <h2 className={containsHebrew(stone.name) ? 'hebrew-text' : ''}>{stone.name}</h2>
              <p className={`modal-description ${containsHebrew(stone.description) ? 'hebrew-text' : ''}`}>{stone.description}</p>
              <div className="modal-info-list">
                <div className="modal-info-row">
                  <span className="modal-label hebrew-text">קטגוריה:</span>
                  <span className={`modal-value ${containsHebrew(stone.category) ? 'hebrew-text' : ''}`}>{stone.category}</span>
                </div>
                <div className="modal-info-row">
                  <span className="modal-label hebrew-text">מק"ט:</span>
                  <span className="modal-value">#{stone.sku.padStart(4, '0')}</span>
                </div>
                <div className="modal-info-row">
                  <span className="modal-label hebrew-text">סטטוס:</span>
                  <span className={`modal-value status hebrew-text ${stone.isSold ? 'sold' : 'available'}`}>
                    {stone.isSold ? 'נמכר' : 'זמין'}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="inquire-button hebrew-text" >להזמנה</button>
            </div>
          </div>
          <div className="modal-image">
            <img src={stone.image} alt={stone.name} />
            {stone.isSold && <div className="modal-sold-badge">SOLD</div>}
            {isNew() && <div className="modal-new-badge">NEW</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoneModal;