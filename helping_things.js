var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3012, function () {
    console.log('API app started');
})

let artists = [
{
        id: 1,
        name: 'metallica'
    },
{
        id: 2,
        name: 'Iron mde'
    },
{
        id: 3,
        name: 'Deep purple'
    }
];

app.get('/', function (req, res) {
    res.send('Hello API');
})

app.get('/artists', function (req, res) {
    res.send(artists);
})

 app.get('/artists/:id', function (req, res) {
     console.log(req.params);
     res.send('test');
 })

app.get('/artists/:id', function (req, res) {
    console.log(req.params);
    var artist = artists.find(function (element) {
        return element.id === Number(req.params.id);
    });
    res.send(artist);
})