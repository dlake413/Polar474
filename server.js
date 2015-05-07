var express = require('express');
var path = require('path');
var nodes = require('./data.json');
var template_dir = '/client';
var db = require('./dal.js');
var ejs = require('ejs');
var app = express();
var port = process.env.PORT || 8080 || 80;
var database = new db.database();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

console.log(__dirname);


app.get('/edit', function(req, res) {
  res.render('main.ejs');
});

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.get('/data/links', function(req,res){
  var person = [];
  var vehicle = [];
  var edge = [];
  for(i in nodes.links){
    var node = nodes.links[i];
    var label = node['label'];
    var doe = node['died on expedition'];
    if(doe.length > 0 || label.length > 0){
      if(doe == 'V'){
        vehicle.push(node);
      } else {
        person.push(node);
      }
    }
    else {
      edge.push(node);
    }
  }
  res.send(JSON.stringify([person,vehicle,edge]));
})

app.get('/get_user', function(req, res){
  
})

app.get('/data/nodes', function(req, res){
  var n = nodes.nodes;
  var list_of_nodes = {}
  for(var i in n){
    var node = n[i];
    if(node.id in list_of_nodes){
      list_of_nodes[node.id].push(node);
    } else {
      list_of_nodes[node.id] = [node];
    }
  }
  res.send(JSON.stringify(list_of_nodes));
});

app.listen(port);
