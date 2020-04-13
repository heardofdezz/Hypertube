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

router.get('/get-categories', async(req, res) => {
    try {
        await request('https://api.themoviedb.org/3/genre/movie/list?api_key=3ff5d54ee9e6ea8b52468f12f9f2e785&language=fr-FR', (err, response) => {
            res.send(JSON.parse(response.body).genres);
        });
    } catch(e){
        res.send('error');
    }
});

router.get('/get-movies-by-category/:id', async(req, res) => {
    try {
        let page = req.body ? req.query.page : 1;
        page = page ? page : 1;
        await request(`https://api.themoviedb.org/3/discover/movie?api_key=3ff5d54ee9e6ea8b52468f12f9f2e785&language=fr-FR&sort_by=popularity.desc&page=${page}&with_genres=${req.params.id}`, (err, response) => {
            res.send(JSON.parse(response.body));
        });
    } catch(e){
        res.send('error');
    }
});

router.get("/movie/:title", async(req, res) => {
    try {
        req.params.title = req.params.title.replace(/_/g, " ");
        await request(`https://tpb.party/search/${req.params.title}`, (err, response, body) => {
            const html = parser.parseFromString(body, "text/xml");
            const a = html.getElementsByTagName("a").map((elem) => elem.getAttribute("href")).filter((href) => (href && href.match(/^magnet/)));
            res.send(a);
        });
    } catch (e) {
        res.send("error");
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
