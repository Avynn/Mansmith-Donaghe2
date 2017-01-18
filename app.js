
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemon = require('nodemon');
var store = require('json-fs-store')();
var router = express.Router();
app.use(bodyParser.json());

function team(FreThrowMade, feilGolPrct, rebMar, trnOvrMar, id, name) {
	this.FreThrowMade = FreThrowMade;
	this.feilGolPrct = feilGolPrct;
	this.rebMar = rebMar;
	this.trnOvrMar = trnOvrMar;
	this.id = id;
	this.name = name;
};

var idNum = ''
var teamDataResponse = ''
var FreThrowMadeRankings = [];
var feilGolPrctRankings = [];
var rebMarRankings = [];
var trnOvrMarRankings = [];
var storeList = [];
var FreThrowMadeWeight = .15
var feilGolPrctWeight = .4
var rebMarWeight= .2
var trnOvrMarWeight = .15


populateRankingsId = ''

function populateRankings(callback){
	store.list(function(err, objects){
		storeList = objects;
		storeList.splice(0,1)
		//console.log(JSON.stringify(objects));
		FreThrowMadeRankings = objects.map(function(obj){
			var rObj = {};
			rObj = {
				team: obj.name,
				value: obj.FreThrowMade
			}
			return rObj;
		});
		FreThrowMadeRankings.splice(0,1);
		//console.log(FreThrowMadeRankings);
		feilGolPrctRankings = objects.map(function(obj){
			var rObj = {};
			rObj = {
				team: obj.name,
				value: obj.feilGolPrct
			}
			return rObj;
		});
		feilGolPrctRankings.splice(0,1);
		//console.log(feilGolPrctRankings);
		rebMarRankings = objects.map(function(obj){
			var rObj = {};
			rObj = {
				team: obj.name,
				value: obj.rebMar
			}
			return rObj;
		});
		rebMarRankings.splice(0,1);
		//console.log(rebMarRankings);
		trnOvrMarRankings = objects.map(function(obj){
			var rObj = {};
			rObj = {
				team: obj.name,
				value: obj.rebMar
			}
			return rObj;
		});
		trnOvrMarRankings.splice(0,1);
		//console.log(trnOvrMarRankings);
		callback();
	});
};

function sortRankings(callback){
	console.log("===========");
	FreThrowMadeRankings.sort(function (a, b) {
		/*console.log(a);
		console.log("============")
		console.log(b);*/
  		if (a.value > b.value) {
  			//console.log("a is greater than b");
    		return 1;
  		}
  		if (a.value < b.value) {
  			//console.log("b is greater than a");
    		return -1;
 		}
  		// a must be equal to b
  		console.log("a and b are equal");
  		return 0;
	});
	console.log("FreThrowMadeRankings")
	console.log(FreThrowMadeRankings);
	feilGolPrctRankings.sort(function (a, b) {
		/*console.log(a);
		console.log("============")
		console.log(b);*/
  		if (a.value > b.value) {
  			//console.log("a is greater than b");
    		return 1;
  		}
  		if (a.value < b.value) {
  			///console.log("b is greater than a");
    		return -1;
 		}
  		// a must be equal to b
  		console.log("a and b are equal");
  		return 0;
	});
	console.log("feilGolPrctRankings");
	console.log(feilGolPrctRankings)
	rebMarRankings.sort(function (a, b) {
		/*console.log(a);
		console.log("============")
		console.log(b);*/
  		if (a.value > b.value) {
  			//console.log("a is greater than b");
    		return 1;
  		}
  		if (a.value < b.value) {
  			//console.log("b is greater than a");
    		return -1;
 		}
  		// a must be equal to b
  		console.log("a and b are equal");
  		return 0;
	});
	console.log("rebMarRankings")
	console.log(rebMarRankings);
	trnOvrMarRankings.sort(function (a, b) {
		/*console.log(a);
		console.log("============")
		console.log(b);*/
  		if (a.value > b.value) {
  			//console.log("a is greater than b");
    		return 1;
  		}
  		if (a.value < b.value) {
  			//console.log("b is greater than a");
    		return -1;
 		}
  		// a must be equal to b
  		console.log("a and b are equal");
  		return 0;
	});
	console.log("trnOvrMarRankings");
	console.log(trnOvrMarRankings);
	console.log("=========")
	callback();
};

var calculateScore =  function(obj){
	var FreThrowMadeRankingsWorst = FreThrowMadeRankings[0].value;
	var FreThrowMadeRankingsBest = FreThrowMadeRankings[FreThrowMadeRankings.length - 1].value;
	var feilGolPrctRankingsWorst = feilGolPrctRankings[0].value;
	var feilGolPrctRankingsBest = feilGolPrctRankings[feilGolPrctRankings.length - 1].value;
	var rebMarRankingsWorst = rebMarRankings[0].value;
	var rebMarRankingsBest = rebMarRankings[rebMarRankings.length - 1].value;
	var trnOvrMarRankingsWorst = trnOvrMarRankings[0].value;
	var trnOvrMarRankingsBest = trnOvrMarRankings[trnOvrMarRankings.length - 1].value;
	obj.forEach(function(element){
		FreThrowMadeOutputRaw = (element.FreThrowMade - FreThrowMadeRankingsWorst)/(FreThrowMadeRankingsBest - FreThrowMadeRankingsWorst);
		FreThrowMadeOutput = FreThrowMadeOutputRaw * FreThrowMadeWeight;
		//element.FreThrowMadeOutput = FreThrowMadeOutput;
		//console.log(FreThrowMadeOutput);
		feilGolPrctOutputRaw = (element.feilGolPrct - feilGolPrctRankingsWorst)/(feilGolPrctRankingsBest - feilGolPrctRankingsWorst);
		feilGolPrctOutput = feilGolPrctOutputRaw * feilGolPrctWeight;
		//element.feilGolPrctOutput = feilGolPrctOutput;
		//console.log(feilGolPrctOutput);
		rebMarOutputRaw = (element.rebMar - rebMarRankingsWorst)/(rebMarRankingsBest - rebMarRankingsWorst);
		rebMarOutput = rebMarOutputRaw * rebMarWeight;
		//element.rebMarOutput = rebMarOutput;
		//console.log(rebMarOutput);
		trnOvrMarOutputRaw = (element.trnOvrMar - trnOvrMarRankingsWorst)/(trnOvrMarRankingsBest - trnOvrMarRankingsWorst);
		trnOvrMarOutput = trnOvrMarOutputRaw * trnOvrMarWeight;
		//element.trnOvrMarOutput = trnOvrMarOutput;
		element.totalOutput = FreThrowMadeOutput + feilGolPrctOutput + rebMarOutput + trnOvrMarOutput;
	});
	//console.log(obj);
	storeList = obj;
	storeList.sort(function (a,b){
		if (a.totalOutput > b.totalOutput) {
  			//console.log("a is greater than b");
    		return -1;
  		}
  		if (a.totalOutput < b.totalOutput) {
  			//console.log("b is greater than a");
    		return 1;
 		}
  		// a must be equal to b
  		console.log("a and b are equal");
  		return 0;
	})
	console.log(storeList);
};


store.load('1', function(err, object){
	idNum = object;
	var idNumNum = object.data;
	console.log("current id status: " + JSON.stringify(object));
	var populateRankingsId = idNumNum + 1
	populateRankings(function(){
		sortRankings(function(){
			//console.log(storeList);
			calculateScore(storeList);
		});
	});
	//calculateScore();
	if(err) throw err;
});

app.get('/teamdata', function(req,res){
	console.log("incoming request for teamdata");
	res.type('json');
	res.end(JSON.stringify(storeList));
});

app.get('/ajax', function(req, res){
	console.log("incoming id request");
	console.log(JSON.stringify(idNum));
	res.type('json');
	res.end(JSON.stringify(idNum));
});

app.post('/log', function(req, res){
	console.log(req.body.FreThrowMade + " " + req.body.feilGolPrct + " " + req.body.rebMar + " " + req.body.trnOvrMar + " "+ req.body.name + " " + req.body.id);
	res.json(200, {status: "success"});
	var teamData = new team(req.body.FreThrowMade, req.body.feilGolPrct, req.body.rebMar, req.body.trnOvrMar, req.body.id, req.body.name);
	console.log(teamData.name);
	var newId = {
		id: 1,
		data: req.body.id
	}
	store.add(teamData, function(err){
		if(err) throw err;
	});
	store.add(newId, function(err){
		if(err) throw err;
	});

});


app.use('/api', router);
app.use(express.static(__dirname + '/public'));

var server = app.listen(8080, function(){
	console.log('server running on 8080');
});
