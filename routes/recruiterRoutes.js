var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego


var recruiter={name:"Alejandro",lastname:"Martinez",email:"ale.ma@raytheon.com",company:"Raytheon"}
var events = [
        { id:1,title: 'Master HTML/CSS/Javascript',description:"Awesome Event",date:"10/12/16 10:00"},
        { id:2,title: 'Raytheon Session',description:"Awesome Event",date:"10/12/16 10:00"},
        { id:3,title: 'Johns Hopkins Session',description:"Awesome Event",date:"10/12/16 10:00"},
        { id:4,title: 'Boeing Company',description:"Awesome Event",date:"10/12/16 10:00"},
        { id:5,title: 'Mario Bros in the House',description:"Awesome Event",date:"10/12/16 10:00"}
      ]
var students = [
        { studentName: 'Marcel',studentLastName:"Fuentes",gpa:3.53,major:"BIOL"},
        { studentName: 'Maria',studentLastName:"Del Valle",gpa:3.32,major:"COMP"},
        { studentName: 'Kelvin',studentLastName:"Pelota",gpa:2.74,major:"ICOM"},
        { studentName: 'Nerymar',studentLastName:"Cucuza",gpa:2.9,major:"INEL"},
        { studentName: 'Cafralin',studentLastName:"Pelora",gpa:3.94,major:"ININ"}
      ]

router.get('/events', function(req, res, next) {
    console.log('entre')
    res.json(events);

});

router.post('/events', function(req, res, next) {
    console.log(req.body)
    if(!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('description')
    || !req.body.hasOwnProperty('date')) {
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }
    events.push(req.body)

    res.json(events);

});
router.delete('/events/:id', function(req, res, next) {

  console.log("From delete route");
  console.log(req.params.id);
  for(var i=0;i<events.length;i++){
    if(events[i].id==req.params.id){
        events.splice(i,1);
    }
  }
  res.json(events);
  });

router.get('/profile', function(req, res, next) {
    console.log('entre al recruiter profile')
    res.json(recruiter);

});
router.put('/profile/update', function(req, res, next) {
    console.log('actualize recruiter')
     if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastname')
    || !req.body.hasOwnProperty('email')){
       res.statusCode = 400;
      return res.send('Error: Missing fields for recruiter.');
     }
      recruiter=req.body;
    
    res.json(recruiter);

});

router.get('/search', function(req, res, next) {
    console.log('entre')
    res.json(students);

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