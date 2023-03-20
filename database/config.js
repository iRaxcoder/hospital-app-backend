const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_CNN, { useNewUrlParser: true });

    console.log("Database connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error at initializing database");
  }
};

module.exports = {
  dbConnection,
};
