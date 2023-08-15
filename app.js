import dotenv from "dotenv"; 
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';

import ProductRouter from "./Routes/product.js";
import CategoryRouter from "./Routes/category.js";
import OrderRouter from "./Routes/order.js";
import UserRouter from "./Routes/user.js";
import CartRouter from "./Routes/cart.js";
import LoginRouter from "./Routes/login.js";
import RegisterRouter from "./Routes/register.js";

import { ProductController } from "./Controllers/product.js";

const env_path = "./Config/.env";

dotenv.config({path: env_path}); 

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
app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'Views'))

app.use("/products", ProductRouter);
app.use("/categories", CategoryRouter);
app.use("/orders", OrderRouter);
app.use("/users", UserRouter);
app.use("/carts", CartRouter);
app.use("/login", LoginRouter);
app.use("/register", RegisterRouter);

app.get("/", async (req, res) => {
  const products = await ProductController.getAllProducts(req,res);
  res.render('./Carousel/carousel');
  res.render('./Navbar/navbar', { products });
});

app.get("/", (req, res) => {
  res.render('./Partials/Navbar/navbar');
});

app.get("/search-products", async (req, res) => {
  try {
    const products = await ProductController.getAllProducts(req, res);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
app.get("/search-products", async (req, res) => {
  try {
    const products = await ProductController.getAllProducts(req, res);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server runs on port ${process.env.PORT}`);
});