const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const port = 3000;

const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const dbName = 'NewMovieWorld';
const collectionName = 'favouritList';
let db = undefined;
let collection = undefined;


//setup express middleware
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

//greeting message io localhost:3000
app.get('/', (req, res) => {
    res.send('Hello dear User');
});

//return favourit list
app.get('/favouritList', (req, res) => {
    console.log('trying to get data from mongodb')
    collection.find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// post a movie to DB
app.post('/favouritList', (req, res) => {
    console.log('im posting into mongoDB right now');
    const favouritList = req.body;
    collection.insertOne(favouritList, function (err, result) {
        if (err) throw err;
        res.send({result: 'favorite inserted', favouritList: favouritList});
        // console.log(favouritList.toString())
    });
});

//delete a favourite movie
app.delete('/favouritList/:id', (req, res) => {
    console.log('try to delete a movie')
    const query = { _id: new mongodb.ObjectID(req.params.id) };
    collection.deleteOne(query, function(err, obj) {
        if (err) throw err;
        res.send({result: 'Movie deleted'});
    });
});

//create db
MongoClient.connect(url, function(err, connection) {
    if (err) throw err;
    let dbo = connection.db("NewMovieWorld");
    dbo.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        // connection.close();
    });
    collection = dbo.collection(collectionName);
});

// start server
app.listen(port, () => {
    console.log(`Favorite app listening at http://localhost:${port}`);
});
