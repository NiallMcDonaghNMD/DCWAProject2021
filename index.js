var express = require('express');
var app = express();
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')
var mySQLDAO = require('./mySQLDAO')

//Set view engine to use EJS for form
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded())
//uses GET method to send homepage to the / root URL
app.get('/', (req, res) =>{
    res.sendFile((__dirname + "/views/homepage.html"));
});

app.get('/listModules', (req, res) =>{
   // res.sendFile((__dirname + "/views/homepage.html"));
   mySQLDAO.getModules()
            .then((result) => {
                console.log(result)
                res.render('listModules', {modules: result})
            })
            .catch((error) => {
                res.send(error)
            });
});

app.get('/listStudents', (req, res) =>{
    // res.sendFile((__dirname + "/views/homepage.html"));
    mySQLDAO.getStudents()
             .then((result) => {
                 console.log(result)
                 res.render('listStudents', {students: result})
             })
             .catch((error) => {
                 res.send(error)
             });
 });

//Listens for url and sends workload to mongoDAO.js
app.get('/listLecturers', (req, res) =>{
    mongoDAO.getLecturers()
    .then((documents) => {
        res.render('listLecturers', {lecturers:documents});
    })

    .catch((error) => {
        res.send(error);
    });
});

app.get('/addLecturer', (req, res) => {
    res.render("addLecturer")
})

app.post('/addLecturer', (req, res) => {
    if(req.body._id.length > 2)
    {
        res.send("ID TOO LONG")
    } else
    {
        mongoDAO.addLecturer(req.body._id, req.body.name, req.body.dept)
        .then((result) => {
            res.send("OK")
        })
        .catch((error) => {
            if(error.message.includes("11000"))
            {
                res.send("Error: Lecturer with ID: " + req.body._id + "already exists")
    
            } else{
                res.send(Error.message)
    
            }
        })
    }
    
})

app.get('/addStudent', (req, res) => {
    res.render("addStudent")
})

app.post('/addStudent', (req, res) => {
    
        mySQLDAO.addStudent(req.body.sid, req.body.name, req.body.gpa)
        .then((result) => {
            res.redirect('/listStudent')
        })
        .catch((error) => {
            if(error.message.includes("11000"))
            {
                res.send("Error: Student with ID: " + req.body.sid + "already exists")
    
            } else{
                res.send(Error.message)
    
            }
        })
})

app.get('/students/delete/:sid', (req, res) => {
    mySQLDAO.deleteStudent(req.params.sid)
            .then((result) =>{
                res.redirect('listStudents');            
            })
    
            .catch((error) => {
                if(error.code == "ER_ROW_IS_REFERENCED_2")
                {
                    res.send("Student is unable to be deleted")

                }
                else
                {
                    res.send(error)

                }
            })
})

app.listen(3004, () => {
    console.log("Listening on port 3004");

});

console.log("Testing");