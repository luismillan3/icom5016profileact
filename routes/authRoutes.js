var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego
const database_URL= 'postgres://xwozcfrzmmekkv:zvyT7_TOODaNOop6XdZN2wddOU@ec2-54-243-204-57.compute-1.amazonaws.com:5432/d2ubph0nje9jmv'
pg.defaults.ssl = true;

 var users=[
  {userID:1,username:'Pedro',password:'pedro',role:'student',email:'pedro@gmail.com'},
  {userID:2,username:'Juan',password:'galleta',role:'recruiter',email:'juan@gmail.com'},
  {userID:3,username:'Rogelio',password:'marie',role:'professor',email:'rogelio@gmail.com'}

  ]
router.get('/major', function(req, res, next) {
    
   pg.connect(database_URL, function(err, client, done) {
    client.query('SELECT * FROM major', function(err, result) {

      if (err)
       { console.error(err); response.send("Error " + err); }
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
       { console.error(err); response.send("Error " + err); }
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
      || !req.body.hasOwnProperty('email'))
     {
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }

    users.push(req.body)
    res.json(req.body);

});

router.post('/signup/recruiter', function(req, res, next) {
    console.log(req.body)
     if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')
      || !req.body.hasOwnProperty('email'))
     {
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }

    users.push(req.body)
    res.json(req.body);

});
router.post('/signup/professor', function(req, res, next) {
    console.log(req.body)
     if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')
      || !req.body.hasOwnProperty('email'))
     {
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }

    users.push(req.body)
    res.json(req.body);

});

module.exports = router;
