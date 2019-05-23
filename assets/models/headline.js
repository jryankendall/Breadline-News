const orm = require("../config/orm");
const mongoose = require("mongoose");

var headlineSchema = new mongoose.Schema( {
    title: String,
    date: Date,
    added: Date,
    url: String,
    subtitle: String,
    articleBody: String,
    comments: Array
});

var Headline = mongoose.model("Headline", headlineSchema, "articles");

var testArticle = new Headline({
    title: "ACK",
    date: 69,
    added: 1000000,
    url: "http:whatever",
    subtitle: "This is a test article",
    articleBody: "Lorem ipsum yadda yadda yadda",
    source: "FFffff",
    comments: []
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
            added: headlineObj.added,
            url: headlineObj.url,
            subtitle: headlineObj.subtitle,
            articleBody: headlineObj.articleBody,
            source: headlineObj.source,
            comments: []
        });
        orm.addOne(insertedArticle, result => {cb(result);})
    },
    comment: function(commentObj, cb) {
        //Parse code here
        var newComment = {
            username: commentObj.username,
            date: commentObj.date,
            textbody: commentObj.textbody
        };
        var articleName = commentObj.article;

        //At end:
        orm.addComment(newComment, Headline, articleName, result => {cb(result)});
    }
}

module.exports = headlineControl;