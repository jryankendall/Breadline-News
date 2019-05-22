const orm = {
    selectAll: function(mongoObj, cb) {

    },

    addOne: function(mongoObj, cb) {
        mongoObj.save(function(err, response) {
            if (err) console.log(err);
            cb(response);
        })
    }
}

module.exports = orm;