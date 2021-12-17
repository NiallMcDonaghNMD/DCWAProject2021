var express = require('express');
var app = express();
var mongoDAO = require('./mongoDAO')
//uses GET method to send homepage to the / root URL


app.get('/', (req, res) =>{
    res.send(File(__dirname + "/views/homepage.html"));
});

app.get('/listLecturers', (req, res) =>{
    mongoDAO.getLecturers()
    .then((documents) => {
        res.send(documents);
    })

    .catch((error) => {
        res.send(error);
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");

});

console.log("Testing");