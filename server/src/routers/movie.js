const express = require('express');
const router = new express.Router();
const torrentStream = require('torrent-stream');
const mime = require('mime');
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

router.get('/search', async(req, res) => {
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
    } catch(e) {
        res.send('error');
    }
})

router.get("/view-movie/:id", async(req, res) => {
    const id = req.params.id;

    const movie = await Movie.findById(id);
    if (!movie) {
        return res.send('Movie not found');
    }
    if (movie.isDownloaded) {
        showMovie(req, res, true, fs.statSync(movie.filePath)['size'], mime.getType(movie.filePath), movie.filePath);
    } else {
        let magnet;
        if (movie.provider === 'yts') {
            if (movie.torrent.length === 0) {
                return res.send('No torrent link');
            } else {
                magnet = 'magnet:?xt=urn:btih:' + movie.torrent[0].hash;
                let seeds = movie.torrent[0].seeds;
                movie.torrent.forEach((torrent) => {
                    if (torrent.seeds > seeds) {
                        seeds = torrent.seeds;
                        magnet = 'magnet:?xt=urn:btih:' + torrent.hash;
                    }
                });
            }
        } else if (movie.provider === 'eztv') {
            if (movie.magnet.length === 0) {
                return res.send('No torrent link');
            } else {
                magnet = movie.magnet[0].magnet;
                let seeds = movie.magnet[0].seeds;
                movie.magnet.forEach((element) => {
                    if (element.seeds > seeds) {
                        magnet = element.magnet;
                        seeds = element.seeds
                    }
                });
            }
        }
        const engine = torrentStream(magnet, {path: path.join(__dirname, 'movies')});

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
                movie.filePath = file.path;
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

router.get('/subtitles/:id', async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        OpenSubtitles.search({
            sublanguageid: [ 'fre', 'eng' ].join(),
            extensions: 'srt',
            limit: 'all',
            imdbid: movie.imdb_code
        })
            .then((subtitles) => {
                let subtitlesPath = path.join(__dirname, 'subtitles');
                let result = {
                    'en': undefined,
                    'fr': undefined
                };

                if (subtitles.en && subtitles.en[0]) {
                    download(subtitles.en[0].url, subtitlesPath)
                        .then(() => {
                            fs.stat(subtitlesPath + '/' + subtitles.en[0].filename, (err) => {
                                if (err === null) {
                                    result.en = '/' + path.basename(subtitles.en[0].filename, '.srt') + '.vtt';
                                    fs.createReadStream(subtitlesPath + '/' + subtitles.en[0].filename).pipe(srt2vtt()).pipe(fs.createWriteStream(subtitlesPath + result.en));
                                }

                                if (subtitles.fr && subtitles.fr[0].url) {
                                    download(subtitles.fr[0].url, subtitlesPath)
                                        .then(() => {
                                            fs.stat(subtitlesPath + '/' + subtitles.fr[0].filename, (err) => {
                                                if (err === null) {
                                                    result.fr = '/' + path.basename(subtitles.fr[0].filename, '.srt') + '.vtt';
                                                    fs.createReadStream(subtitlesPath + '/' + subtitles.fr[0].filename).pipe(srt2vtt()).pipe(fs.createWriteStream(subtitlesPath + result.fr));
                                                }
                                                res.send(result);
                                            });
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                            res.send(result);
                                        });
                                } else {
                                    res.send(result);
                                }
                            });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.send('error');
                        });
                } else {
                    res.send('error');
                }
            })
            .catch((err) => {
                console.error(err);
                res.send('error');
            });
    } catch (e) {
        console.error(e);
        res.send('error');
    }
});

module.exports = router;
