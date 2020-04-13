const request = require('request');
const Movie = require('../models/Movie');
const { asyncForEach } = require('../functions/back');
const imdb = require('imdb-api');

const getImdbData = async (movie) => {
    return imdb.get(movie.imdb_code ? {id: movie.imdb_code} : {name: movie.title}, { apiKey: '28b91dfb' }).then((data) => {
        if (!data) {
            throw 'There is not imdbcode for ' + movie.title;
        }
        if (data.type !== 'movie') {
            throw 'The movie is not a movie';
        }
        movie.title = data.title;
        movie.director = data.director ? data.director : '';
        movie.writer = data.writer ? data.writer : '';
        movie.imdb_code = data.imdbid ? data.imdbid : movie.imdb_code;
        movie.year = data.year;
        movie.rating = data.rating;
        movie.actors = data.actors ? data.actors : '';
        movie.country = data.country ? data.country : '';
        movie.genres = data.genres ? data.genres.split(',') : [];
        movie.summary = data.plot ? data.plot : '';
        movie.cover = data.poster ? data.poster : '';
        movie.runtime = data.runtime ? data.runtime : '';

        return movie;
    })
        .then((movie) => {
            movie.save();
            return Promise.resolve();
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

const saveEztv = async (data) => {
    const imdb_code = data.imdb_id;
    const magnet = data.magnet_url;

    if (!imdb_code || !magnet) {
        return;
    }
    const movie = new Movie ({
        provider: 'eztv',
        imdb_code,
        magnet
    });
    try {
        await getImdbData(movie);
    } catch (e) {
        console.error('YTS Error: ', e);
    }
}


const saveYts = async (data) => {
    if (!data.torrents) {
        return;
    }
    const movie = new Movie({
        provider: 'yts',
        imdb_code: data.imdb_code,
        title: data.title,
        torrent: data.torrents
    });
    try {
        await getImdbData(movie);
    } catch (e) {
        console.error('YTS Error: ', e);
    }
}

const downloadMovieData = async(page, provider) => {
    const url = provider === 'yts' ? 'https://yts.ag/api/v2/list_movies.json?limit=100&page=' : 'https://eztv.ag/api/get-torrents?limit=100&page=';

    await request(url + page, async (err, res, body) => {
        if (err || !res) {
            console.error(err ? err : 'No results in page ' + page);
        } else if (res.statusCode !== 200) {
            console.error('Request status ' + res.statusCode + ' for page ' + page);
        } else {
            try {
                body = JSON.parse(body);

                if (provider === 'yts' ? !body.data : !body.torrents) {
                    return Promise.reject();
                }

                const movies = provider === 'yts' ? body.data.movies : body.torrents;

                if (!movies) {
                    return Promise.resolve();
                }

                movies.forEach((movie) => {
                    if (provider === 'yts') {
                        saveYts(movie);
                    } else {
                        saveEztv(movie);
                    }
                })
            } catch (e) {
                return Promise.reject(e);
            }
        }
        await downloadMovieData(page + 1, provider);
        return Promise.resolve();
    });
}

const importMovies = async() => {
    try {
        const providers = [ 'yts', 'eztv' ];

        await asyncForEach(providers, async(provider) => {
            await downloadMovieData(1, provider).then(() => {
                console.log(provider + ' successfully set up !');
            }).catch((e) => {
                    console.error('An error occured in provider ' + provider + ' :\n' + e);
            });
        });
    } catch(e) {
        console.log(e);
    }
};

module.exports = importMovies;
