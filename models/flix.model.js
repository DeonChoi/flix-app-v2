const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flixSchema = new Schema({
    flixID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    voteAverage: {
        type: String,
        required: true
    },
    voteCount: {
        type: String,
        required: true
    },
    runtime: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    homepage: {
        type: String,
        required: false
    },
    posterPath: {
        type: String,
        required: true
    },
    backdropPath: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Flix = mongoose.model('Flix', flixSchema);
module.exports = Flix;