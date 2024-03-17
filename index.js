const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const bodyParser = require("body-parser");

const productsRouter = require("./routers/productsRouter");
const userRouter = require("./routers/userRouter");

(() => {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
    })
  );

  db(process.env.MONGO_URL);

  app.use("/product", productsRouter);
  app.use("/user", userRouter);
})();

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running in ${process.env.PORT || 3001}`);
});
