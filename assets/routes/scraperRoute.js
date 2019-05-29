const cheerio = require("cheerio");
const axios = require("axios");
const moment = require("moment");

module.exports = {
    pullOnion: function(subject, cb) {
        axios.get("https://" + subject + ".theonion.com/").then(function(response) {
            var $ = cheerio.load(response.data);
            let results = [];

            $("article.js_post_item").each(function(index, element) {
                var articleDiv = $(element).children().next().next().children().next();
                var articleTitle = articleDiv.children().children("h1").text();
                var articleLink = articleDiv.children("a").attr("href");
                var articleDate = articleDiv.next().children().children("time").attr("datetime");
                var articleId = $(element).attr("data-id");

                if (articleTitle) {
                    results.push({
                        title: articleTitle,
                        url: articleLink,
                        date: articleDate,
                        subtitle: "",
                        source: "onion",
                        articleBody: "",
                        category: subject,
                        aId: articleId
                    });
                }
            })
            cb(results);
        })
        
    },

    pullNPR: function(subject = "frontpage", cb) {
        axios.get("https://www.nashvillepublicradio.org/").then(function(response) {
            var $ = cheerio.load(response.data);
            let results = [];

            $("div.node-promoted").each(function(index, element) {
                var articleDiv = $(element).children("div").children("div");
                var articleHeader = articleDiv.children("h2").children("a");
                var articleLink = articleHeader.attr("href");
                var articleTitle = articleHeader.text();
                var articleDate = articleDiv.children("div").children("span").children("span").attr("content");

                if (articleTitle) {
                    results.push( {
                        title: articleTitle,
                        url: "https://www.nashvillepublicradio.org" + articleLink,
                        date: articleDate,
                        subtitle: "",
                        source: "nashvillepublic",
                        articleBody: "",
                        category: subject,
                        aId: articleTitle
                    });
                }
            })

            cb(results);

            
        })
    }
}