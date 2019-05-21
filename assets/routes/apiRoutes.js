var headlines = require("../models/headline");

const Headline = function(title, date, url, subtitle, articleBody){
    this.title = title;
    this.date = date;
    this.url = url;
    this.subtitle = subtitle;
    this.articleBody = articleBody;
};

module.exports = function(app) {

    app.post("/api/add/", function(req, res) {
        var data = req.body;
        console.log(data);
        var newArticle = new Headline(data.title, data.date, data.url, data.subtitle, data.articleBody);
        headlines.insert(newArticle, function(response) {
            return console.log(response);
        });
    })
}