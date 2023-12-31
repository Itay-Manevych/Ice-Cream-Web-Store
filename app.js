import dotenv from "dotenv"; 
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
import http from "http";
import { Server } from "socket.io";

import ProductRouter from "./Routes/product.js";
import CategoryRouter from "./Routes/category.js";
import OrderRouter from "./Routes/order.js";
import UserRouter from "./Routes/user.js";
import LoginRouter from "./Routes/login.js";
import RegisterRouter from "./Routes/register.js";
import DashboardRouter from "./Routes/dashboard.js";
import CheckoutRouter from "./Routes/checkout.js";
import NoAccessRouter from "./Routes/noAccess.js";

import { ProductController } from "./Controllers/product.js";
import { UserController } from "./Controllers/user.js";
import { CategoryController } from "./Controllers/category.js";

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
app.use(cookieParser());
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
app.use("/login", LoginRouter);
app.use("/register", RegisterRouter);
app.use("/dashboard", DashboardRouter);
app.use("/checkout", CheckoutRouter);
app.use("/no-access", NoAccessRouter);

app.get("/", async (req, res) => {
  const categories = await CategoryController.getAllCategories(req,res);
  const products = await ProductController.getTopProducts(req,res);
  res.render('Partials/Main-Page/mainPage.ejs', {products: products, categories: categories, pageTitle: 'Trending 🔥'});
});

app.get("/about_us", async (req, res) => {
  res.render('./Partials/About-Us/aboutUs', { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY });
});

app.get("/search-products", async (req, res) => {
  try {
    const products = await ProductController.getAllProducts(req, res);
    res.json(products);
  }
  catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/statistics", (req, res) => {
//   res.render("./Dashboard/Admin/Admin-Statistics-Display/adminStatistics.ejs");
// })

app.listen(process.env.PORT, () => {
  console.log(`server runs on port ${process.env.PORT}`);
});

app.get("/get-reviews", async (req, res) => {
  try {
    const pageId = process.env.FACEBOOK_PAGE_ID;
    const accessToken = process.env.FACEBOOK_API_KEY;
    const apiRequestUrl = `https://graph.facebook.com/v17.0/${pageId}/ratings?access_token=${accessToken}`;
    const response = await fetch(apiRequestUrl);
    
    const retrieved_reviews = await response.json();

    res.json(retrieved_reviews.data);

  } 
  catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/reviews", async (req, res) => {
  res.render("./Partials/Reviews/reviews.ejs");
});


const adminApp = express();
const adminServer = http.createServer(adminApp);
const adminIo = new Server(adminServer);

adminApp.use(cookieParser());
adminApp.use(bodyParser.json());
adminApp.use(express.static('Views'));
adminApp.set('view engine', 'ejs');
adminApp.set('views', path.join(__dirname, 'Views'))
adminApp.use("/products", ProductRouter);
adminApp.use("/categories", CategoryRouter);
adminApp.use("/orders", OrderRouter);
adminApp.use("/users", UserRouter);
adminApp.use("/login", LoginRouter);
adminApp.use("/register", RegisterRouter);
adminApp.use("/dashboard", DashboardRouter);
adminApp.use("/checkout", CheckoutRouter);
adminApp.use("/no-access", NoAccessRouter);

adminIo.on("connection", (socket) => {
  socket.on("join_chat", (username) => {
    socket.username = username;
    socket.broadcast.emit("user_joined", `${username} joined!`, false);
    socket.emit("user_joined", "You joined!", true);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      socket.broadcast.emit("user_left", `${socket.username} left the chat.`);
    }
  });

  socket.on("send_message", (data) => {
    adminIo.emit("send_message", data);
  });
});

adminServer.listen(process.env.ADMIN_PORT, () => {
  console.log(`Admin chat server is running on port ${process.env.ADMIN_PORT}`);
});

app.get("/get-admin-chat-url", (req, res) => {
  const adminChatUrl = `http://localhost:${process.env.ADMIN_PORT}/admin-chat`;  
  res.json({ adminChatUrl });
});

adminApp.get("/get-home-url", (req, res) => {
  const homeUrl = `http://localhost:${process.env.PORT}`;  
  res.json({ homeUrl });
});

adminApp.get("/admin-chat", async (req, res) => {
    const user =  await UserController.getUserByToken(req,res);
    if(user) {
      res.render("./Partials/Admin-Chat/adminChat.ejs", {user: user});
    }
    else {
      res.render("./Partials/No-Access/noAccess.ejs");
    }
});