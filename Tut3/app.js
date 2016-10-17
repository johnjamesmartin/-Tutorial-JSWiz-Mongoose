var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Book = require('./Book.model');

var db = 'mongodb://localhost:27017/example';
var port = 8080;

mongoose.connect(db);

app.get('/', function(req, res) {
    res.send('Happy to be here');
});

app.get('/books', function(req, res) {
    console.log('Retrieving books');
    Book.find({})
        .exec(function(err, books) {
            if (err) {
                res.send('Error has occurred: ' + err);
            } else {
                console.log('Successfully retrieved books')
                res.json(books);
            }
        });
});

app.listen(port, function() {
    console.log('App listening on port: ' + port);
});