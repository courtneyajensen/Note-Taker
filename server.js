const express = require("express");
const fs = require("fs");

//Gets Express App up and running
var app = express();
var PORT = process.env.PORT || 3000

//Parsing data for Express app to handle
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("./assets"));

require("./routing/html-routes")(app);
require("./routing/api-routes")(app);

//Allows server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});