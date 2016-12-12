var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego
const database_URL= 'postgres://xwozcfrzmmekkv:zvyT7_TOODaNOop6XdZN2wddOU@ec2-54-243-204-57.compute-1.amazonaws.com:5432/d2ubph0nje9jmv'
pg.defaults.ssl = true;

var addUser = 'Insert into users (username, password, role) values ($1, $2, $3)'
var addStudent = 'Insert into student (name, lastname, email, gpa, year, userid, majorid) values ($1, $2, $3, $4, $5, $6, $7)'
var selectUser = 'SELECT * FROM users where username=$1 and password=$2 and role=$3'

var addRecruiter = 'Insert into recruiter (name, lastname, email, company, userid) values ($1, $2, $3, $4, $5)'
var addProfessor = 'Insert into professor (name, lastname, email, userid) values ($1, $2, $3, $4)'
var addFileID = 'Insert into files (userid) values ($1)'


router.get('/major', function(req, res, next) {

    pg.connect(database_URL, function(err, client, done) {
        client.query('SELECT * FROM major', function(err, result) {

            if (err)
            { console.error(err); res.send("Error " + err); }
            else
            res.json(result.rows);
            console.log(result.rows)
            done();
        });
    });

});
router.post('/login', function(req, res, next) {
    console.log('entre al login')
    if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password'))
    {
        res.statusCode = 400;
        return res.send('Error: Missing fields for event.');
    }


    pg.connect(database_URL, function(err, client, done) {
        client.query('SELECT * FROM users where username=$1 and password=$2',[req.body.username, req.body.password], function(err, result) {

            if (err)
            { console.error(err); res.send("Error " + err); }
            else
            res.json(result.rows);
            console.log(result.rows)
            done();
        });
    });


});

router.post('/signup/student', function(req, res, next) {
    console.log(req.body)
    if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')
    || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastname')
    || !req.body.hasOwnProperty('gpa') || !req.body.hasOwnProperty('year') || !req.body.hasOwnProperty('major')){

        res.statusCode = 400;
        return res.send('Error: Missing fields for event.');
    }
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(addUser,[req.body.username, req.body.password, 'student'], function(err, result) {

            if (err)
            { console.error(err); res.send("Error " + err); }
            else
            // res.json(result.rows);

            done();
            client.query(selectUser,[req.body.username, req.body.password, 'student'], function(err, result) {

                if (err)
                { console.error(err); res.send("Error " + err); }
                else

                userid=result.rows[0].userid;
                resultRows = result.rows
                console.log(result.rows)
                console.log(userid)
                done();
                client.query(addStudent,[req.body.name, req.body.lastname,req.body.email,req.body.gpa,req.body.year,userid,req.body.major], function(err, result) {

                    if (err)
                    { console.error(err); res.send("Error " + err); }
                    else
                    client.query(addFileID,[userid], function(err, result) {

                    if (err)
                    { console.error(err); res.send("Error " + err); }
                    else
                    res.json(resultRows);
                    done();
                });
                });
            });
        });
    });
});

router.post('/signup/recruiter', function(req, res, next) {
    console.log(req.body)
    if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')
    || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastname')
    || !req.body.hasOwnProperty('company')){

        res.statusCode = 400;
        return res.send('Error: Missing fields for event.');
    }
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(addUser,[req.body.username, req.body.password, 'recruiter'], function(err, result) {

            if (err)
            { console.error(err); res.send("Error " + err); }
            else
            // res.json(result.rows);

            done();





            client.query(selectUser,[req.body.username, req.body.password, 'recruiter'], function(err, result) {

                if (err)
                { console.error(err); res.send("Error " + err); }
                else
                userid=result.rows[0].userid;
                resultRows = result.rows
                console.log(result.rows)
                console.log(userid)
                done();
                client.query(addRecruiter,[req.body.name, req.body.lastname,req.body.email,req.body.company,userid], function(err, result) {

                    if (err)
                    { console.error(err); res.send("Error " + err); }
                    else

                    client.query(addFileID,[userid], function(err, result) {

                    if (err)
                    { console.error(err); res.send("Error " + err); }
                    else
                    res.json(resultRows);
                    done();
                });
                });

            });
        });
    });

});
router.post('/signup/professor', function(req, res, next) {
    console.log(req.body)
    if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')
    || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastname')){

        res.statusCode = 400;
        return res.send('Error: Missing fields for event.');
    }
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(addUser,[req.body.username, req.body.password, 'professor'], function(err, result) {

            if (err)
            { console.error(err); res.send("Error " + err); }
            else
            // res.json(result.rows);

            done();
            client.query(selectUser,[req.body.username, req.body.password, 'professor'], function(err, result) {

                if (err)
                { console.error(err); res.send("Error " + err); }
                else

                userid=result.rows[0].userid;
                resultRows = result.rows
                console.log(result.rows)
                console.log(userid)
                done();
                client.query(addProfessor,[req.body.name, req.body.lastname,req.body.email,userid], function(err, result) {

                    if (err)
                    { console.error(err); res.send("Error " + err); }
                    else

                    client.query(addFileID,[userid], function(err, result) {

                    if (err)
                    { console.error(err); res.send("Error " + err); }
                    else
                    res.json(resultRows);
                    done();
                });
                });
            });
        });
    });

});

module.exports = router;
