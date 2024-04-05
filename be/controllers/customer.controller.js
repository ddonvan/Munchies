import { getCustomersFromRepository, addCustomerToRepository } from '../repositories/customer.repository.js';

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await getCustomersFromRepository({});
    res.status(200).send(customers);
  } catch (e) {
    res.status(500).send(`${e.message} failed to fetch a list of customers`);
  }
}

// Get a single customer by id
export const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await getCustomersFromRepository({ _id: id });
    res.status(200).send(customer);
  } catch (e) {
    res.status(500).send(`${e.message} failed to fetch customer ${id}`);
  }
}

// Add a customer
export const addCustomer = async (req, res) => {
  const { body } = req;
  try {
    const customer = await addCustomerToRepository(body);
    console.log(customer);
    res.status(200).send(customer);
  } catch (e) {
    res.status(500).send(`${e.message} failed to add customer`);
  }
}