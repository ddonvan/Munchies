import { addItemToOrder, getOrdersFromRepository, updateOrderStatus, deleteItemFromOrder, createOrderInRepository, deleteOrderFromRepository } from "../repositories/order.repository.js";

// Get all orders
export const getOrders = async function (req, res, next) {
    try {
        const orders = await getOrdersFromRepository({});
        res.status(200).send(orders);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch a list of orders`);
    }
}

// Get an order based on id
export const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await getOrdersFromRepository({_id: id});
        res.status(200).send(order);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch order`);
    }
}

// Add an item to an order
export const addOrderItem = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const order = await addItemToOrder(id, body);
        res.status(200).send(order);
    } catch (e) {
        res.status(500).send(`${e.message} failed to add item to order`);
    }
}

// Delete an item from an order
export const deleteOrderItem = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const order = await deleteItemFromOrder(id, body);
        res.status(200).send(order);
    } catch (e) {
        res.status(500).send(`${e.message} failed to delete item from menu`);
    }
}

// Update the status of an order
export const updateStatus= async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const order = await updateOrderStatus({_id: id}, body);

        res.status(200).send(order);

        console.log(order);
    } catch (e) {
        res.status(500).send(`${e.message} failed to update status for order`);
    }
}

// Create an order
export const createOrder = async (req, res) => {
    const { body } = req;
    try {
      const order = await createOrderInRepository(body);
      res.status(200).send(order);
    } catch (e) {
      res.status(500).send(`failed to create order ${e.message}`);
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await deleteOrderFromRepository({ _id: id });
        res.status(200).send(order);
    } catch(e) {
        res.status(500).send(`${e.message} failed to delete order`);
    }
}