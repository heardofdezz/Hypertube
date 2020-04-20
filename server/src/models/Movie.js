const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    provider: {
        type: String,
        enum: ['yts', 'eztv']
    },
    imdb_code: {
        type: String,
        trim: true
    },
    director: {
        type: String,
        trim: true
    },
    writer: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    cover: {
        type: String,
        trim: true
    },
    year: {
        type: Number
    },
    rating: {
        type: Number
    },
    runtime: {
        type: String,
        trim: true
    },
    genres: [
        {
            type: String,
            trim: true
        }
    ],
    summary: {
        type: String,
        trim: true
    },
    actors: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    torrent: [],
    magnet: [
        {
            magnet: {
                type: String
            },
            seeds: {
                type: Number
            }
        }
    ],
    filePath: {
        type: String,
        trim: true
    },
    seeds: {
        type: Number
    },
    subtitleFr: {
        type: String
    },
    subtitleEn: {
        type: String
    },
    isDownloaded: {
        type: Boolean,
        default: false
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
