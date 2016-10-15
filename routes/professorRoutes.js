var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego

var projects =[
        { id:1,title: 'Gatos de ataque, para el Army',funding:100,student:'Luis Millan, Juan Guzman'},
        { id:2,title: 'Quadcopter Fastfood Delivery',funding:69,student:'Fernando Arocho,Scarlett Johanson'},
      ]


router.get('/projects', function(req, res, next) {
    console.log('trying')
    res.json(projects);
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





module.exports = router;