//This file contains my routes created that will serve the handlebars pages

module.exports = function(app) {
    app.get("/", (req, res) => {
        console.log(req);
        res.render("index", {
            msg: "Hail!"
        }
        )
    })
}