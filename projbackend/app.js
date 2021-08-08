require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.js");

//DB CONNECTION
mongoose
  .connect("mongodb://localhost:27017/tshirt", {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( () => {
    console.log("DB IS CONNECTED...");
});

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//MY ROUTES
app.use("/api", authRoutes);

//PORT
const port = process.env.PORT || 8000;

//STARTING A SERVER
app.listen(port, () => {
    console.log(`App is running at ${port}`);

});