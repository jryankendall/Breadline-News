var headlines = require("../models/headline");
var moment = require("moment");

const Headline = function(title, date, url, subtitle, articleBody, source, category, aId){
    this.title = title;
    this.date = date;
    this.added = moment().format("X");
    this.url = url;
    this.subtitle = subtitle;
    this.articleBody = articleBody;
    this.source = source;
    this.category = category;
    this.aId = aId;
};

const UserComment = function(username = "Anonymous", date, article, textbody) {
    this.username = username;
    this.date = date;
    this.article = article;
    this.textbody = textbody;
}

//Returns index of an array object with key id == val, or returns -1
function findObject(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].aId == val) {
            return i;
        }
    }
    
    return -1;
}

module.exports = function(app) {

    app.post("/api/add/", function(req, res) {
        var data = req.body;
        var dbArticles = [];
        headlines.some(data[0].source, data[0].category, function(results) {
            if (results) {
                for (let i = 0; i < results.length; i++) {
                    dbArticles.push(results[i]);
                }
            }

            
            for (let j = 0; j < data.length; j++) {

                //Checks to see if article trying to be added exists in database already
                if (findObject(dbArticles, data[j].aId) == -1) {
                    var newArticle = new Headline(data[j].title, data[j].date, data[j].url, data[j].subtitle, data[j].articleBody, data[j].source, data[j].category, data[j].aId);
                    headlines.insert(newArticle, function(response) {
                        console.log(response);                        
                    });
                }
            }
            
            res.send("Hopefully nothing went wrong.");
        })

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

    app.get("/api/articles/:source/:category", function(req, res) {
        var articleSource = req.params.source;
        var articleCategory = req.params.category;
        headlines.some(articleSource, articleCategory, function(response) {
            res.send(response);
        })
    })
}