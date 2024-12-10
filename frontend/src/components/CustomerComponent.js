import { useEffect, useState } from "react";

function CustomerComponent() {
  const [customers, setCustomers] = useState([]);
  const [customer_name, setCustomerName] = useState("");
  const [customer_email, setCustomerEmail] = useState("");

  // Function to create a new customer
  async function createNewCustomer(e) {
    e.preventDefault();

    const response = await fetch("http://localhost/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name,
        customer_email
      }),
    });

    const data = await response.json();

    if (data.customer_id) {
      setCustomers([...customers, data]);
    }

    setCustomerName("");
    setCustomerEmail("");
  }

  // Function to get customers data
  useEffect(() => {
    fetch("http://localhost/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Function to delete an customer
  async function doDelete(customer_id) {
    await fetch(`http://localhost/api/customers/${customer_id}`, {
      method: "DELETE",
    });

    const updatedcustomers = customers.filter((customer) => customer.customer_id !== customer_id);
    setCustomers(updatedcustomers);
  }

  // Function to toggle customer details
  function toggleExpanded(index) {
    setCustomers((prevcustomers) =>
      prevcustomers.map((customer, i) => ({
        ...customer,
        expanded: i === index ? !customer.expanded : customer.expanded,
      }))
    );
  }

  return (
    <div className="item-component">
      {/* New Customer Form */}
      <form className="new-item" onSubmit={createNewCustomer}>
        <input
          type="text"
          placeholder="Customer Name"
          onChange={(e) => setCustomerName(e.target.value)}
          value={customer_name}
        />
        <input
          type="text"
          placeholder="Customer Email Address"
          onChange={(e) => setCustomerEmail(e.target.value)}
          value={customer_email}
        />
        <button className="button green" type="submit">
          Create New Customer
        </button>
      </form>

      <hr />

      {/* Customer List */}
      <div className="item-list">
        <h2>customers</h2>

        {customers.map((item, index) => (
          <div
            key={item.customer_id}
            className="item"
            onClick={() => toggleExpanded(index)}
          >
            <div className="title">
              <div className="item-info">
                <p>
                  <strong>Customer Name:</strong> {item.customer_name}
                </p>
                <p>
                  <strong>Email Address:</strong> {item.customer_email}
                </p>
              </div>
            </div>

            {item.expanded && (
              <div style={{ display: "block" }}>
                <button
                  className="button red"
                  onClick={(e) => {
                    e.stopPropagation();
                    doDelete(item.customer_id);
                  }}
                >
                  Delete Customer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerComponent;
