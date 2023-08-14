import dotenv from "dotenv"; 
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import ProductRouter from "./Routes/product.js";
import CategoryRouter from "./Routes/category.js";
import OrderRouter from "./Routes/order.js";
import UserRouter from "./Routes/user.js";
import CartRouter from "./Routes/cart.js";
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
app.set('views', './views');

app.use("/products", ProductRouter);
app.use("/categories", CategoryRouter);
app.use("/orders", OrderRouter);
app.use("/users", UserRouter);
app.use("/carts", CartRouter);

app.get("/", async (req, res) => {
  const products = await ProductController.getAllProducts(req,res);
  res.render('./Navbar/navbar', { products });
});

app.get("/search-products", async (req, res) => {
  try {
    const products = await ProductController.getAllProducts(req, res);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/login", (req, res) => {
  res.render('./Login-Register/login');
});

app.get("/register", (req, res) => {
  res.render('./Login-Register/register');
});

app.listen(process.env.PORT, () => {
  console.log(`server runs on port ${process.env.PORT}`);
});