import express from "express";
import bodyParser from "body-parser";
import ProductRouter from "./Routes/product.js"
import mongoose from "mongoose";

const app = express();
const port = 3000;

// Step 1: Refactoring the MongoDB connection code into a function
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB!");
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


