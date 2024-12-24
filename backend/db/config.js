const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to mongoDB
mongoose.connect(MONGODB_URI);

// setting events to handle mongodb connection
const db = mongoose.connection;
// if something wrong while stting connection
db.on("error", console.error.bind(console, "Mongodb connection error:"));
// if connection is done properly
db.once("open", () => console.log("Mongodb Connected Successfully"));
