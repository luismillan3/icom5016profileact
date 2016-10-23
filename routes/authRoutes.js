var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego

 var users=[
  {username:'Pedro',password:'pedro',role:'student',email:'pedro@gmail.com'},
  {username:'Juan',password:'galleta',role:'recruiter',email:'juan@gmail.com'},
  {username:'Rogelio',password:'marie',role:'professor',email:'rogelio@gmail.com'}

  ]

router.post('/login', function(req, res, next) {
    console.log('entre al login')
     if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password'))
     {
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }
    
    for(var i=0;i<users.length;i++){
      if(req.body.username==users[i].username && req.body.password==users[i].password){
      return res.json(users[i])
        key=true
        break;
      }
    }
    

});

router.post('/signup', function(req, res, next) {
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