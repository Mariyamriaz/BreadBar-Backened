const express = require("express");
const cors = require("cors");


// const todoRoutes = require("./routes/todo.routes");
const userRoutes = require("./routes/UserRoutes");
const ProductRoutes = require("./routes/ProductRoutes")
const connectDatabase = require("./database/connection");
const handleError = require("./middleware/error");
const router = require("./routes/UserRoutes");

connectDatabase();
const app = express();
app.use(cors());
app.use(express.json());
app.use(ProductRoutes);
app.use(userRoutes);
app.use(router);
app.use(handleError);

module.exports = app; // default export
