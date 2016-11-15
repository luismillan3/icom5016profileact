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
    //console.log('trying papehhh')
    var projectID = 0;
    pg.connect(database_URL, function(err, client, done) {
    client.query('SELECT * FROM research', function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
  		
      //console.log(result.rows[0].title)
      done();
    });
  });

  //.  res.json(projects);
});

router.post('/projects', function(req, res, next) {

          pg.connect(database_URL, function(err, client, done) {
    client.query('INSERT INTO research (title,description,professorid) VALUES ($1,$2,$3)',[req.body.title,req.body.desc,req.body.pid], function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
      //console.log(result.rows)
      done();
    });
  });
    

});

router.get('/researchStudents', function(req, res, next) {
    
    var projectID = 0;
    pg.connect(database_URL, function(err, client, done) {
    client.query('SELECT * FROM student', function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
      //console.log(result.rows)
      done();
    });
  });

  //.  res.json(projects);
});


router.post('/professorData', function(req, res, next) {
    

    pg.connect(database_URL, function(err, client, done) {
    client.query('SELECT * FROM users NATURAL JOIN professor WHERE userid = $1',[req.body.uid], function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
      //console.log(result.rows)
      done();
    });
  });


});




router.post('/researchStudents', function(req, res, next) {
    
    if(!req.body.hasOwnProperty('rese')|| !req.body.hasOwnProperty('student')) {
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }
    pg.connect(database_URL, function(err, client, done) {
    client.query('INSERT INTO research_student_rel (studentid,rid) SELECT $1, $2 WHERE  NOT EXISTS ( SELECT studentid,rid FROM research_student_rel WHERE studentid = $1 and rid=$2 )',[req.body.student,req.body.rese], function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
      //console.log(result.rows)
      done();
    });
  });


});

router.post('/removeResearchstudents', function(req, res, next) {
    
    if(!req.body.hasOwnProperty('rese')|| !req.body.hasOwnProperty('student')) {
      res.statusCode = 400;
      return res.send('Error: Missing fields for event.');
    }
    pg.connect(database_URL, function(err, client, done) {
    client.query('DELETE FROM research_student_rel WHERE studentid = $1 AND rid = $2',[req.body.student,req.body.rese], function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
      //console.log(result.rows)
      done();
    });
  });


});


router.post('/removeResearch', function(req, res, next) {
    
    // if(!req.body.hasOwnProperty('rese')|| !req.body.hasOwnProperty('student')) {
    //   res.statusCode = 400;
    //   return res.send('Error: Missing fields for event.');
    // }
    pg.connect(database_URL, function(err, client, done) {
    client.query('DELETE FROM research WHERE rid = $1',[req.body.rid], function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else{
      res.json(result.rows);
      //console.log(result.rows)
      done();

    }
    });
  });


});


router.post('/researchChanges', function(req, res, next) {
    
   // console.log(req.body);
    // if(!req.body.hasOwnProperty('title')|| !req.body.hasOwnProperty('funding')  || !req.body.hasOwnProperty('id')) {
    //   res.statusCode = 400;
    //   return res.send('Error: Missing fields for event.');
    // }

   //console.log(''req.body)

   if(req.body.hasOwnProperty('title') && !req.body.hasOwnProperty('description')) {
    pg.connect(database_URL, function(err, client, done) {
    client.query('UPDATE research SET title = $1 WHERE rid = $2',[req.body.title,req.body.rid], function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
     // console.log(result.rows)
      done();
    });
  });

}

else if (!req.body.hasOwnProperty('title') && req.body.hasOwnProperty('description')){
    pg.connect(database_URL, function(err, client, done) {
    client.query('UPDATE research SET description = $1 WHERE rid = $2',[req.body.description,req.body.rid], function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
     // console.log(result.rows)
      done();
    });
  });

}

else {
      pg.connect(database_URL, function(err, client, done) {
    client.query('UPDATE research SET title = $1,funding = $2 WHERE rid = $3',[req.body.title,req.body.funding,req.body.rid], function(err, result) {
      
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
     // console.log(result.rows)
      done();
    });
  });


}

});







  router.get('/singleProjectStudents', function(req, res, next) {
    //console.log("El id papeh -?> " + req.body.rid);
 // console.log(req.body)

    pg.connect(database_URL, function(err, client, done) {
    //client.query('SELECT name FROM student NATURAL JOIN research_student_rel NATURAL JOIN research WHERE rid = $1',[req.body.rid], function(err, result) {
      client.query('SELECT * FROM student NATURAL JOIN research_student_rel NATURAL JOIN research', function(err, result) { 
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
      res.json(result.rows);
      //console.log(result.rows)
      done();
    });
  });

  });


module.exports = router;
