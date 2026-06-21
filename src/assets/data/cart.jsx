import React, { useState, useEffect } from 'react';

// Cart state and functions
export let cart;

// Load cart from localStorage
export function loadFromStorage() {
  const storedCart = localStorage.getItem('cart');
  
  if (storedCart) {
    cart = JSON.parse(storedCart);
  } else {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '1'
    }];
  }
}

// Initialize cart
loadFromStorage();

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity = 1) {
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export default function calculateCartQuantity() {
  let cartQuantity = 0;
  
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  return cartQuantity;
}

export function updateCartQuantity() {
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (!cartQuantityElement) {
    return;
  }

  const cartQuantity = calculateCartQuantity();
  cartQuantityElement.innerHTML = cartQuantity ? cartQuantity : '';
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

// React Hook for cart management
export function useCart() {
  const [cartItems, setCartItems] = useState(cart);
  const [cartQuantity, setCartQuantity] = useState(calculateCartQuantity());

  const updateCartState = () => {
    setCartItems([...cart]);
    setCartQuantity(calculateCartQuantity());
  };

  const addItem = (productId, quantity = 1) => {
    addToCart(productId, quantity);
    updateCartState();
  };

  const removeItem = (productId) => {
    removeFromCart(productId);
    updateCartState();
  };

  const updateDelivery = (productId, deliveryOptionId) => {
    updateDeliveryOption(productId, deliveryOptionId);
    updateCartState();
  };

  useEffect(() => {
    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        loadFromStorage();
        updateCartState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    cartItems,
    cartQuantity,
    addItem,
    removeItem,
    updateDelivery,
    refreshCart: updateCartState
  };
}

// React Components
export const CartQuantityBadge = () => {
  const { cartQuantity } = useCart();
  
  return (
    <span className="js-cart-quantity cart-quantity">
      {cartQuantity > 0 ? cartQuantity : ''}
    </span>
  );
};

export const AddToCartButton = ({ productId, quantity = 1 }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem(productId, quantity);
  };

  return (
    <button 
      className="add-to-cart-button"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export const RemoveFromCartButton = ({ productId }) => {
  const { removeItem } = useCart();
  
  const handleRemoveFromCart = () => {
    removeItem(productId);
  };

  return (
    <button 
      className="remove-from-cart-button"
      onClick={handleRemoveFromCart}
    >
      Remove
    </button>
  );
};

export const QuantitySelector = ({ productId, initialValue = 1 }) => {
  const [quantity, setQuantity] = useState(initialValue);

  return (
    <select 
      className={`select-on-productId-${productId}`}
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  );
};

export const CartItem = ({ item, onUpdate, onRemove }) => {
  const { updateDelivery } = useCart();
  
  const handleDeliveryChange = (e) => {
    updateDelivery(item.productId, e.target.value);
    if (onUpdate) onUpdate();
  };

  const handleRemove = () => {
    removeFromCart(item.productId);
    if (onRemove) onRemove();
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <span>Product ID: {item.productId}</span>
        <span>Quantity: {item.quantity}</span>
        <span>Delivery Option: {item.deliveryOptionId}</span>
      </div>
      <div className="cart-item-actions">
        <select 
          value={item.deliveryOptionId}
          onChange={handleDeliveryChange}
          className="delivery-option-select"
        >
          <option value="1">Standard (5-7 days)</option>
          <option value="2">Express (2-3 days)</option>
          <option value="3">Next Day (1 day)</option>
        </select>
        <button onClick={handleRemove} className="remove-button">
          Remove
        </button>
      </div>
    </div>
  );
};

// Cart Page Component
export const CartPage = () => {
  const { cartItems, cartQuantity, refreshCart } = useCart();

  return (
    <div className="cart-page">
      <h2>Shopping Cart ({cartQuantity} items)</h2>
      <CartQuantityBadge />
      
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem 
              key={item.productId} 
              item={item}
              onUpdate={refreshCart}
              onRemove={refreshCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};