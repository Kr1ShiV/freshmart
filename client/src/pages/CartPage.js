import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import ConfirmDialog from '../components/ConfirmDialog';

function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleRemove = (productId) => {
    setConfirmRemove(productId);
  };

  const confirmRemoveItem = () => {
    if (confirmRemove) {
      removeFromCart(confirmRemove);
      setConfirmRemove(null);
    }
  };

  const handleClearCart = () => {
    setConfirmClear(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setConfirmClear(false);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingTop: '76px' }}>
        <div className="container mt-5">
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h4>Your Cart is Empty</h4>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn-primary-custom mt-3" style={{ textDecoration: 'none' }}>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = cartTotal;
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const total = subtotal + deliveryFee;

  return (
    <div style={{ paddingTop: '76px' }}>
      <div className="page-hero">
        <div className="container">
          <h1>🛒 Shopping Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn-danger-custom" onClick={handleClearCart}>
                🗑️ Clear Cart
              </button>
            </div>
            <div className="cart-table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={handleRemove}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="cart-summary">
              <h5>📋 Order Summary</h5>
              <div className="summary-row">
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span style={{ color: 'var(--text-muted)' }}>Delivery</span>
                <span>{deliveryFee === 0 ? <span style={{ color: 'var(--primary-light)' }}>FREE</span> : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
              {deliveryFee > 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  💡 Spend ₹{(500 - subtotal).toFixed(2)} more for free delivery!
                </p>
              )}
              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button className="btn-primary-custom w-100 mt-3" style={{ padding: '0.8rem', fontSize: '1rem' }}>
                Proceed to Checkout
              </button>
              <Link to="/products" className="btn-outline-custom w-100 mt-2 d-block text-center" style={{ textDecoration: 'none' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {confirmRemove && (
        <ConfirmDialog
          message="Are you sure you want to remove this item from your cart?"
          onConfirm={confirmRemoveItem}
          onCancel={() => setConfirmRemove(null)}
        />
      )}

      {confirmClear && (
        <ConfirmDialog
          message="Are you sure you want to clear your entire cart?"
          onConfirm={confirmClearCart}
          onCancel={() => setConfirmClear(false)}
        />
      )}
    </div>
  );
}

export default CartPage;
