var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

BSON = mongo.BSONPure;

function  check(err, res) {
  //
  if ( err ) {
    res.send({'error':'An error has occurred'});
    throw err
  }
  //
}


router.get('/', function(req, res) {
  //
  console.log("Retriving all questions");
  dbClient.collection('questions', function(err, collection) {
        check(err, res);
        collection.find().toArray(function(err, items) {
            check(err, res);
            res.send(items);
        });
    });

});

router.get('/:id', function(req, res) {
     var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    dbClient.collection('questions', function(err, collection) {
        check(err, res);
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            check(err,res); 
            res.send(item);
        });
    });
});

router.delete('/:id', function(req, res) {
     var id = req.params.id;
    console.log('Deleting wine: ' + id);
    dbClient.collection('questions', function(err, collection) {
        check(err, res);
        collection.remove({'_id':new BSON.ObjectID(id)}, function(err, item) {
            check(err,res); 
            res.send(item);
        });
    });
});

router.put('/:id', function(req, res) {
    var id = req.params.id;
    var question  = req.body;
    console.log('Updating questions ' + id);
    dbClient.collection('questions', function(err, collection) {
        check(err, res);
        collection.update({'_id':new BSON.ObjectID(id)}, question,
                           {safe:true}, function(err, result) {
                check(err, res);
                res.send(question);
        });
    });
});

router.post('/', function(req, res) {
    var question  = req.body;
    console.log('Adding question : ' + JSON.stringify(question));
    dbClient.collection('questions', function(err, collection) {
        check(err, res);
        collection.insert(question, {safe:true}, function(err, result) {
                check(err, res);
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
        });
    });
});

module.exports = router;
