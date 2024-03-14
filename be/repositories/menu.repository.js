import Menu from "../models/menu.model.js";

export const getMenuFromRepository = async function (query) {
    try {
      const menus = await Menu.find(query);
      return menus;
    } catch (e) {
      throw Error("Error while fetching menus");
    }
  };
  
  export const addItemToMenu = async function (payload) {
      try {
          const addedItem = new Menu(payload);
          const savedItem = await addedItem.save();
          return savedItem;
      } catch (e) {
          throw Error("Error while adding item to menu ")
      }
  };
  
  export const deleteItemFromMenu = async function (query) {
      try {
          const deletedItem = await Menu.findOneAndDelete({...query})
          return deletedItem;
      } catch (e) {
          throw Error("Error while deleting item from menu ")
      }
  };
  
  export const updateItemInMenu = async function (query, payload) {
      try {
        const updatedItem = await Menu.findOneAndUpdate(
            { ...query },
            { ...payload },
            { new: true }
          ).lean();
          return updatedItem;
      } catch (e) {
          throw Error("Error while updating item")
      }
  };