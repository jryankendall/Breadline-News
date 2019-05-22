const cheerio = require("cheerio");
const axios = require("axios");

module.exports = {
    pullNews: function() {
        axios.get("https://politics.theonion.com/").then(function(response) {
            var $ = cheerio.load(response.data);
            var results = [];

            $("article.js_post_item").each(function(index, element) {
                var articleDiv = $(element).children().next().next().children().next();
                var articleTitle = articleDiv.children().children("h1").text();
                var articleLink = articleDiv.children("a").attr("href");

                results.push({
                    title: articleTitle,
                    link: articleLink
                });
            })

            console.log(results);            
        })
        
    }
}