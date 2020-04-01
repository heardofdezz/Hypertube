const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const  Config = require('./config/Config')
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://hypertube:' + 
Config.db.password + 
'@cluster0-ybiyr.mongodb.net/test?retryWrites=true&w=majority',
{
    // useMongoClient: true,
    useNewUrlParser: true
});

/// Connect to app routes 
require('./routes')(app)



// app.get('/', function (req, res) {
//     res.send('Hello World!')
//   })



app.listen(Config.port, () =>  {
    console.log(`listening server side on ${Config.port} Waiting on launching Mongoose Database`)
})
//synching Databse for error before launching Serveer port
