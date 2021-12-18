const res = require('express/lib/response');
var mysql = require('promise-mysql')

var pool

mysql.createPool({
    connectionLimit: 4,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'collegeDB'

})
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log("error = " + error)
    });

var getModules = function () {
    return new Promise((resolve, reject) => {

        pool.query("select * FROM module;")
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })

    })

}

var getStudents = function () {
    return new Promise((resolve, reject) => {

        pool.query("select * FROM student;")
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var addStudent = function (sid, name, gpa) {
    return new Promise((resolve, reject) => {
        pool.query("insert into student (sid, name, gpa) value ('"+sid+"','"+name+"','"+gpa+"')")
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var deleteStudent = function (sid) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'DELETE FROM student WHERE sid = ?',
            values: [sid]
        }

        pool.query(myQuery)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
module.exports = { getModules, getStudents, deleteStudent, addStudent }