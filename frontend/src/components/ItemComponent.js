import { useEffect, useState } from "react";

function ItemComponent() {
  const [items, setItems] = useState([]);
  const [item_name, setItemName] = useState("");
  const [item_price, setItemPrice] = useState("");
  const [editItemId, setEditItemId] = useState(null); // Track the item being edited
  const [editItemName, setEditItemName] = useState("");
  const [editItemPrice, setEditItemPrice] = useState("");

  // Fetch items data
  useEffect(() => {
    fetch("http://localhost/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Create a new item
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

  // Edit an existing item
  async function editItem(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost/api/items/${editItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_name: editItemName,
        item_price: parseInt(editItemPrice),
      }),
    });

    const updatedItem = await response.json();

    // Update the items list with the edited item
    setItems(
      items.map((item) =>
        item.item_id === updatedItem.item_id ? updatedItem : item
      )
    );

    // Reset edit states
    setEditItemId(null);
    setEditItemName("");
    setEditItemPrice("");
  }

  // Delete an item
  async function doDelete(item_id) {
    await fetch(`http://localhost/api/items/${item_id}`, {
      method: "DELETE",
    });

    const updatedItems = items.filter((item) => item.item_id !== item_id);
    setItems(updatedItems);
  }

  // Toggle item details
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
              <div className="item-info">
                <p>
                  <strong>Item:</strong> {item.item_name}
                </p>
                <p>
                  <strong>Price:</strong> {item.item_price}
                </p>
              </div>
            </div>

            {item.expanded && (
              <div style={{ display: "block" }}>
                <button
                  className="button red"
                  onClick={(e) => {
                    e.stopPropagation();
                    doDelete(item.item_id);
                  }}
                >
                  Delete Item
                </button>
                <button
                  className="button yellow"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditItemId(item.item_id);
                    setEditItemName(item.item_name);
                    setEditItemPrice(item.item_price);
                  }}
                >
                  Edit Item
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Edit Form */}
        {editItemId && (
          <form className="edit-item" onSubmit={editItem}>
            <h3>Edit Item</h3>
            <input
              type="text"
              placeholder="Item Name"
              onChange={(e) => setEditItemName(e.target.value)}
              value={editItemName}
              required
            />
            <input
              type="text"
              placeholder="Item Price"
              onChange={(e) => setEditItemPrice(e.target.value)}
              value={editItemPrice}
              required
            />
            <button className="button green" type="submit">
              Save Changes
            </button>
            <button
              className="button gray"
              type="button"
              onClick={() => setEditItemId(null)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ItemComponent;