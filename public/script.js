var id = '';

$(function(){
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/ajax",
		success: function(response){
			console.log("connected");
			console.log(JSON.stringify(response));
			id = response.data
		}
	});
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/teamdata",
		success: function(response){
			console.log("connected2");
			console.log(JSON.stringify(response));
			for (var i = 0; i < id + 1; i++){
				console.log(i);
				console.log('==');
				console.log(id);
				var appendedTeam = response[i];
				console.log(JSON.stringify(appendedTeam["name"]))
				$('.table').append('<tr>'+ '<td>' + (i + 1) + '</td>' + '<td>' + JSON.stringify(appendedTeam["name"]) + '</td>' + '<td>' + JSON.stringify(appendedTeam["FreThrowMade"]) + '</td>' + '<td>' + JSON.stringify(appendedTeam["feilGolPrct"]) + '</td>' + '<td>' + JSON.stringify(appendedTeam["rebMar"]) + '</td>' + '<td>' + JSON.stringify(appendedTeam["trnOvrMar"]) + '</td>' + '</tr>');
			}
		}
	});
});

$('.load').click(function(){
	console.log("button works!");
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/teamdata",
		success: function(response){
			console.log("connected2");
			console.log(JSON.stringify(response));
			for (var i = 1; i < id + 1; i++){
				console.log(i);
				console.log('==');
				console.log(id);
				var appendedTeam = response[i];
				console.log(JSON.stringify(appendedTeam["name"]))
				$('.table').append('<tr>'+ '<td>' + JSON.stringify(appendedTeam["name"]) + '</td>' + '<td>' + JSON.stringify(appendedTeam["FreThrowMade"]) + '</td>' + '<td>' + JSON.stringify(appendedTeam["feilGolPrct"]) + '</td>' + '<td>' + JSON.stringify(appendedTeam["rebMar"]) + '</td>' + '<td>' + JSON.stringify(appendedTeam["trnOvrMar"]) + '</td>' + '</tr>');
			}
		}
	});	
});


var usrFreThrowMade = document.getElementById('FreThrowMade');
var usrfeilGolPrct = document.getElementById('feilGolPrct');
var usrRebMar = document.getElementById('rebMar');
var usrTrnOvrMar = document.getElementById('trnOvrMar');
var usrName = document.getElementById('name');



$('.btn').click(function(){
	id = parseInt(id) + 1;
	console.log(id);
	console.log(usrFreThrowMade.value);
	$.ajax({
		type: "POST",
		url:"log",
		contentType: "application/json",
		data: JSON.stringify({
			FreThrowMade: usrFreThrowMade.value,
			feilGolPrct: usrfeilGolPrct.value,
			rebMar: usrRebMar.value,
			trnOvrMar: usrTrnOvrMar.value,
			name: usrName.value,
			id: id
		})
	});
	console.log(JSON.stringify(id));
	console.log("button works!");
	console.log(usrName.value);
	console.log(usrFreThrowMade.value);
	console.log(usrfeilGolPrct.value);
	console.log(usrRebMar.value);
	console.log(usrTrnOvrMar.value);
});