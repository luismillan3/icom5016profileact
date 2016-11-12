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

router.post('/login', function(req, res, next) {
    console.log('entre al login')
     if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password'))
     {
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }

  // // Get a Postgres client from the connection pool
  // pg.connect(database_URL, (err, client, done) => {
  //   // Handle connection errors
  //   if(err) {
  //     done();
  //     console.log(err);
  //     return res.status(500).json({success: false, data: err});
  //   }
  //   // SQL Query > Select Data
  //   const query = client.query('SELECT * FROM users;');
  //   // Stream results back one row at a time
  //   query.on('row', (row) => {
  //     results.push(row);
  //   });
  //   // After all data is returned, close connection and return results
  //   query.on('end', () => {
  //     done();
  //     console.log(results);
  //   });
  // });
//  const results = [];
// const client = new pg.Client(database_URL);
// client.connect();
// const query = client.query(
//   'select * from users');
// query.on('end', () => { client.end(); });
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
    // for(var i=0;i<users.length;i++){
    //   if(req.body.username==users[i].username && req.body.password==users[i].password){
    //   return res.json(users[i])
    //     key=true
    //     break;
    //   }
    // }


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
