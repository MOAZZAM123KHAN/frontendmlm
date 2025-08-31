import React from 'react';
import { useCart } from './CartContext';

const CartTest = () => {
  const { cart, addToCart, removeFromCart, clearCart, cartTotal, itemCount } = useCart();

  const testProduct = {
    id: 'test-1',
    name: 'Test Product',
    price: 99.99,
    image: 'https://via.placeholder.com/150',
    mlmPoints: 25
  };

  const handleAddTestProduct = () => {
    addToCart(testProduct, 1);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Cart Test Component</h3>
      
      <div className="space-y-4">
        <div>
          <p><strong>Cart Items:</strong> {itemCount}</p>
          <p><strong>Cart Total:</strong> ${cartTotal.toFixed(2)}</p>
        </div>
        
        <div className="space-y-2">
          <button 
            onClick={handleAddTestProduct}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Test Product
          </button>
          
          <button 
            onClick={clearCart}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
          >
            Clear Cart
          </button>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Cart Contents:</h4>
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <ul className="space-y-1">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-white p-2 rounded">
                  <span>{item.name} (Qty: {item.quantity})</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartTest; 