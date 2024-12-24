const express = require("express");
const cors = require("cors");
const app = express();
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: "https://ecommerce-dashboard-wine-nu.vercel.app/", // Vercel frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // if cookies allowed
}));

// Manually setting headers for each route (if needed)
app.use((req, resp, next) => {
  resp.setHeader("Access-Control-Allow-Origin", "https://ecommerce-dashboard-wine-nu.vercel.app"); // Vercel frontend origin
  resp.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allowed methods
  resp.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers
  next(); // Move to the next middleware or route
});

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) resp.send(user);
    else resp.send({ result: "User not found" });
  } else resp.send({ result: "Invalid Credentials" });
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let result = await Product.find();
  resp.send(result);
});

app.delete("/product/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) resp.send(result);
  else resp.send({ result: "Result not found" });
});

app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

// Setting Port
const PORT = process.env.PORT || 5300;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
