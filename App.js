var express = require('express');
const rp = require('request-promise');
var connect = require('connect');
var serveStatic = require('serve-static');
const fs = require('fs');
// const bodyParser = requireA('body-parser')

var app = express()
var BACK_PORT = 3005;
var FRONT_PORT = 8080;

var __dirname = "./public/";
connect()
    .use(serveStatic(__dirname))
    .listen(FRONT_PORT, () => console.log('Front end is running on PORT:', FRONT_PORT));

    app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function(req, res) {
    console.log("test")
    res.status(200).send('Hello world');
});

app.get('/getTasks', function(req, res) {
    console.log("get tasks")
    let data = fs.readFileSync('data/tasks.json');
    res.status(200).send(JSON.parse(data));
});

app.get('/newTask', function(req, res) {
    let data = JSON.parse(fs.readFileSync('data/tasks.json'));
    console.log("req");
    data.push(req.query)
    fs.writeFileSync("data/tasks.json", JSON.stringify(data));
    res.status(200).send("test")
});

app.listen(BACK_PORT, function() {
    console.log('Back end is running on PORT:', BACK_PORT);
});