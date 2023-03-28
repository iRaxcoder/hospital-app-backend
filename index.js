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
app.use("/api/hospitals", require("./routes/hospitals"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todo", require("./routes/searches"));

const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log("Server is listening");
});
