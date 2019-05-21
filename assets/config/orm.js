const orm = {
    selectAll: function(mongoObj, cb) {

    },

    addOne: function(mongoObj, cb) {
        mongoObj.save(function(err, obj) {
            if (err) console.log(err);
            return cb(obj);          
        })
    }
}

module.exports = orm;