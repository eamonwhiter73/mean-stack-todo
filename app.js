
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('mongodb:///home/yz/meanstack/mongodb/tmp/mongodb-27017.sock/mean');

var MemberSchema = require('./models/Member.js').MemberSchema;
var Member = db.model('members', MemberSchema);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/users', user.list);
app.get('/members.json', routes.get(Member));

app.get('/templates/:name', function (req, res) {
    res.render('templates/' + req.params.name);
});

app.put('/member/:id.json', routes.update(Member));

app.post('/member.json', routes.addMember(Member));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


