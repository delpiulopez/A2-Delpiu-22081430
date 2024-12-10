import { useEffect, useState } from "react";

function ItemComponent() {
  const [items, setItems] = useState([]);
  const [item_name, setItemName] = useState("");
  const [item_price, setItemPrice] = useState("");

  // Function to create a new item
  async function createItem(e) {
    e.preventDefault();

    const response = await fetch("http://localhost/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_name,
        item_price: parseInt(item_price),
      }),
    });

    const data = await response.json();

    if (data.item_id) {
      setItems([...items, data]);
    }

    setItemName("");
    setItemPrice("");
  }

  // Function to get items data
  useEffect(() => {
    fetch("http://localhost/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Function to delete an item
  async function doDelete(item_id) {
    await fetch(`http://localhost/api/items/${item_id}`, {
      method: "DELETE",
    });

    const updatedItems = items.filter((item) => item.item_id !== item_id);
    setItems(updatedItems);
  }

  // Function to toggle item details
  function toggleExpanded(index) {
    setItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        expanded: i === index ? !item.expanded : item.expanded,
      }))
    );
  }

  return (
    <div className="item-component">
      {/* New Item Form */}
      <form className="new-item" onSubmit={createItem}>
        <input
          type="text"
          placeholder="Item Name"
          onChange={(e) => setItemName(e.target.value)}
          value={item_name}
        />
        <input
          type="text"
          placeholder="Item Price"
          onChange={(e) => setItemPrice(e.target.value)}
          value={item_price}
        />
        <button className="button green" type="submit">
          Create New Item
        </button>
      </form>

      <hr />

      {/* Item List */}
      <div className="item-list">
        <h2>Items</h2>

        {items.map((item, index) => (
          <div
            key={item.item_id}
            className="item"
            onClick={() => toggleExpanded(index)}
          >
            <div className="title">
              <h3>Item Data</h3>
              <div className="item-info">
                <p>
                  <strong>Item:</strong> {item.item_name}
                </p>
                <p>
                  <strong>Price:</strong> {item.item_price}
                </p>
              </div>

              <button
                className="button red"
                onClick={(e) => {
                  e.stopPropagation();
                  doDelete(item.item_id);
                }}
              >
                Delete Item
              </button>
            </div>

            {item.expanded && (
              <div style={{ display: "block" }}>
                <hr />
                {/* Nothing to be inputted here */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemComponent;
