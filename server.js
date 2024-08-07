const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());

const bidRoutes = require("./routes/bidRoutes");
const bidderRoutes = require("./routes/bidderRoutes");

app.use("/api/bids", bidRoutes);
app.use("/api/bidders", bidderRoutes);

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
