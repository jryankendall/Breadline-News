//This file contains my routes created that will serve the handlebars pages
require("dotenv").config();
const axios = require("axios");
const path = require("path");
const newsScrape = require("./scraperRoute");

const PORT = process.env.PORT || 3000;

module.exports = function(app) {
    app.get("/", (req, res) => {
        console.log(req);
        res.render("index", {
            
        }
        )
    })

    app.post("/developer/test/insert", (req, res) => {
        console.log(req);
        
        
        axios("/api/add/", {
            baseURL: "http://localhost:" + PORT,
            method: "POST", 
            data: req.body});

        res.send("Object added to database.");
    })

    app.get("/developer/test/scrape/:subject", (req, res) => {
        newsScrape.pullOnion(req.params.subject);
        res.send("Scrape Successful");
    })
}