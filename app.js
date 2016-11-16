var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemon = require('nodemon');
var store = require('json-fs-store')();
app.use(bodyParser.json());

function team(scrMar, threePntPrct, rebMar, trnOvrMar, id, name) {
	this.scrMar = scrMar;
	this.threePntPrct = threePntPrct;
	this.rebMar = rebMar;
	this.trnOvrMar = trnOvrMar;
	this.id = id;
	this.name = name;
};

var idNum = ''

var teamDataResponse = ''

store.load('1', function(err, object){
	idNum = object;
	if(err) throw err;
})

app.get('/teamdata', function(req,res){
	console.log("incoming request for teamdata");
	res.type('json');
	store.list(function(err, objects){
		if(err) throw err;
		res.end(JSON.stringify(objects));
	});
});

app.get('/ajax', function(req, res){
	console.log("incoming id request");
	console.log(JSON.stringify(idNum));
	res.type('json');
	res.end(JSON.stringify(idNum));
});

app.post('/log', function(req, res){
	console.log(req.body.scrMar + " " + req.body.threePntPrct + " " + req.body.rebMar + " " + req.body.trnOvrMar + " "+ req.body.name + " " + req.body.id);
	res.json(200, {status: "success"});
	var reqName = req.body.name
	reqName = new team(req.body.scrMar, req.body.threePntPrct, req.body.rebMar, req.body.trnOvrMar, req.body.id, req.body.name);
	console.log(reqName);
	var newId = {
		id: 1,
		data: req.body.id
	}
	store.add(reqName, function(err){
		if(err) throw err;
	});
	store.add(newId, function(err){
		if(err) throw err;
	});

});

app.use(express.static(__dirname + '/public'));

var server = app.listen(8080, function(){	
	console.log('server running on 8080');
});