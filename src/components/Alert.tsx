export const Alert = ({
  subject = 'הודעה',
  message,
  onClose,
  showAlert,
  onConfirm,
  onCancel,
  cancelText = 'ביטול',
  confirmText = 'הבנתי',
  children,
  confirmDisabled = false,
}: {
  subject?: string;
  message?: string;
  onClose: () => void;
  showAlert: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
  confirmDisabled?: boolean;
}) => {
  if (!showAlert) return null;

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-content" onClick={(e) => e.stopPropagation()}>
        <div className="alert-header">
          <h3 className="hebrew-text">{subject}</h3>
          <button className="alert-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="alert-body">
          {children ? (
            children
          ) : (
            <p className="hebrew-text">{message}</p>
          )}
        </div>
        <div className="alert-footer">
          <button className="alert-button hebrew-text" onClick={onConfirm || onClose} disabled={confirmDisabled}>
            {confirmText}
          </button>
           {onCancel && <button className="alert-button secondary-button hebrew-text" onClick={onCancel}>
            {cancelText}
          </button>}
        </div>
      </div>
    </div>
  );
};
