//This file contains my routes created that will serve the handlebars pages
require("dotenv").config();
const axios = require("axios");
const path = require("path");
const newsScrape = require("./scraperRoute");

const PORT = process.env.PORT || 3000;
const sourceArray = [{
    title: "Onion",
    category: ["politics", "sports", "local", "entertainment", "ogn"],
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
        res.render("index");
    })

    app.get("/get/articles/:source/:category", (req, res) => {
        axios("/api/articles/" + req.params.source + "/" + req.params.category, {
            baseURL: "http://localhost:" + PORT,
            method: "GET"
        }).then(function(response) {
            res.json(response.data)
        })
    })

    app.post("/developer/test/insert", (req, res) => {
        
        
        axios("/api/add/", {
            baseURL: "http://localhost:" + PORT,
            method: "POST", 
            data: req.body});

        res.send("Object added to database.");
    })

    app.get("/api/scrape/onion/:subject", (req, res) => {
        newsScrape.pullOnion(req.params.subject, function(arr) {
            axios("/api/add", {
                baseURL: "http://localhost:" + PORT,
                method: "POST",
                data: arr
            })
        })
        res.send("Attempted add to database.");
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