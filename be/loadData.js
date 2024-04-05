import fs from "fs";
import mongoose from "mongoose";
import Customer from "./models/customer.model.js";
import Manager from "./models/manager.model.js";
import Menu from "./models/menu.model.js";
import Order from "./models/order.model.js";
import Restaurant from "./models/restaurant.model.js";

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Function to insert courses
const insertCustomers = async () => {
  try {
    const data = await fs.promises.readFile('customers.json', 'utf8');
    const jsonData = JSON.parse(data);
    const docs = await Customer.insertMany(jsonData);
    console.log('Successfully inserted customers:', docs.length);
  } catch (err) {
    console.error('Error inserting customers:', err);
  }
};

// Function to insert students
const insertManagers = async () => {
  try {
    const data = await fs.promises.readFile('managers.json', 'utf8');
    const jsonData = JSON.parse(data);
    const docs = await Manager.insertMany(jsonData);
    console.log('Successfully inserted Managers:', docs.length);
  } catch (err) {
    console.error('Error inserting Managers:', err);
  }
};

const insertMenus = async () => {
    try {
      const data = await fs.promises.readFile('menus.json', 'utf8');
      const jsonData = JSON.parse(data);
      const docs = await Menu.insertMany(jsonData);
      console.log('Successfully inserted Menus:', docs.length);
    } catch (err) {
      console.error('Error inserting Menus:', err);
    }
};

const insertRestaurants = async () => {
    try {
      const data = await fs.promises.readFile('restaurants.json', 'utf8');
      const jsonData = JSON.parse(data);
      const docs = await Restaurant.insertMany(jsonData);
      console.log('Successfully inserted Restaurants:', docs.length);
    } catch (err) {
      console.error('Error inserting Restaurants:', err);
    }
};


const insertOrders = async () => {
    try {
      const data = await fs.promises.readFile('orders.json', 'utf8');
      const jsonData = JSON.parse(data);
      const docs = await Order.insertMany(jsonData);
      console.log('Successfully inserted Orders:', docs.length);
    } catch (err) {
      console.error('Error inserting Orders:', err);
    }
};
  

// Insert courses and students
const insertData = async () => {
  await insertCustomers();
  await insertManagers();
  await insertMenus();
  await insertRestaurants();
  await insertOrders();
};

insertData(); // Invoke the function to start inserting data
