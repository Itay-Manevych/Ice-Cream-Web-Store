import dotenv from "dotenv"; 
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';

import ProductRouter from "./Routes/product.js";
import CategoryRouter from "./Routes/category.js";
import OrderRouter from "./Routes/order.js";
import UserRouter from "./Routes/user.js";
import CartRouter from "./Routes/cart.js";


const env_path = "./Config/.env";

dotenv.config({path: env_path}); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

connectToMongoDB();

app.use(bodyParser.json());
app.use(express.static('Views'));
app.use(express.static(path.join(__dirname, '/Controllers')));
app.use('/Services', express.static(path.join(__dirname, '/Services')));
app.use('/Models', express.static(path.join(__dirname, '/Models')));
app.use('/Navbar', express.static(path.join(__dirname, '/Navbar')));


app.set('view engine', 'ejs');
app.set('views', './views');

app.use("/products", ProductRouter);
app.use("/categories", CategoryRouter);
app.use("/orders", OrderRouter);
app.use("/users", UserRouter);
app.use("/carts", CartRouter);

app.get("/", (req, res) => {
  res.render('./Navbar/navbar');
});

app.get("/login", (req, res) => {
  res.render('./Login-Register/login');
});

app.listen(process.env.PORT, () => {
  console.log(`server runs on port ${process.env.PORT}`);
});