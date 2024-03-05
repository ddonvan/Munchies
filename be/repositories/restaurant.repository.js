import Restaurant from "../models/restaurant.model.js";

export const getRestaurantsFromRepository = async function (query) {
  try {
    const restaurants = await Restaurant.find(query);
    return restaurants;
  } catch (e) {
    throw Error("Error while fetching restaurants");
  }
};

export const addItemToMenu = async function (restId, item) {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restId, 
            { $push: {menu: item} },
            { new: true, useFindAndModify: false }
        ).lean();
        return updatedRestaurant;
    } catch (e) {
        throw Error("Error while adding item to menu ")
    }
};

export const deleteItemFromMenu = async function (restId, item) {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restId, 
            { $pull: {menu: item} },
            { new: true, useFindAndModify: false }
        ).lean();
        return updatedRestaurant;
    } catch (e) {
        throw Error("Error while deleting item from menu ")
    }
};

export const updateItemInMenu = async function (restId, itemId, body) {
    try {
        const updateObject = {};
        for (const key in body) {
            updateObject[`menu.$.${key}`] = body[key];
        }

        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            {"_id": restId, "menu.item_id": itemId},
            { $set: updateObject },
            { new: true, useFindAndModify: false }
        ).lean();
        return updatedRestaurant;
    } catch (e) {
        throw Error("Error while updating item quantity")
    }
};