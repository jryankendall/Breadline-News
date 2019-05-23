const orm = {
    selectAll: function(mongoObj, cb) {

    },

    addOne: function(mongoObj, cb) {
        mongoObj.save(function(err, response) {
            if (err) console.log(err);
            cb(response);
        })
    },

    addComment: function(value, model, condition, cb) {
        model.updateOne({ title: condition }, { $push: { comments: value }}, function(err, response) {
            if (err) console.log(err);
            cb(response);
        });
    }
}

module.exports = orm;