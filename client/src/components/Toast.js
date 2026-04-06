import React from 'react';
import { useCart } from '../context/CartContext';

function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast-notification ${toast.type || ''}`}>
        {toast.type === 'info' ? 'ℹ️' : '✅'} {toast.message}
      </div>
    </div>
  );
}

export default Toast;
