var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego
const database_URL= 'postgres://xwozcfrzmmekkv:zvyT7_TOODaNOop6XdZN2wddOU@ec2-54-243-204-57.compute-1.amazonaws.com:5432/d2ubph0nje9jmv'
pg.defaults.ssl = true;

var projects =[
        { id:1,
          title: 'Gatos de ataque, para el Army',
          funding:100,
          students: [
              {name: 'Luis Millan'},
              {name: 'Jennifer Anniston'}
          ],
        },
        { id:2,
          title: 'Quadcopter Fastfood Delivery',
          funding:69,
          students: [
              {name: 'Fernando Arocho'},
              {name: 'Scarlett Johanson'}
          ],
        },
      ]


router.get('/projects', function(req, res, next) {
    console.log('trying papehhh')
    var projectID = 0;
    pg.connect(database_URL, function(err, client, done) {
    client.query('SELECT * FROM research', function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
  		
      console.log(result.rows[0].title)
      done();
    });
  });

  //.  res.json(projects);
});

router.post('/projects', function(req, res, next) {
    console.log("Hello Im trying to add somthing")
    if(!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('funding')
    || !req.body.hasOwnProperty('student')) {
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }
    projects.push(req.body)

    res.json(projects);

});

router.get('/researchStudents', function(req, res, next) {
    console.log('Students Papeh')
    var projectID = 0;
    pg.connect(database_URL, function(err, client, done) {
    client.query('SELECT * FROM student', function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
      // console.log(result.rows)
      done();
    });
  });

  //.  res.json(projects);
});



module.exports = router;
