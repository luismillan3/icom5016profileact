var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
pg.defaults.ssl = true;
var database="postgres://xwozcfrzmmekkv:zvyT7_TOODaNOop6XdZN2wddOU@ec2-54-243-204-57.compute-1.amazonaws.com:5432/d2ubph0nje9jmv"

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


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



app.get('/db', function (request, response) {
  pg.connect(database, function(err, client, done) {
    client.query('SELECT * FROM admin_users', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

