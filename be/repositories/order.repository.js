import Order from "../models/order.model.js";

// gets all orders
export const getOrdersFromRepository = async function (query) {
  try {
    const orders = await Order.find(query);
    return orders;
  } catch (e) {
    throw Error("Error while fetching orders");
  }
};

// add item to order
export const addItemToOrder = async function (orderId, item) {
    try {
        const updatedOrder= await Order.findByIdAndUpdate(
            orderId, 
            { $push: {items: item} },
            { new: true, useFindAndModify: false }
        ).lean();
        return updatedOrder;
    } catch (e) {
        throw Error("Error while adding item to menu ")
    }
};

export const deleteItemFromOrder= async function (orderId, item) {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { $pull: {items: item} },
            { new: true, useFindAndModify: false }
        ).lean();
        return updatedOrder;
    } catch (e) {
        throw Error("Error while deleting item from menu ")
    }
};


export const createOrderInRepository = async function (payload) {
    try {
      const addedOrder = new Order(payload);
      const savedOrder= await addedOrder.save();
      return savedOrder;
    } catch (e) {
      throw Error("Error while adding order");
    }
};

export const deleteOrderFromRepository = async function (query) {
    try {
        const deletedOrder = await Order.findOneAndDelete({ ...query });
        return deletedOrder;
    } catch (e) {
        throw Error("Error deleting order");
    }
}

export const updateOrderStatus = async function (orderId, body) {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            body,
            { new: true, useFindAndModify: false }
        ).lean();
        return updatedOrder;
    } catch (e) {
        throw Error("Error while updating order status")
    }
};
