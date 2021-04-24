var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var route = require("./Routes/route");
var bodyparser = require('body-parser');
var app = express();
const { DATABASE, SERVER } = require("./config")

mongoose.connect(DATABASE,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to mongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log('Failed to connect MongoDB', err);
});

const port = process.env.PORT || SERVER;

//Middleware
app.use(cors());
app.use(bodyparser.json());
app.use('/api', route);

app.get('/', (req, res) => {
    res.send('Server working!');
});

app.listen(port, () => {
    console.log('Listening at:' + port);
});