import { getManagerFromRepository, updateManagerinRepository, addManagerToRepository } from "../repositories/manager.repository.js";

// Get all managers
export const getManagers = async function (req, res, next) {
    try {
        const managers = await getManagerFromRepository({});
        res.status(200).send(managers);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch a list of managers`);
    }
}

// Get a manager based on id
export const getManager = async (req, res) => {
    const { id } = req.params;
    try {
        const manager = await getManagerFromRepository({_id: id});
        res.status(200).send(manager);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch manager`);
    }
}

// Get managers based on restaurant id
export const getManagersFromRestaurant = async (req, res) => {
    const { restId } = req.params;
    try {
        const manager = await getManagerFromRepository({ restaurant_id: restId });
        res.status(200).send(manager);
      } catch (e) {
        res.status(500).send(`${e.message} failed to fetch managers for restaurant ${restId}`);
      }
}

// Add manager
export const addManager = async (req, res) => {
    const { body } = req;
    try {
      const manager = await addManagerToRepository(body);
      console.log(manager);
      res.status(200).send(manager);
    } catch (e) {
      res.status(500).send(`${e.message} failed to add manager`);
    }
  }
  // Update manager
  export const updateManager = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const manager = await updateManagerinRepository({ _id: id }, body);
      res.status(200).send(manager);
    } catch (e) {
      res.status(500).send(`${e.message} failed to update manager ${id}`);
    }
  }