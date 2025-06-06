import { useParams } from 'react-router-dom';
import type { Item } from '../types/Item';
import { useState } from 'react';
import { Alert } from './Alert';

type PurchaseProps = {
  items: Item[];
};

const Purchase = ({ items }: PurchaseProps) => {
  const { sku } = useParams();
  const item = items.find((i) => i.sku === sku);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false);

  if (!item) {
    return <div className="loading">הפריט לא נמצא</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      type: 'purchase',
      name,
      email,
      phone,
      sku: item.sku,
      price: item.price,
      image: item.image,
    };

    try {
      const response = await fetch('https://hook.eu2.make.com/8tev33prfvv7saz2vomtlfkhn8dq47tm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('שליחה נכשלה');
      }

      setShowPurchaseAlert(true);
    } catch (error) {
      console.error(error);
      alert('אירעה שגיאה בשליחת ההזמנה. אנא נסו שוב מאוחר יותר.');
    }
  };

  return (
    <main className="hebrew-text">
      <div className="purchase-container">
        <div className="purchase-image-container">
          <h2>{item.name}</h2>
          <div className="purchase-image">
            <img src={`/${item.image}`} alt={item.name} />
          </div>
        </div>
        <div className="purchase-form">
          {item.price && (
            <p className="modal-value purchase-price">
              מחיר:
              {new Intl.NumberFormat('he-IL', {
                style: 'currency',
                currency: 'ILS',
              }).format(item.price)}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <label className="hebrew-text">
              שם מלא:
              <input
                className="text-input hebrew-text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="hebrew-text">
              אימייל:
              <input
                className="text-input"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="hebrew-text">
              טלפון:
              <input
                className="text-input"
                name="phone"
                autoComplete="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            <button className="inquire-button hebrew-text" type="submit">
              השלם הזמנה
            </button>
          </form>
        </div>
      </div>

      <Alert
        subject="תודה שרכשתם ♥"
        showAlert={showPurchaseAlert}
        onClose={() => setShowPurchaseAlert(false)}
        onConfirm={() => {
          window.location.href = '/';
        }}
        confirmDisabled={!email}
      >
        <div>
          <p>הפריט שמור עבורכם!</p>
          <p>אנחנו ניצור איתכם קשר בקרוב להשלמת ההזמנה ✨</p>
          <p className="stoneframe-keyword-container">
            תודה שבחרתם ב־<span className="stoneframe-keyword">STONEFRAME</span>
          </p>
        </div>
      </Alert>
    </main>
  );
};

export default Purchase;
