import { addItemToOrder, getOrdersFromRepository, updateOrderStatus, deleteItemFromOrder, createOrderInRepository, deleteOrderFromRepository } from "../repositories/order.repository.js";

// Gets a list of all courses in the database
export const getOrders = async function (req, res, next) {
    try {
        const orders = await getOrdersFromRepository({});
        res.status(200).send(orders);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch a list of orders`);
    }
}

// gets a course based on the given course id
export const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await getOrdersFromRepository({_id: id});
        res.status(200).send(order);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch order`);
    }
}

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

// updates everything
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

export const createOrder = async (req, res) => {
    const { body } = req;
    try {
      const order = await createOrderInRepository(body);
      res.status(200).send(order);
    } catch (e) {
      res.status(500).send(`failed to create order ${e.message}`);
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await deleteOrderFromRepository({ _id: id });
        res.status(200).send(order);
    } catch(e) {
        res.status(500).send(`${e.message} failed to delete order`);
    }
}