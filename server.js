var express = require('express');
var path = require('path');
var node_list = require('./views/data.json');
var template_dir = '/client';
var db = require('./dal.js');
var ejs = require('ejs');
var app = express();
var port = process.env.PORT || 80;
var database = new db.database();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
var jf = require('jsonfile')
var util = require('util')

var n = node_list.nodes;
var nodes = {}
var last_node_id = 0;
var last_link_id = 0;
for(var i = 0; i < n.length; i++){
    var node = n[i];
    if(node.id in nodes){
	nodes[node.id].push(node);
    } else {
	nodes[node.id] = [node];
	last_node_id++;
    }
    if(node.id > last_node_id){
	last_node_id = node.id;
    }
}

var person = [];
var vehicle = [];
var edge = [];

for(var i in node_list.links){
    var node = node_list.links[i];
    if(last_link_id < node.id){
	last_link_id = node.id;
    }
}


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/'));


app.get('/edit', function(req, res) {
  res.render('main.ejs');
});

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.get('/data/links', function(req,res){
    res.send(JSON.stringify([nodes,person,vehicle,edge]));
})

app.post('/data/new_person', function(req, res){
    last_node_id++;
    var new_p = {
	id:last_node_id,
	label:req.body.label,
	"eigenvectorcentrality":0.1196161461694405,
	"modularityclass":1,
	'type':'crew'
    }
    console.log(new_p);
    node_list.nodes.push(new_p);
    
    var file = 'views/data.json';
    jf.writeFile(file, node_list, function(err){ console.log(err) });
});

app.post('/data/new_ship', function(req, res){
    last_node_id++;
    var new_p = {
	id:last_node_id,
	label:req.body.label,
	"eigenvectorcentrality":0.2196161461694405,
	"modularityclass":1,
	'type':'ship'
    }
    console.log(new_p);
    node_list.nodes.push(new_p);
    
    var file = 'views/data.json';
    jf.writeFile(file, node_list, function(err){ console.log(err) });
});

app.post('/data/new_loc', function(req, res){
    last_node_id++;
    var new_p = {
	id:last_node_id,
	label:req.body.label,
	"eigenvectorcentrality":0.5196161461694405,
	"modularityclass":1,
	'type':'loc'
    }
    
    node_list.nodes.push(new_p);
    
    var file = 'views/data.json';
    jf.writeFile(file, node_list, function(err){ console.log(err) });

});

app.post('/data/set_expd', function(req, res){
    last_node_id++;
    var expedition = {
	id:last_node_id,
	label:req.body.label,
	"eigenvectorcentrality":0.9196161461694405,
	"modularityclass":1,
	'type':'expd'
    }
    
    node_list.nodes.push(expedition);
    
    last_link_id++;
    var ship = {
	'target':expedition.id,
	'source':parseInt(req.body.shipid),
	'id':last_link_id,
	'label':'Transportation',
	'weight':1,
	'diedonexpedition':'V',
    }

    last_link_id++;
    var loc = {
	'source':parseInt(req.body.shipid),
	'target':parseInt(req.body.locid),
	'id':last_link_id,
	'label':'Expedition',
	'weight':1,
	'diedonexpedition':'',
    }

    var crews = req.body.crew;
    for(var i = 0; i < crews.length; i++){
	var cid = parseInt(crews[i]);
	last_link_id++;
	var crew = {
	    'source':cid,
	    'target':parseInt(req.body.shipid),
	    'id':last_link_id,
	    'label':'Crew',
	    'weight':1,
	    'diedonexpedition':'',
	}
	node_list.links.push(crew);
    }
    
    node_list.links.push(ship);
    node_list.links.push(loc);
    var file = 'views/data.json';
    jf.writeFile(file, node_list, function(err){ console.log(err) });
});

app.get('/data/crews', function(req, res){
    database.selectAllPeople(function(result){
	res.send(result);
    });
});

app.get('/data/ships', function(req, res){
    database.selectAllShips(function(result){
	res.send(result);
    });

});

app.get('/data/locs', function(req, res){
    database.selectAllLocations(function(result){
	res.send(result);
    });

});

app.listen(port);
