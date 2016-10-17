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


/* Root route: */

app.get('/', function(req, res) {
    res.send('Happy to be here');
});


/* Get method: */

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


/* Get by ID method: */

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


/* Post method: */

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


/* Post method 2: */

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


/* Update method: */

app.put('/book/:id', function(req, res) {
    Book.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: {
            title: req.body.title
        }
    }, {
        upsert: true
    }, function(err, newBook) {
        if (err) {
            res.send('Error with book update: ' + err);
        } else {
            console.log('Successfully updated book: ' + newBook);
            res.send(newBook);
        }
    });
});


/* Delete method: */

app.delete('/book/:id', function(req, res) {
    Book.findOneAndRemove({
        _id: req.params.id
    }, function(err, newBook) {
        if (err) {
            res.send('Error with book deletion: ' + err);
        } else {
            console.log('Successfully deleted book: ' + newBook);
            res.status(204);
        }
    });
});



app.listen(port, function() {
    console.log('App listening on port: ' + port);
});