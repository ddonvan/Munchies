import { getCustomersFromRepository } from '../repositories/customer.repository.js';

export const getCustomers = async (req, res) => {
  try {
    const customers = await getCustomersFromRepository({});
    res.status(200).send(customers);
  } catch (e) {
    res.status(500).send(`${e.message} failed to fetch a list of superheroes`);
  }
}

export const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await getCustomersFromRepository({ _id: id });
    res.status(200).send(customer);
  } catch (e) {
    res.status(500).send(`${e.message} failed to fetch superhero ${id}`);
  }
}