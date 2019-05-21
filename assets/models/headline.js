const orm = require("../config/orm");
const mongoose = require("mongoose");

var headlineSchema = new mongoose.Schema( {
    title: String,
    date: Date,
    url: String,
    subtitle: String,
    articleBody: String
});

var Headline = mongoose.model("Headline", headlineSchema, "articles");

var testArticle = new Headline({
    title: "ACK",
    date: 69,
    url: "http:whatever",
    subtitle: "This is a test article",
    articleBody: "Lorem ipsum yadda yadda yadda"
});


var headlineControl = {
    all: function(cb) {
        orm.selectAll(Headline, function(result) {
            cb(result);
        })
    },
    insert: function(headlineObj, cb) {
        var insertedArticle = new Headline({
            title: headlineObj.title,
            date: headlineObj.date,
            url: headlineObj.url,
            subtitle: headlineObj.subtitle,
            articleBody: headlineObj.articleBody
        });
        orm.addOne(insertedArticle, function(result) {
            cb(result);
        })
    }
}

module.exports = headlineControl;