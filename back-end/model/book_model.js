const mongoose = require('mongoose');
const db = require('../config/db');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "active",
        required: true
    }
});

const bookmodel = db.model('books', bookSchema);

module.exports = bookmodel;