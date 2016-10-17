var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Book = require('./Book.model');

var db = 'mongodb://localhost:27017/example';
var port = 8080;

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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

app.get('/books/:id', function(req, res) {
    console.log('Retrieving the specified book');
    Book.findOne({
        _id: req.params.id
    })
        .exec(function(err, book) {
            if (err) {
                res.send('Error has occurred: ' + err);
            } else {
                console.log('Successfully retrieved the specified book')
                res.json(book);
            }
        });
});

app.post('/book', function(req, res) {
    var newBook = new Book();

    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    newBook.save(function(err, book) {
        if (err) {
            res.send('Error saving book: ' + err);
        } else {
            console.log('Successfully saved book: ' + book);
            res.send(book);
        }
    });
});

app.post('/book2', function(req, res) {
    Book.create(req.body, function(err, book) {
        if (err) {
            res.send('Error creating book: ' + err);
        } else {
            console.log('Successfully created book: ' + book);
            res.send(book);
        }
    });
});

app.listen(port, function() {
    console.log('App listening on port: ' + port);
});