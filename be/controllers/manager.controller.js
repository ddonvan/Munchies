import { getManagerFromRepository, updateManagerinRepository, addManagerToRepository } from "../repositories/manager.repository.js";

// Gets a list of all courses in the database
export const getManagers = async function (req, res, next) {
    try {
        const managers = await getManagerFromRepository({});
        res.status(200).send(managers);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch a list of managers`);
    }
}

// gets a course based on the given course id
export const getManager = async (req, res) => {
    const { id } = req.params;
    try {
        const manager = await getManagerFromRepository({_id: id});
        res.status(200).send(manager);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch manager`);
    }
}

export const getManagersFromRestaurant = async (req, res) => {
    const { restId } = req.params;
    try {
        const manager = await getManagerFromRepository({ restaurant_id: restId });
        res.status(200).send(manager);
      } catch (e) {
        res.status(500).send(`${e.message} failed to fetch managers for restaurant ${restId}`);
      }
}


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