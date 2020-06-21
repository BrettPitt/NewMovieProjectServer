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

/**
 * Setup express middleware
 */
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

//return movies
app.get('/NewMovieWorld', (req, res) => {
    collection.find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});











app.post('/favouritList', (req, res) => {
    console.log('im posting into mongoDB right now');
    const favouritList = req.body;
    collection.insertOne(favouritList, function (err, result) {
        if (err) throw err;
        res.send({result: 'favorite inserted', favouritList: favouritList});
    });
});
//                                              hier ist noch ein fehler t.o.d.o. wurde nicht angepasst

















//delete a favourite movie
app.delete('/NewMovieWorld/:id', (req, res) => {
    const query = { _id: new mongodb.ObjectID(req.params.id) };
    collection.deleteOne(query, function(err, obj) {
        if (err) throw err;
        res.send({result: 'Movie deleted'});
    });
});


// /** create db
//  *
//  */
// MongoClient.connect(url, function(err, connection) {
//     if (err) throw err;
//     let dbo = connection.db("NewMovieWorld");
//     dbo.createCollection(collectionName, function(err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         // connection.close();
//     });
//
//     collection = dbo.collection(collectionName);
// });







app.get('/', (req, res) => {
    res.send('Hello dear User');
});





/**
 * Start server
 */
app.listen(port, () => {
    console.log(`Favorite app listening at http://localhost:${port}`);
});
