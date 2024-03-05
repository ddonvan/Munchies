import { addItemToMenu, getRestaurantsFromRepository, updateItemInMenu, deleteItemFromMenu } from "../repositories/restaurant.repository.js";

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

export const addMenuItem = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const restaurant = await addItemToMenu(id, body);
        res.status(200).send(restaurant);
    } catch (e) {
        res.status(500).send(`${e.message} failed to add item to menu`);
    }
}

export const deleteMenuItem = async(req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const restaurant = await deleteItemFromMenu(id, body);
        res.status(200).send(restaurant);
    } catch (e) {
        res.status(500).send(`${e.message} failed to delete item from menu`);
    }
}

//adds a student to the course based on the given course id and student id
export const updateItemQuantity = async(req, res) => {
    const { id } = req.params;
    const { item_id } = req.params;
    const { body } = req;

    try {
        const restaurant = await updateItemInMenu(id, item_id, body);
        res.status(200).send(restaurant);
    } catch (e) {
        res.status(500).send(`${e.message} failed to update item quantity for restaurant`);
    }
}