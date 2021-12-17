const e = require('express');
const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';

const dbName = 'lecturersDB';
const collName = 'lecturers';

var lecturersDb;
var lecturers;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((client) =>{
        lecturersDb = client.db(dbName);
        lecturers = lecturersDb.collection(collName);
    })
    .catch((error) => {
        console.log(error);
    });

var getLecturers = function(){
    return new Promise((resolve, reject) => {
        var cursor = lecturers.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents);
            })

            .catch((error) => {
                reject(error);
            });
    })
}

module.exports = {getLecturers};