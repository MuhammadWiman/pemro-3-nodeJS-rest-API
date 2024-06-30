const express = require("express");
const router = require("./routes/routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/belajar_mongodb2");
const database = mongoose.connection;

database.on("error", (error) => {
  console.log("Failed to connect to MongoDB: ", error);
});

database.once("connected", () => {
  console.log("Connected to MongoDB");
});

const corsOptions = {
  origin: 'http://localhost:8080', // Ganti dengan asal yang Anda inginkan
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Rute dan middleware lainnya
app.get('/jsapi.php', (req, res) => {
  res.json({ message: 'Hello from server' });
});// Use this after the variable declaration
app.use("/", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
