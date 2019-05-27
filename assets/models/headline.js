const orm = require("../config/orm");
const mongoose = require("mongoose");

var headlineSchema = new mongoose.Schema( {
    title: String,
    date: Date,
    added: Date,
    url: String,
    subtitle: String,
    articleBody: String,
    source: String,
    category: String,
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
    category: "Nothin",
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
            category: headlineObj.category,
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
    },
    some: function(source, category, cb) {
        var conditions = {
            source: { source },
            category: { category }
        };

        orm.selectSome(Headline, conditions, result => {cb(result)});
    }
}

module.exports = headlineControl;