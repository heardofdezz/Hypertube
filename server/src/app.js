const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');



const app = express();


// app.get('/', function (req, res) {
//     res.send('Hello World!')
//   })

let port = 8081;
app.listen(port, () =>  {
    console.log(`listening server side on ${port} Waiting on launching Mongoose Database`)
})
//synching Databse for error before launching Serveer port
mongoose.connect

