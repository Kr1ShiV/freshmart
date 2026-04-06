import React from 'react';

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
        <h5>⚠️ Confirm Action</h5>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-outline-custom" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger-custom" onClick={onConfirm} style={{ padding: '0.6rem 1.5rem' }}>
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
