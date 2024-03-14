import { getRestaurantsFromRepository, updateRestaurantinRepository, addRestaurantToRepository } from "../repositories/restaurant.repository.js";

// Gets a list of all courses in the database
export const getRestaurants = async function (req, res, next) {
    try {
        const restaurants = await getRestaurantsFromRepository({});
        res.status(200).send(restaurants);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch a list of restaurants`);
    }
}

// gets a course based on the given course id
export const getRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await getRestaurantsFromRepository({_id: id});
        res.status(200).send(restaurant);
    } catch (e) {
        res.status(500).send(`${e.message} failed to fetch restaurant`);
    }
}

export const addRestaurant = async (req, res) => {
    const { body } = req;
    try {
      const restaurant = await addRestaurantToRepository(body);
      console.log(restaurant);
      res.status(200).send(restaurant);
    } catch (e) {
      res.status(500).send(`${e.message} failed to add restaurant`);
    }
  }

export const updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const restaurant = await updateRestaurantinRepository({ _id: id }, body);
      res.status(200).send(restaurant);
    } catch (e) {
      res.status(500).send(`${e.message} failed to update restaurant ${id}`);
    }
  }