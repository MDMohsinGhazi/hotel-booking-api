const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log({ mongoError: error });
  }

  mongoose.connection.on("disconnection", () => {
    console.log("mongo db is disconnected");
  });
  mongoose.connection.on("connection", () => {
    console.log("mongo db is connected");
  });
};

module.exports = connectDB;
