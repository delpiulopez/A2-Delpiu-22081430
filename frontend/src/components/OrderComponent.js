import { useState, useEffect } from "react";

function OrderComponent() {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]); // Items for selection
  const [customers, setCustomers] = useState([]); // Customers for selection
  const [orderDate, setOrderDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [itemId, setItemId] = useState("");

  // Fetch initial data (Orders, Items, Customers)
  useEffect(() => {
    async function fetchData() {
      const [ordersRes, itemsRes, customersRes] = await Promise.all([
        fetch("http://localhost/api/orders"),
        fetch("http://localhost/api/items"),
        fetch("http://localhost/api/customers"),
      ]);

      setOrders(await ordersRes.json());
      setItems(await itemsRes.json());
      setCustomers(await customersRes.json());
    }

    fetchData();
  }, []);

  // Create a new order
  async function createOrder(e) {
    e.preventDefault();

    const response = await fetch("http://localhost/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_date: orderDate,
        customer_id: customerId,
        item_id: itemId,
      }),
    });

    const newOrder = await response.json();
    if (newOrder.order_id) {
      setOrders([...orders, newOrder]);
    }

    // Clear form fields
    setOrderDate("");
    setCustomerId("");
    setItemId("");
  }

  // Delete an order
  async function deleteOrder(orderId) {
    await fetch(`http://localhost/api/orders/${orderId}`, {
      method: "DELETE",
    });

    const updatedOrders = orders.filter((order) => order.order_id !== orderId);
    setOrders(updatedOrders);
  }

  return (
    <div className="order-component">
      <h2>Orders</h2>

      {/* New Order Form */}
      <form className="new-order" onSubmit={createOrder}>
        <input
          type="date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          required
        />
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.customer_id} value={customer.customer_id}>
              {customer.customer_name}
            </option>
          ))}
        </select>
        <select
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
        >
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.item_id} value={item.item_id}>
              {item.item_name}
            </option>
          ))}
        </select>
        <button type="submit" className="button green">
          Create Order
        </button>
      </form>

      <hr />

      {/* Orders List */}
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.order_id} className="order">
            <p>
              <strong>Order ID:</strong> {order.order_id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.order_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Customer:</strong> {order.customer_name}
            </p>
            <p>
              <strong>Item:</strong> {order.item_name}
            </p>
            <button
              className="button red"
              onClick={() => deleteOrder(order.order_id)}
            >
              Delete Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderComponent;
