const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')(/*options*/);
const db = pgp('postgres://mygreat:mygreatproject@localhost:5432/mygreatbase1');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

db.one('SELECT $1 AS value', 123)
    .then(function (data) {
        console.log('DATA:', data.value)
    })
    .catch(function (error) {
        console.log('ERROR:', error)
    })

app.get('/', function (req, res) {
    res.send('hello API');
})

app.get('/articles', function (req, res) {

    db.any('SELECT * FROM articles ')
        .then(function (data) {
            res.send(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error);
            res.sendStatus(400);
        });
})

app.get('/articles/:id', function (req, res) {
    db.one('SELECT * FROM articles WHERE id = $1', Number(req.params.id))
        .then(function (data) {
            res.send(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error);
            res.sendStatus(400);
        });
})

app.post('/articles', function (req, res) {
    db.none('INSERT INTO articles(name, picture_url, date, page_content) VALUES($1, $2, $3, $4)',
        [req.body.name, req.body.picture_url, req.body.date, req.body.page_content])
        .then(() => {
            res.sendStatus(200); //status 
        })
        .catch(error => {
            console.log('ERROR:', error);
            res.sendStatus(400); //status 
        });
})

app.listen(3012, function () {
    console.log('API app started');
})

// app.get('/artists/:id', function(req, res){
//     console.log(req.params);
//     let artist = artists.find(function (artist) {
//         return artist.id === Number(req.params.id)
//     })
//     res.send(artist);
// })

// app.post('/artists', function(req, res) {
//     let artist = {
//         id: Date.now(),
//         name: req.body.name
//     };
//     artists.push(artist);
//     res.send(artist);
// })

// app.put('/artists/:id', function (req, res) {
//     let artist = artists.find(function (artist) {
//         return artist.id === Number(req.params.id)
//     })
//     artist.name = req.body.name;
//     res.sendStatus(200); //status 
// })

// app.delete('/artists/:id', function (req, res) {
//     artists = artists.filter(function (artist) {
//         return artist.id !== Number(req.params.id);
//     })
//     res.sendStatus(200); //status
// })

