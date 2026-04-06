import React from 'react';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <tr>
      <td>
        <div className="cart-product-info">
          <img src={item.image} alt={item.name} />
          <div>
            <strong style={{ fontSize: '0.9rem' }}>{item.name}</strong>
            <br />
            <small style={{ color: 'var(--text-muted)' }}>per {item.unit}</small>
          </div>
        </div>
      </td>
      <td style={{ fontWeight: 600 }}>₹{item.price.toFixed(2)}</td>
      <td>
        <div className="qty-controls">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= 99}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </td>
      <td style={{ fontWeight: 700, color: 'var(--primary-light)' }}>
        ₹{(item.price * item.quantity).toFixed(2)}
      </td>
      <td>
        <button
          className="btn-danger-custom"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name}`}
        >
          ✕ Remove
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
