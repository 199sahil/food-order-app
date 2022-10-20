const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// Mongo URL
const mongoURL = process.env.MONGO_URL;

// Connect to MongoDB

mongoose.connect(mongoURL);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});

// Express Aoo

const app = express();
app.use(express.json());

// Backend Routes

const serverRoutes = require("./server/index");
app.use("/api", serverRoutes);

// Frontend Routes
app.use(express.static(path.join(__dirname, "frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start Server
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
