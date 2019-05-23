const cheerio = require("cheerio");
const axios = require("axios");

module.exports = {
    pullOnion: function(subject) {
        axios.get("https://" + subject + ".theonion.com/").then(function(response) {
            var $ = cheerio.load(response.data);
            var results = [];

            $("article.js_post_item").each(function(index, element) {
                var articleDiv = $(element).children().next().next().children().next();
                var articleTitle = articleDiv.children().children("h1").text();
                var articleLink = articleDiv.children("a").attr("href");
                var articleDate = articleDiv.next().children().children("time").attr("datetime");

                if (articleTitle) {
                    results.push({
                        title: articleTitle,
                        link: articleLink,
                        date: articleDate,
                        subtitle: "",
                        source: "The Onion",
                        articleBody: ""
                    });
                }
            })

            console.log(results);            
        })
        
    }
}