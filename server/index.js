const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  mongoose.connect(process.env.MONGO_URL);
  console.log("Server is running on PORT: 3000");
});
