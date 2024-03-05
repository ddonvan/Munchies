import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import customers from "./routes/customer.route.js";
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

app.listen(port, function () {
  console.log(`🚀 Fire app listening on port ${port}!`);
});