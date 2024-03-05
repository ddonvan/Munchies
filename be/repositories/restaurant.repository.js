import Restaurant from "../models/restaurant.model.js";

export const getRestaurantsFromRepository = async function (query) {
  try {
    const restaurants = await Restaurant.find(query);
    return restaurants;
  } catch (e) {
    throw Error("Error while fetching restaurants");
  }
};

export const updateItemQuantityInRepository = async function (restId, itemId, newQuantity) {
    try {
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            {"_id": restId, "menu.item_id": itemId},
            { $set: { 'menu.$.quantity': newQuantity } },
            { new: true, useFindAndModify: false }
        ).lean();
        return updatedRestaurant;
    } catch (e) {
        throw Error("Error while updating item quantity")
    }
};