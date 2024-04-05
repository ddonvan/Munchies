import Manager from "../models/manager.model.js";

// Get Manager repo function
export const getManagerFromRepository = async function (query) {
  try {
    const manager = await Manager.find(query);
    return manager;
  } catch (e) {
    throw Error("Error while fetching managers");
  }
};

// Add Manager repo function
export const addManagerToRepository = async function (payload) {
    try {
        const addedManager = new Manager(payload);
        const savedManager = await addedManager.save();
        return savedManager;
    } catch (e) {
        throw Error("Error while adding manager")
    }
};

// Update Manager repo function
export const updateManagerinRepository = async function (query, payload) {
    try {
      const updatedManager = await Manager.findOneAndUpdate(
          { ...query },
          { ...payload },
          { new: true }
        ).lean();
        return updatedManager;
    } catch (e) {
        throw Error("Error while updating manager")
    }
};