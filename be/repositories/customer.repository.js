import Customer from "../models/customer.model.js";

export const getCustomersFromRepository = async function (query) {
    try {
      const customers = await Customer.find(query);
      return customers;
    } catch (e) {
      throw Error("Error while fetching customers");
    }
  };

  export const addCustomerToRepository = async function (payload) {
    try {
        const addedCustomer = new Customer(payload);
        const savedCustomer = await addedCustomer.save();
        return savedCustomer;
    } catch (e) {
        throw Error("Error while adding customer")
    }
};