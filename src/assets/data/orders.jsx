// Orders state and functions

// Holds the in-memory list of orders, kept in sync with localStorage.
export let orders = [];

// Load orders from localStorage
export function loadOrdersFromStorage() {
  const storedOrders = localStorage.getItem('orders');
  orders = storedOrders ? JSON.parse(storedOrders) : [];
}

// Initialize orders
loadOrdersFromStorage();

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
  window.dispatchEvent(new Event('ordersUpdate'));
}

/**
 * Generates an Amazon-style order ID, e.g. "701-2345678-9012345".
 * Combines random digit blocks with a timestamp-derived piece so IDs
 * placed in quick succession still stay unique.
 */
export function generateOrderId() {
  const randomDigits = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  };

  const timestampPart = Date.now().toString().slice(-7);

  return `${randomDigits(3)}-${timestampPart}-${randomDigits(7)}`;
}

// Add a new order to the top of the list and persist it
export default function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

// Look up a single order by its ID (re-reads storage to stay fresh)
export function getOrder(orderId) {
  loadOrdersFromStorage();
  return orders.find((order) => order.id === orderId);
}

// Look up a single product line within an order
export function getOrderProduct(orderId, productId) {
  const order = getOrder(orderId);
  if (!order) return undefined;

  return order.products.find((product) => product.productId === productId);
}
