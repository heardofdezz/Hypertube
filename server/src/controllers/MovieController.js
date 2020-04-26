const request = require('request');
const DomParser = require('dom-parser');
const parser = new DomParser();
const torrentStream = require('torrent-stream');
const mime = require('mime');
const pump = require('pump');
const path = require('path');
const { showMovie } = require('../functions/movie');
const fs = require('fs');
const srt2vtt = require('srt-to-vtt');
const download = require('download');
const OS = require('opensubtitles-api');
const OpenSubtitles = new OS({
    useragent: 'TemporaryUserAgent',
    username: 'laubert42',
    password: 'hypertube42',
    ssl: true
});

const Movie = require('../models/Movie');


module.exports = {
    async MoviesIndex(req, res, next) {
       try {
        const query = req.query ? req.query.query : undefined;
        const limit = req.query ? req.query.limit : undefined;
        const skip = req.query ? req.query.page : undefined;
        const provider = req.query ? req.query.provider : undefined;
        const category = req.query && req.query.category && req.query.category.length > 0 ? '^' + req.query.category + '$' : undefined;
        let sort = {};
        if (req.query && req.query.sort) {
            if (req.query.sort.match(/^year$/i)) {
                sort = {year: -1};
            } else if (req.query.sort.match(/^rating$/i)) {
                sort = {rating: -1};
            }
        }

        let filters = query && query.length > 0 ? {title: { $regex: query, $options: 'i'}} : {};
        filters = provider && (provider === 'yts' || provider === 'eztv') ? {...filters, provider} : filters;
        filters = category ? {...filters, genres: {$all: [new RegExp(category, 'i')]}} : filters;
        const movies = await Movie.find(filters, [], {
            skip: Number(skip) - 1,
            limit: Number(limit),
            sort
        });

        let results = movies.map((movie) => movie.toObject());

        results.forEach((result) => {
            delete result.torrent;
            delete result.magnet;
        });
        res.send(results);
       } catch (error) {
        res.send('error');
       }
    },
}