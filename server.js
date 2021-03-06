require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const exphbs = require("express-handlebars");
var app = express();
const fs = require("fs");
const path = require("path");

var PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./assets/public"));

// Handlebars
app.set("views", path.join(__dirname, "/assets/views"));
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main",
        partialsDir: __dirname + "/assets/views/partials"
    })
);
app.set("view engine", "handlebars");

//Routes
require("./assets/routes/apiRoutes")(app);
require("./assets/routes/htmlRoutes")(app);


//starting the server
app.listen(PORT, function() {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});