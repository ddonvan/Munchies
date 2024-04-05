import Restaurant from "../models/restaurant.model.js";

// Get all restaurants
export const getRestaurantsFromRepository = async function (query) {
  try {
    const restaurants = await Restaurant.find(query);
    return restaurants;
  } catch (e) {
    throw Error("Error while fetching restaurants");
  }
};

// Add a restaurant
export const addRestaurantToRepository = async function (payload) {
    try {
        const addedRestaurant = new Restaurant(payload);
        const savedRestaurant = await addedRestaurant.save();
        return savedRestaurant;
    } catch (e) {
        throw Error("Error while adding restaurant")
    }
};

// Update a restaurant
export const updateRestaurantinRepository = async function (query, payload) {
    try {
      const updatedRestaurant = await Restaurant.findOneAndUpdate(
          { ...query },
          { ...payload },
          { new: true }
        ).lean();
        return updatedRestaurant;
    } catch (e) {
        throw Error("Error while updating restaurant")
    }
};