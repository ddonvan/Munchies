import { getMenuFromRepository, updateItemInMenu, deleteItemFromMenu, addItemToMenu } from '../repositories/menu.repository.js';

// Get all menus
export const getMenus = async (req, res) => {
  try {
    const menus = await getMenuFromRepository({});
    res.status(200).send(menus);
  } catch (e) {
    res.status(500).send(`${e.message} failed to fetch a list of menus`);
  }
}

// Get an item from a menu
export const getMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await getMenuFromRepository({ _id: id });
    res.status(200).send(item);
  } catch (e) {
    res.status(500).send(`${e.message} failed to fetch item ${id}`);
  }
}

// Get items from a restaurant
export const getItemsOnRestaurantMenu = async (req, res) => {
    const { restId } = req.params;
    try {
        const items = await getMenuFromRepository({ rest_id: restId });
        res.status(200).send(items);
      } catch (e) {
        res.status(500).send(`${e.message} failed to fetch items for restaurant ${restId}`);
      }
}

// Update a menu item
export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const item = await updateItemInMenu({ _id: id }, body);
    res.status(200).send(item);
  } catch (e) {
    res.status(500).send(`${e.message} failed to update item ${id}`);
  }
}

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await deleteItemFromMenu({ _id: id });
    if (item) {
      res.status(204).send();
    } else {
      res.status(404).send(`${e.message} failed to delete item ${id}`);
    };
  } catch (e) {
    res.status(500).send(`${e.message} failed to delete item ${id}`);
  }
};

// Add a menu item
export const addMenuItem = async (req, res) => {
  const { body } = req;
  try {
    const item = await addItemToMenu(body);
    console.log(item);
    res.status(200).send(item);
  } catch (e) {
    res.status(500).send(`${e.message} failed to add item`);
  }
}