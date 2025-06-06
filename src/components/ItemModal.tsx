import { useEffect, useState } from 'react';
import type { Item } from '../types/Item';
import { Alert } from './Alert';
import { useNavigate } from 'react-router-dom';

type ItemModalProps = {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
};

const ItemModal = ({ item, isOpen, onClose }: ItemModalProps) => {
  const [showAlert, setShowAlert] = useState(false);

  const [earlyAccessCode, setEarlyAccessCode] = useState('');
  const [wrongEarlyAccessCode, setWrongEarlyAccessCode] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('event', isOpen ? 'open_item_modal' : 'close_item_modal', {
      item_id: item.sku,
    });
  }, [isOpen, item.sku]);

  if (!isOpen) return null;

  // Check if the stone is new (created within the last 2 months)
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

  // Handle purchase button click
  const handlePurchaseClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('event', 'purchase_clicked', {
      item_id: item.sku,
    });
    setShowAlert(true);
  };

  const onContinueToPurchaseClick = () => {
    if (earlyAccessCode === 'STONELOVE') {
      navigate(`/purchase/${item.sku}?earlyAccessCode=${encodeURIComponent(earlyAccessCode)}`);
    } else {
      setWrongEarlyAccessCode(true);
      return;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">
          <div className="modal-image">
            <img src={item.image} alt={item.name} />
            {item.isSold && <div className="modal-sold-badge">SOLD</div>}
            {isNew() && <div className="modal-new-badge">NEW</div>}
          </div>
          <div className="modal-details-container">
            <div className="modal-details">
              <h2 className={containsHebrew(item.name) ? 'hebrew-text' : ''}>{item.name}</h2>
              <p
                className={`modal-description ${
                  containsHebrew(item.description) ? 'hebrew-text' : ''
                }`}
              >
                {item.description}
              </p>
              <div className="modal-info-list">
                <div className="modal-info-row">
                  <span className="modal-label hebrew-text">קטגוריה:</span>
                  <span
                    className={`modal-value ${containsHebrew(item.category) ? 'hebrew-text' : ''}`}
                  >
                    {item.category}
                  </span>
                </div>

                <div className="modal-info-row">
                  <span className="modal-label hebrew-text">מק"ט:</span>
                  <span className="modal-value">#{item.sku.padStart(4, '0')}</span>
                </div>

                {item.size && (
                  <div className="modal-info-row">
                    <span className="modal-label hebrew-text">גודל:</span>
                    <span className="modal-value ltr">{item.size}</span>
                  </div>
                )}

                <div className="modal-info-row">
                  <span className="modal-label hebrew-text">סטטוס:</span>
                  <span
                    className={`modal-value status hebrew-text ${
                      item.isSold ? 'sold' : 'available'
                    }`}
                  >
                    {item.isSold ? 'נמכר' : 'זמין'}
                  </span>
                </div>

                {item.price && (
                  <div className="modal-info-row">
                    <span className="modal-label hebrew-text">מחיר:</span>
                    <span className="modal-value">
                      {new Intl.NumberFormat('he-IL', {
                        style: 'currency',
                        currency: 'ILS',
                      }).format(item.price)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                disabled={item.isSold}
                className="inquire-button hebrew-text"
                onClick={handlePurchaseClick}
              >
                להזמנה
              </button>
            </div>
          </div>
        </div>
      </div>

      <Alert
        subject="המכירה פתוחה רק לחברים קרובים"
        onClose={() => setShowAlert(false)}
        showAlert={showAlert}
        confirmText="המשך להזמנה"
        confirmDisabled={!earlyAccessCode.trim()}
        onConfirm={onContinueToPurchaseClick}
      >
        <div className="email-alert-body">
          <p>אם קיבלת קוד אישי למכירה מוקדמת – זה הזמן להשתמש בו  🎁</p>
          <div>
            <label className="modal-label" htmlFor="early-access-code">
              קוד אישי
            </label>
            <input
              id="early-access-code"
              className="text-input"
              type="text"
              placeholder="הכנס/י את הקוד האישי שלך"
              value={earlyAccessCode}
              onChange={(e) => setEarlyAccessCode(e.target.value)}
            />
          </div>
        </div>
      </Alert>

      <Alert
        subject="הקוד שהזנת לא מזוהה"
        showAlert={wrongEarlyAccessCode}
        onClose={() => {
          setWrongEarlyAccessCode(false);
          setShowAlert(false);
          setEarlyAccessCode('');
        }}
      >
        <div className="email-alert-body">
          <p>ייתכן שעדיין אין לך גישה למכירה המוקדמת – היא שמורה לחברים הקרובים בלבד 🎁</p>{' '}
          <p>אבל אל דאגה! ההשקה המלאה כבר ממש מעבר לפינה.</p>
        </div>
      </Alert>
    </div>
  );
};

export default ItemModal;
