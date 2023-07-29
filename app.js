import dotenv from "dotenv"; 
import express from "express";
import bodyParser from "body-parser";
import ProductRouter from "./Routes/product.js"
import mongoose from "mongoose";

const env_path = "./Config/.env";
dotenv.config({path: env_path}); 

const app = express();
const port = 3000;

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

app.use("/products", ProductRouter);

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});


