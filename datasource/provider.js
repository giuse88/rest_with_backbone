var MongoClient = require('mongodb').MongoClient;

Provider = function (db_name, host, port, username, password) {
    var that = this;
    MongoClient.connect("localhost:27017/myDatabase"), function (err, db) {
        if (err) {
            throw err;
        }
        that.db = db;
    });
};

Provider.prototype.getCollection = function (collectionName, callback) {
    this.db.collection(collectionName, collectionOptions, callback);
};

exports.Provider = Provider;
