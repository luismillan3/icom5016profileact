var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego
const database_URL= 'postgres://xwozcfrzmmekkv:zvyT7_TOODaNOop6XdZN2wddOU@ec2-54-243-204-57.compute-1.amazonaws.com:5432/d2ubph0nje9jmv'
pg.defaults.ssl = true;

var getStudent = 'SELECT * FROM users natural join student natural join major natural join files where userid=$1'
var getStudentId = 'SELECT studentid FROM users natural join student where userid = $1'
var updateStudent ='UPDATE student set name=$1, lastname=$2 where studentid=$3';
var updateStudentInfo ='UPDATE student set majorid=$1, year=$2, gpa=$3 where studentid=$4';
var getMajors = 'SELECT * FROM major'
var getProjects = 'SELECT projectid, description, title, image FROM projects natural join student natural join users where users.userid=$1 and student.userid = users.userid and projects.student_id = student.studentid order by projects.projectid'
var insertProject = 'INSERT INTO projects(title, description, image, student_id) VALUES($1, $2, $3, $4)'
var updateProject = 'UPDATE projects set title=$1, description=$2 where projectid=$3'
var deleteProject = 'DELETE FROM projects WHERE projectid=$1';
// router.get('/profile', function(req, res, next) {
//     console.log('Student funciona')
//     res.json(student);
//
// });

router.post('/profile', function(req, res, next) {
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getStudent,[req.body.userid], function(err, result) {

            if (err)
             { console.error(err); response.send("Error " + err); }
            else
            res.json(result.rows);
            console.log(result.rows)
            done();
        });
    });
});

router.put('/profile/update', function(req, res, next) {

    console.log('updated student profile')
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastname')){
        res.statusCode = 400;
        return res.send('Error: Missing fields for student.');
    }
    var studentid=0;
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getStudentId,[req.body.userid], function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else

            studentid=result.rows[0].studentid;

            console.log(studentid)
            done();
            client.query(updateStudent,[req.body.name,req.body.lastname,studentid], function(err, result) {

                if (err)
                { console.error(err); response.send("Error " + err); }
                else
                res.json("OK");
                done();
            });
        });

    });

});

router.put('/info/update', function(req, res, next) {

    console.log('updated student Info')
    if(!req.body.hasOwnProperty('majorid') || !req.body.hasOwnProperty('year') || !req.body.hasOwnProperty('gpa')){
        res.statusCode = 400;
        return res.send('Error: Missing fields for student.');
    }
    var studentid=0;
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getStudentId,[req.body.userid], function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else

            studentid=result.rows[0].studentid;

            console.log(studentid)
            done();
            client.query(updateStudentInfo,[req.body.majorid,req.body.year,req.body.gpa,studentid], function(err, result) {

                if (err)
                { console.error(err); response.send("Error " + err); }
                else
                res.json("OK");
                done();
            });
        });

    });

});

router.get('/majors', function(req, res, next) {
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getMajors, function(err, result) {

            if (err)
             { console.error(err); response.send("Error " + err); }
            else
            res.json(result.rows);
            console.log(result.rows)
            done();
        });
    });
});


router.post('/projects', function(req, res, next) {
    console.log('Projects Papeh')
    var projectID = 0;
    pg.connect(database_URL, function(err, client, done) {
        client.query(getProjects,[req.body.userid], function(err, result) {

          if (err)
           { console.error(err); response.send("Error " + err); }
          else
          res.json(result.rows);
          done();
        });
    });

});

router.post('/projects/add', function(req, res, next) {
    console.log(req.body)
    var studentId=0;
    if(!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('description')
    || !req.body.hasOwnProperty('image')) {
        res.statusCode = 400;
        return res.send('Error: Missing fields for event.');
    }
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getStudentId,[req.body.userid], function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }

            studentId=result.rows[0].studentid;
            console.log(result.rows)
            console.log(studentId)
            done();
            client.query(insertProject,[req.body.title, req.body.description,req.body.image,studentId], function(err, result) {

                if (err)
                { console.error(err); response.send("Error " + err); }
                else
                res.json("OK");
                done();
            });
        });

    });
});

router.put('/projects/update/:id', function(req, res, next) {

    console.log('updated project Info')
    if(!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('description')){
        res.statusCode = 400;
        return res.send('Error: Missing fields for student.');
    }
    var studentid=0;
    pg.connect(database_URL, function(err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(updateProject,[req.body.title, req.body.description, req.params.id], function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            res.json("OK");
            done();
        });

    });

});


router.delete('/projects/delete/:id', function(req, res, next) {


    console.log("From delete project route");
    console.log(req.params.id);
    pg.connect(database_URL, function(err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(deleteProject, [req.params.id], function(err, result) {
            //call `done()` to release the client back to the pool

            if (err) {
                res.send(err);
            }
            res.json("OK");
            done();
        });

    });
});

router.get('/events', function(req, res, next) {
    console.log('events Papeh')
    var projectID = 0;
    pg.connect(database_URL, function(err, client, done) {
        client.query('select title, description, event.date, event.image, recruiterid, recruiter.company from event natural join recruiter where event.recruiterid = recruiter.recruiterid',
        function(err, result) {

          if (err)
           { console.error(err); response.send("Error " + err); }
          else
          res.json(result.rows);
          done();
        });
    });
});

router.post('/myResearch', function(req, res, next) {
    console.log('research del estudiante Papeh')

    pg.connect(database_URL, function(err, client, done) {
        client.query('SELECT rsr.rid, rsr.studentid, rsr.professorid, rprof.title, rprof.description as description, s.name, p.name as pFirstName, p.lastname as pLastName, rsr.student_role as role FROM research_student_rel AS rsr LEFT JOIN professor AS p ON rsr.professorid = p.professorid LEFT JOIN research AS rprof ON p.professorid = rprof.professorid LEFT JOIN student AS s ON s.studentid = rsr.studentid LEFT JOIN users AS u ON u.userid = s.userid WHERE u.userid = $1',
        [req.body.userid],
        function(err, result) {

          if (err)
           { console.error(err); response.send("Error " + err); }
          else
          res.json(result.rows);
          done();
        });
    });
});

router.get('/research', function(req, res, next) {
    console.log('research Papeh')
    var projectID = 0;
    pg.connect(database_URL, function(err, client, done) {
        client.query('select title, description, funding, email, professor.name, professor.lastname from research natural join professor where research.professorid = professor.professorid',
        function(err, result) {

          if (err)
           { console.error(err); response.send("Error " + err); }
          else
          res.json(result.rows);
          done();
        });
    });
});




// router.delete('/events/:id', function(req, res, next) {

//   console.log("From delete route");
//   console.log(req.params.id);
//   for(var i=0;i<events.length;i++){
//     if(events[i].id==req.params.id){
//         events.splice(i,1);
//     }
//   }
//   res.json(events);
//   });

router.put('/profileUpdate', function(req, res, next) {
    console.log('entre')
     if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastname')
    || !req.body.hasOwnProperty('email'))
      recruiter=req.body;
    res.json(recruiter);

});





module.exports = router;
