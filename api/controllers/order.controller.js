const db = require("../models");
const Order = db.orders;
const Item = db.items;
const Customer = db.customers;

// Create a new Order
exports.create = async (req, res) => {
    try {
      const { order_date, customer_id, item_id } = req.body;
  
      // Validate the request
      if (!order_date || !customer_id || !item_id) {
        return res.status(400).send({
          message: "Order date, customer_id, and item_id are required!",
        });
      }
  
      // Create the order in the database
      const newOrder = await Order.create({ order_date, customer_id, item_id });
  
      // Fetch customer and item details concurrently
      const [customer, item] = await Promise.all([
        Customer.findOne({
          where: { customer_id },
          attributes: ["customer_name"],
        }),
        Item.findOne({
          where: { item_id },
          attributes: ["item_name"],
        }),
      ]);
  
      // Format the response
      res.status(201).send({
        order_id: newOrder.order_id,
        order_date: newOrder.order_date,
        customer_id: newOrder.customer_id,
        item_id: newOrder.item_id,
        customer_name: customer ? customer.customer_name : null,
        item_name: item ? item.item_name : null,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    }
  };
  
// Retrieve all Orders
exports.findAll = (req, res) => {
  Order.findAll({
    include: [
      {
        model: Customer,
        attributes: ["customer_name"],
      },
      {
        model: Item,
        attributes: ["item_name"],
      },
    ],
  })
    .then((data) => {
      // Map the data to include the customer_name and item_name
      const formattedData = data.map((order) => ({
        order_id: order.order_id,
        order_date: order.order_date,
        customer_id: order.customer_id,
        item_id: order.item_id, 
        customer_name: order.customer.customer_name,
        item_name: order.item.item_name, 
      }));
      res.send(formattedData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Update an Order by ID
exports.update = (req, res) => {
  const id = req.params.orderId;

  Order.update(req.body, {
    where: { order_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with id=" + id,
      });
    });
};

// Delete an Order by ID
exports.delete = (req, res) => {
  const id = req.params.orderId;

  Order.destroy({
    where: { order_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
      });
    });
};
