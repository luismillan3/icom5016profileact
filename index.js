var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var multer  =   require('multer');
pg.defaults.ssl = true;
var database="postgres://xwozcfrzmmekkv:zvyT7_TOODaNOop6XdZN2wddOU@ec2-54-243-204-57.compute-1.amazonaws.com:5432/d2ubph0nje9jmv"

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    
    callback(null, './views/img');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
   // console.log(file);
  }
});

var storageResume =   multer.diskStorage({
  destination: function (req, file, callback) {
    console.log(req.resumename);
    callback(null, './views/resumes');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
   // console.log(file);
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

var uploadResume = multer({ storage : storageResume}).single('userResume');




app.post('/api/photo',function(req,res){
    console.log("uploading picture")
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

           pg.connect(database, function(err, client, done) {
           client.query('INSERT INTO files (profilepic,userid) VALUES ($1,$2) ON CONFLICT (userid) DO UPDATE SET profilepic = $1',["img/"+req.file.originalname,req.body.userid], function(err, result) {
          //client.query('UPDATE files SET profilepic = $1 WHERE userid = $2; IF NOT FOUND THEN INSERT INTO files (profilepic,userid) VALUES($1,$2) END IF;',[req.file.originalname,req.body.userid], function(err, result) {
      if (err)
       { console.error(err); res.send("Error " + err); }
      else
        res.redirect("http://localhost:5000/#/"+req.body.role);
     // res.json(result.rows);
      //console.log(result.rows)
      done();
    });
  });
       
       // res.redirect("http://localhost:5000/#/professor");
       // res.end("File is uploaded " + req.file.filename);
    });
});

app.post('/api/resume',function(req,res){
  console.log("entre al resume")
    uploadResume(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

         pg.connect(database, function(err, client, done) {
          client.query('INSERT INTO files (resumecv,userid) VALUES ($1,$2) ON CONFLICT (userid) DO UPDATE SET resumecv = $1',["resumes/"+req.file.originalname,req.body.userid], function(err, result) {
          
      if (err)
       { console.error(err); res.send("Error " + err); }
      else
        res.redirect("http://localhost:5000/#/"+req.body.role);
        
      done();
    });
  });
        //console.log("We entered");
       // res.redirect("http://localhost:5000/#/professor");
       // res.end("File is uploaded " + req.file.filename);
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/views/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


var auth = require('./routes/authRoutes');
app.use('/auth', auth);

var recruiter = require('./routes/recruiterRoutes');
app.use('/recruiter', recruiter);

var research = require('./routes/researchRoutes');
app.use('/investigacion', research);

var researchprof = require('./routes/professorRoutes');
app.use('/investigacionprof', researchprof);

var student = require('./routes/studentRoutes');
app.use('/student', student);



// app.get('/db', function (request, response) {
//   pg.connect(database, function(err, client, done) {
//     client.query('SELECT * FROM admin_users', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// });
