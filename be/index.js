import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import restaurants from "./routes/restaurant.route.js";
import orders from "./routes/order.route.js";
import customers from "./routes/customer.route.js";
import menus from "./routes/menu.route.js";
import { connectDB } from "./utils/database.js";

const app = express();
const port = 8000;

app.use(cors());
connectDB();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routes
app.use("/customers", customers);
app.use("/orders", orders);
app.use("/restaurants", restaurants);
app.use("/menus", menus);

app.listen(port, function () {
  console.log(`🚀 Fire app listening on port ${port}!`);
});