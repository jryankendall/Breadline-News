const orm = {
    selectAll: function(mongoObj, cb) {
        mongoObj.find({}, function(err, results) {
            if (err) console.log(err);
            
            cb(results);
        });
    },

    addOne: function(mongoObj, cb) {
        mongoObj.save(function(err, response) {
            if (err) console.log(err);
            cb(response);
        })
    },

    addComment: function(value, model, condition, cb) {
        console.log("Value: " + value + " Model: " + model + " condition: "+ condition);
        model.updateOne({ aId: condition }, { $push: { comments: value }}, function(err, response) {
            if (err) console.log(err);
            cb(response);
        });
    },

    selectSome: function(mongoObj, conditions, cb) {
        mongoObj.find(conditions, function(err, results) {
/*             if (err) console.log(err); */
            cb(results);
        })
    }
}

module.exports = orm;