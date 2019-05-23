var headlines = require("../models/headline");
var moment = require("moment");

const Headline = function(title, date, url, subtitle, articleBody, source){
    this.title = title;
    this.date = date;
    this.added = moment().format("X");
    this.url = url;
    this.subtitle = subtitle;
    this.articleBody = articleBody;
    this.source = source;
};

const UserComment = function(username = "Anonymous", date, article, textbody) {
    this.username = username;
    this.date = date;
    this.article = article;
    this.textbody = textbody;
}

module.exports = function(app) {

    app.post("/api/add/", function(req, res) {
        var data = req.body;
        console.log(data);
        var newArticle = new Headline(data.title, data.date, data.url, data.subtitle, data.articleBody, data.source);
        headlines.insert(newArticle, function(response) {
            console.log(response);
            res.status(200);
        });
    })

    app.post("/api/comment/", function(req, res) {
        var data = req.body;
        console.log(data);
        var newComment = new UserComment(data.username, data.date, data.article, data.textbody);
        headlines.comment(newComment, function(response) {
            console.log(response);
            res.status(200);
        })
    })

    app.get("/api/articles/all", function(req, res) {
        headlines.all(function(response) {
            res.send(response);
        })
    })
}