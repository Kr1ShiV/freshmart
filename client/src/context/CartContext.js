import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

const CART_KEY = 'smart_grocery_cart';

function getCartFromStorage() {
  try {
    const cart = sessionStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getCartFromStorage);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart`);
  }, [showToast]);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  }, [showToast]);

  const updateQuantity = useCallback((productId, quantity) => {
    const qty = Math.max(1, Math.min(99, quantity));
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    showToast('Cart cleared', 'info');
  }, [showToast]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toast,
      setToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
