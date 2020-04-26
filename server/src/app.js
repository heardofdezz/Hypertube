const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const  Config = require('./config/Config')
const app = express();
const importMovies = require('./config/setup');
const movieRouter = require('./routers/movie');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


// Application routes
require('./routes')(app)

// Connecting to Mongo Database when connected then launching back-end Server
mongoose.connect('mongodb+srv://hypertube:' +
Config.db.password +
'@cluster0-ybiyr.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((serverlaunch) => {
    importMovies();
    // app.use(movieRouter);
    app.listen(Config.port, () =>  {
        console.log(`listening server side on ${Config.port} Connected to Mongo/Mongoose Database`)
    })
}).catch((err) => {
    console.log(err)
});

/// Connect to app routes

