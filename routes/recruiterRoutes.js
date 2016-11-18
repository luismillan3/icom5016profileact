var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego
const database_URL= 'postgres://xwozcfrzmmekkv:zvyT7_TOODaNOop6XdZN2wddOU@ec2-54-243-204-57.compute-1.amazonaws.com:5432/d2ubph0nje9jmv'
pg.defaults.ssl = true;


var getRecruiter='SELECT name,lastname,email,company FROM users natural join recruiter  where userid=$1';
var updateRecruiter='UPDATE recruiter set name=$1, lastname=$2, email=$3, company=$4 where recruiterid=$5';
var getEvents='SELECT eventid,title,description,date from users natural join recruiter natural join event where userid=$1';
var getRecruiterID='SELECT recruiterid FROM users natural join recruiter where userid=$1';
var insertEvent='INSERT INTO event(title,description,date,recruiterid) values($1,$2,$3,$4)';
var deleteEvent = 'DELETE FROM event WHERE eventid=$1';
var getAllStudents='SELECT * FROM student natural join major';
var getAddedStudents='SELECT * from recruiterfolder natural join student natural join major where recruiterid=$1';
var deleteAddedStudent = 'DELETE FROM recruiterfolder WHERE entryid=$1';
var addingStudentToFolder='INSERT INTO recruiterfolder  (recruiterid, studentid) SELECT $1, $2 WHERE  NOT EXISTS ( SELECT recruiterid,studentid FROM recruiterfolder WHERE recruiterid = $1 and studentid=$2 )'
var getAllResearch='Select * FROM research natural join professor'

router.post('/events', function(req, res, next) {
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getEvents,[req.body.userid], function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            res.json(result.rows);
            console.log(result.rows)
            done();
        });
    });

});

router.post('/events/add', function(req, res, next) {
    console.log(req.body)
    var recruiterid=0;
    if(!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('description')
    || !req.body.hasOwnProperty('date')) {
        res.statusCode = 400;
        return res.send('Error: Missing fields for event.');
    }
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getRecruiterID,[req.body.userid], function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else

            recruiterid=result.rows[0].recruiterid;
            console.log(result.rows)
            console.log(recruiterid)
            done();
            client.query(insertEvent,[req.body.title, req.body.description,req.body.date,recruiterid], function(err, result) {

                if (err)
                { console.error(err); response.send("Error " + err); }
                else
                res.json("OK");
                done();
            });
        });

    });
});
router.delete('/events/delete/:id', function(req, res, next) {


    console.log("From delete route");
    console.log(req.params.id);
    pg.connect(database_URL, function(err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(deleteEvent, [req.params.id], function(err, result) {
            //call `done()` to release the client back to the pool

            if (err) {
                res.send(err);
            }
            res.json("OK");
            done();
        });

    });
});

router.post('/profile', function(req, res, next) {
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getRecruiter,[req.body.userid], function(err, result) {
            //hacer otro query para enviar solo informacion del recruiter
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            res.json(result.rows);
            console.log(result.rows)
            done();
        });
    });
    // console.log('entre al recruiter profile')
    // res.json(recruiter);

});
router.put('/profile/update', function(req, res, next) {

    console.log('actualize recruiter')
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastname')
    || !req.body.hasOwnProperty('email')){
        res.statusCode = 400;
        return res.send('Error: Missing fields for recruiter.');
    }
    var recruiterid=0;
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getRecruiterID,[req.body.userid], function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else

            recruiterid=result.rows[0].recruiterid;

            console.log(recruiterid)
            done();
            client.query(updateRecruiter,[req.body.name, req.body.lastname,req.body.email,req.body.company,recruiterid], function(err, result) {

                if (err)
                { console.error(err); response.send("Error " + err); }
                else
                res.json("OK");
                done();
            });
        });

    });

});

router.get('/search', function(req, res, next) {

    pg.connect(database_URL, function(err, client, done) {
        client.query(getAllStudents, function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            res.json(result.rows);
            console.log(result.rows)
            done();
        });
    });

});
router.post('/added', function(req, res, next) {
    var recruiterid=0;
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query(getRecruiterID,[req.body.userid], function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else

            recruiterid=result.rows[0].recruiterid;

            console.log(recruiterid)
            done();
            client.query(getAddedStudents,[recruiterid], function(err, result) {

                if (err)
                { console.error(err); response.send("Error " + err); }
                else
                console.log(result.rows)
                res.json(result.rows);
                done();
            });
        });

    });

});
router.delete('/added/:id', function(req, res, next) {
    console.log("trying to delete")
    pg.connect(database_URL, function(err, client, done) {

        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(deleteAddedStudent, [req.params.id], function(err, result) {
            //call `done()` to release the client back to the pool

            if (err) {
                res.send(err);
            }
            res.json("OK");
            done();
        });

    });
});

router.post('/adding', function(req, res, next) {
    pg.connect(database_URL, function(err, client, done) {
        client.query(getRecruiterID,[req.body.userid], function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else

            recruiterid=result.rows[0].recruiterid;

            console.log(recruiterid)
            done();
            client.query(addingStudentToFolder,[recruiterid,req.body.studentid], function(err, result) {

                if (err)
                { console.error(err); response.send("Error " + err); }
                else

                res.json("OK");
                done();
            });
        });

    });
    console.log("trying to add student")
    // req.body.id=addedStudents.length+1;
    // addedStudents.push(req.body)



});

router.get('/research/get', function(req, res, next) {
    console.log("Coji los research")
    pg.connect(database_URL, function(err, client, done) {
        client.query(getAllResearch, function(err, result) {

            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            res.json(result.rows);
            console.log(result.rows)
            done();
        });
    });
});
//     var newCar = new Car(req.body.make, req.body.model, req.body.year, req.body.description, req.body.price);
//     console.log("New Car: " + JSON.stringify(newCar));
//     newCar.id = carNextId++;
//     carList.push(newCar);
//     res.json(true);
// });
// router.post('/', function(req, res, next) {
//     var createTodo = "INSERT INTO todo VALUES($1, $2)";
//     // Generate a v4 (random) id
//     var postId = uuid.v4();
//     pg.connect(dbUrl, function(err, client, done) {

//         if (err) {
//             return console.error('error fetching client from pool', err);
//         }
//         client.query(createTodo, [postId, req.body.task], function(err, result) {
//             //call `done()` to release the client back to the pool

//             if (err) {
//                 res.send(err);
//             }
//             done();
//         });
//         client.query(getAllTodos, function(err, result) {
//             //call `done()` to release the client back to the pool

//             if (err) {
//                 res.send(err);
//             }
//             res.json(result.rows);
//             done();
//         });

//     });

// });

// router.delete('/:id', function(req, res, next) {
//   var deleteTodo = "DELETE FROM todo WHERE _id=$1"
//   console.log("From delete route");
//   console.log(req.params.id);
//   pg.connect(dbUrl, function(err, client, done) {

//       if (err) {
//           return console.error('error fetching client from pool', err);
//       }
//       client.query(deleteTodo, [req.params.id], function(err, result) {
//           //call `done()` to release the client back to the pool

//           if (err) {
//               res.send(err);
//           }
//           done();
//       });
//       client.query(getAllTodos, function(err, result) {
//           //call `done()` to release the client back to the pool

//           if (err) {
//               res.send(err);
//           }
//           res.json(result.rows);
//           done();
//       });

//   });
// });



module.exports = router;
