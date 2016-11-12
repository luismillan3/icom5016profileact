var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego
const database_URL= 'postgres://xwozcfrzmmekkv:zvyT7_TOODaNOop6XdZN2wddOU@ec2-54-243-204-57.compute-1.amazonaws.com:5432/d2ubph0nje9jmv'
pg.defaults.ssl = true;


var student = {name:"Bartolo",
  lastName:"Del Pueblo",
  email:"diablo@upr.edu",
  profileImage: "https://s-media-cache-ak0.pinimg.com/236x/bd/01/40/bd01401c5b6c716b8b14786ec995ecbe.jpg",
  major: "ICOM",
  gpa: 3.43,
  resume:"#",
  projects: [
          {id: 1, title: 'Enfoque Film Festival', picture:"http://www.filmfestivals.com/files/enfoque_logo_HORIZONTAL1.jpg?0", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
          {id: 2, title: 'Tarzan Watch', picture:"http://www.nse.org/exchange/slides/135_4_Our-Mascot-Tarzan.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
          {id: 3, title: 'Build NodeJS backend' , picture:"https://cdn.tutsplus.com/net/uploads/legacy/956_nodeJs/nodeJs.png", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
          {id: 4, title: 'Get started with AngularJS' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
          {id: 5, title: 'Setup Postgres database' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
          {id: 6, title: 'Be awesome!' , picture:"https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg", description:"Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus."},
    ],
  research: [
        { name: 'Enfoque Film Festival', department: 'Computer Engineering', advisor: 'Nayda Santiago', role: 'Developer'},
        { name: 'Tiburones', department: 'Electrical Engineering', advisor: 'Nayda Santiago', role: 'Developer'},

    ],

}

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


// router.get('/profile', function(req, res, next) {
//     console.log('Student funciona')
//     res.json(student);
//
// });








router.post('/profile', function(req, res, next) {
    console.log(req.body)
    pg.connect(database_URL, function(err, client, done) {
        client.query('SELECT * FROM users natural join student where userid=$1',[req.body.userid], function(err, result) {

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
        client.query('SELECT description, title, image FROM projects natural join student natural join users where users.userid=$1 and student.userid = users.userid and projects.student_id = student.studentid', 
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
