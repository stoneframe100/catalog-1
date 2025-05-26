import { useEffect, useState } from 'react';
import { Alert } from './Alert';

export const UpadatesAlert = () => {
  const [showUpdatesAlert, setShowUpdatesAlert] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailSubmitted = localStorage.getItem('emailSubmitted');
    if (!emailSubmitted) {
      setShowUpdatesAlert(true);
    }
  }, []);

  const handleEmailSubmit = async () => {
   const response = await fetch('https://hook.eu2.make.com/8tev33prfvv7saz2vomtlfkhn8dq47tm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'subscribe-to-email',
        email: email,
      }),
    });
    console.log('Email submitted:', email, 'Response:', response);
    localStorage.setItem('emailSubmitted', 'true');
    setShowUpdatesAlert(false);
  };

  const handleCancelEmail = () => {
    localStorage.setItem('emailSubmitted', 'true');
    setShowUpdatesAlert(false);
  };

  return (
    <Alert
      subject="רוצים להשאר מעודכנים?"
      showAlert={showUpdatesAlert}
      onClose={() => setShowUpdatesAlert(false)}
      onConfirm={handleEmailSubmit}
      onCancel={() => handleCancelEmail()}
      cancelText="לא תודה"
      confirmText="שליחה"
    >
      <div className="email-alert-body">
        <p>השאירו כתובת מייל ותקבלו עדכונים על מוצר חדש באתר, ועוד.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-input"
        />
      </div>
    </Alert>
  );
};
