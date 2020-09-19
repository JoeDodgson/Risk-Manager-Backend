// Require in local npm modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Require in local files
const db = require("./db/index");
const router = require("./routes/index");

// Configure dotenv
dotenv.config();

// Define port
const PORT = process.env.PORT || 8080;

// Define express server and middleware
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "https://riskmanager-jmni.web.app" }));

// app.options("*", cors());

// app.use((req, res, next) => {
//   res.header({
//     "Access-Control-Allow-Origin": "https://riskmanager-jmni.web.app/",
//   });
//   //   res.header(
//   //     "Access-Control-Allow-Headers",
//   //     "Origin, X-Requested-With, Content-Type, Accept"
//   //   );
//   next();
// });

// Specify API routes
app.use("/api", router);

// Connect to MongoDB using mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/engineerdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("successfully connected to database");
  }
);
mongoose.set("useCreateIndex", true);

// Start the express server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
