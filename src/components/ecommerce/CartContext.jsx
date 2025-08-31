import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ userId = 'guest', children }) {
  const storageKey = `cart_${userId}`;
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        } else {
          console.warn('Invalid cart data in localStorage, resetting');
          localStorage.removeItem(storageKey);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      localStorage.removeItem(storageKey);
    } finally {
      setIsLoading(false);
    }
  }, [userId, storageKey]);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(cart));
        console.log('Cart saved:', cart); // Debug log
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, userId, storageKey, isLoading]);

  const addToCart = (product, quantity = 1) => {
    console.log('Adding to cart:', product, quantity); // Debug log
    
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      return;
    }
    
    setCart(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Update existing item quantity
        const updated = [...prev];
        updated[existingItemIndex].quantity += quantity;
        console.log('Updated existing item:', updated[existingItemIndex]);
        return updated;
      } else {
        // Add new item
        const newItem = {
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.image,
          quantity: quantity,
          mlmPoints: product.mlmPoints || 0
        };
        console.log('Added new item:', newItem);
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (productId) => {
    console.log('Removing from cart:', productId); // Debug log
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const qty = Math.max(1, Number(quantity) || 1);
    console.log('Updating quantity:', productId, qty); // Debug log
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: qty } : item
    ));
  };

  const clearCart = () => {
    console.log('Clearing cart'); // Debug log
    setCart([]);
  };

  // Calculate totals
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  console.log('Cart state:', { cart, cartTotal, itemCount, userId }); // Debug log

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal,
      itemCount,
      isLoading
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