const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

const app = express();

app.use(cors());
dbConnection();

//default config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("", (req, res) => {
  res.status(500).send("error");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log("Server is listening");
});
