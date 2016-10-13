var express = require('express');
var router = express.Router();
var pg = require('pg');//para la base de datos luego


var student = {name:"Hijoerrr",
  lastname:"Diablo",
  email:"diablo@upr.edu",
  profileImage: "https://s-media-cache-ak0.pinimg.com/236x/bd/01/40/bd01401c5b6c716b8b14786ec995ecbe.jpg",
  major: "Computer Engineering",
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
        { name: 'Enfoque Film Festival', department: 'Computer Engineering', advisor: 'Nayda Santiago'},
        { name: 'Tiburones', department: 'Electrical Engineering', advisor: 'Nayda Santiago'},

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


router.get('/profile', function(req, res, next) {
    console.log('Student funciona')
    res.json(student);

});



router.post('/projects', function(req, res, next) {
    console.log(req.body)
    if(!req.body.hasOwnProperty('title') || !req.body.hasOwnProperty('description')){
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }
    req.body.picture= "https://yellowpencil.com/assets/blog/banners/banner-angularjs.jpg"
    student.projects.push(req.body)

    res.json(student.projects);
    console.log(req.body)

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

// router.put('/update', function(req, res, next) {
//     console.log('entre')
//      if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('lastname')
//     || !req.body.hasOwnProperty('email'))
//       student=req.body;
//     res.json(student);

// });





module.exports = router;