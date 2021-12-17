var express = require('express');
var app = express();

//uses GET method to send homepage to the / root URL
app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/views/homepage.html");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");

});

console.log("Testing");