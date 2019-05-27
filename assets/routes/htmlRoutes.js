//This file contains my routes created that will serve the handlebars pages
require("dotenv").config();
const axios = require("axios");
const path = require("path");
const newsScrape = require("./scraperRoute");

const PORT = process.env.PORT || 3000;
const sourceArray = [{
    title: "Onion",
    category: ["politics", "sports", "local", "entertainment"],
    value: "onion"
}, {
    title: "NY Times",
    category: ["politics"],
    value: "nytimes"
}, {
    title: "Nashville Public",
    category: ["local"],
    value: "nashvillepublic"
}];

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

    app.post("/developer/test/comment/", (req, res) => {
        console.log(req);

        axios("/api/comment/", {
            baseURL: "http://localhost:" + PORT,
            method: "POST",
            data: req.body
        });

        res.send("Comment added.");
    })

    app.get("/api/sources/", (req, res) => {
        res.send(sourceArray);
    })
}