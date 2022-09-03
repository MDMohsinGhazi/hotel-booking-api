const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const connectDB = require("./services/db");
const errorHandler = require("./middlewares/errorHandler");
const ErrorResponse = require("./utils/ErrorResponse");

// Load env vars
dotenv.config({ path: "./.env" });

// Connect to DB
connectDB();

const app = express();

// Set security header
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    CrossOriginResourcePolicy: "cross-origin",
  })
);

// cors

app.use(
  cors({
    origin: "*",
  })
);

// body parser
app.use(express.json());
// cookie parser
app.use(cookieParser());

app.use(cors());
// Route File
const authRoute = require("./routes/auth");
const UsersRoute = require("./routes/users");
const roomsRoute = require("./routes/rooms");
const hotelsRoute = require("./routes/hotels");
const bookingRoute = require("./routes/booking");

// mount routes
app.use("/booking-api/auth", authRoute);
app.use("/booking-api/users", UsersRoute);
app.use("/booking-api/rooms", roomsRoute);
app.use("/booking-api/hotels", hotelsRoute);
app.use("/booking-api/bookings", bookingRoute);
app.use("*", (req, res, next) => {
  next(new ErrorResponse(`${req.baseUrl} route not found`, 404));
});
app.use(errorHandler);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// handele unhandeled promise rejection
process.on("unhandledRejection", (err, Promise) => {
  console.log("Error", err.message);
  server.close(() => process.exit(1));
});
