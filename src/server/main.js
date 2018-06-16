var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  AnimationController = require('./animationController.js'),
  bodyParser = require('body-parser');

var Datastore = require('nedb');
var db = new Datastore({ filename: 'database.db' });
db.loadDatabase();  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var animationController = new AnimationController(app, db);

app.listen(port);

console.log('RESTful API server started on: ' + port);
