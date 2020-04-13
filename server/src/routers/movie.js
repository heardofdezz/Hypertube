const express = require('express');
const router = new express.Router();
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

router.get('/categories', async(req, res) => {
    try {
        const categoriesArrays = await Movie.find({}, 'genres');
        if (!categoriesArrays) {
            res.send('error');
        }
        let categories = [];
        categoriesArrays.forEach((categoriesArray) => {
            categoriesArray.genres.forEach((category) => {
                category = category.toLowerCase();
                if (!categories.includes(category) && category !== 'n/a') {
                    categories.push(category);
                }
            });
        });
        res.send(categories);
    } catch(e){
        res.send('error');
    }
});

router.get('/get-movies-by-category/:category', async(req, res) => {
    try {
        const pattern = '^' + req.params.category + '$';

        const limit = req.query ? req.query.limit : undefined;
        const skip = req.query ? req.query.page : undefined;
        const movies = await Movie.find({genres: {$all: [new RegExp(pattern, 'i')]}}).limit(Number(limit)).skip(Number(skip));
        let results = movies.map((movie) => movie.toObject());
        results.forEach((result) => {
            delete result.torrent;
            delete result.magnet
        });
        res.send(results);
    } catch(e){
        res.send('error');
    }
});

router.get('/movie-infos/:id', async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.send('Movie not found');
        } else {
            const result = movie.toObject();
            delete result.torrent;
            delete result.magnet
            res.send(result);
        }
    } catch(e) {
        res.send('error');
    }
});

router.get("/view-movie/:magnet", async(req, res) => {
    const magnet = "magnet:?" + req.params.magnet;

    const movie = Movie.findOne({magnet});
    if (movie && movie.isDownloaded) {
        movie.views++;
        await movie.save();
        showMovie(req, res, true, fs.statSync(movie.filePath)['size'], mime.getType(movie.filePath), movie.filePath);
    } else {
        const title = req.query ? req.query.title : undefined;
        if (!title) {
            return res.send({error: 'Please provide the title'});
        }
        const engine = torrentStream(magnet, {path: path.join(__dirname, 'movies')});
        let movie;

        engine.on('ready', () => {
            engine.files.forEach(async (file) => {
                if (
                    path.extname(file.name) !== '.mp4' &&
                    path.extname(file.name) !== '.avi' &&
                    path.extname(file.name) !== '.mkv'
                ) {
                    file.deselect();
                    return;
                }
                file.select();
                movie = new Movie({
                    title,
                    filePath: file.path,
                    magnet
                });
                await movie.save();
                showMovie(req, res, false, file.length, mime.getType(file.name), file);
            });
        });

        engine.on('download', (data) => {
            console.log('Downloading: ', data);
        });

        engine.on('idle', () => {
            movie.isDownloaded = true;
            movie.save();
            console.log("Finished");
        });
    }
});



module.exports = router;
