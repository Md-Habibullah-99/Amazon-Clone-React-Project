export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export default function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}