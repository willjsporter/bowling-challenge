var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var routes = require('./routes/index');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// form-urlencoded
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.use('/', routes);


app.listen(3000, function () {
  var time = new Date()
  console.log('Bowling app listening on port 3000! '+time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
});
