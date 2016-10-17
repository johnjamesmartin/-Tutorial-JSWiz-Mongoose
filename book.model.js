var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    keywords: Array,
    published: Boolean,
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    detail: {
        modelNumber: Number,
        hardcover: Boolean,
        reviews: Number,
        rank: Number
    }
});

module.exports = mongoose.model('Book', BookSchema);