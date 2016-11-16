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
});

$('.load').click(function(){
	console.log("button works!");
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/teamdata",
		success: function(response){
			console.log("connected2");
			console.log(JSON.stringify(response));
			for(var key in response){
				console.log(response.keys(response)[key]);
				
			}
		}
	});	
});


var usrScrMar = document.getElementById('scrMar');
var usrThreePntPrct = document.getElementById('threePntPrct');
var usrRebMar = document.getElementById('rebMar');
var usrTrnOvrMar = document.getElementById('trnOvrMar');
var usrName = document.getElementById('name');



$('.btn').click(function(){
	id = parseInt(id) + 1;
	console.log(id);
	$.ajax({
		type: "POST",
		url:"log",
		contentType: "application/json",
		data: JSON.stringify({
			scrMar: usrScrMar.value,
			threePntPrct: usrThreePntPrct.value,
			rebMar: usrRebMar.value,
			trnOvrMar: usrTrnOvrMar.value,
			name: usrName.value,
			id: id
		})
	})
	console.log(JSON.stringify(id));
	console.log("button works!");
	console.log(usrName.value);
	console.log(usrScrMar.value);
	console.log(usrRank.value);
	console.log(usrRebMar.value);
	console.log(usrTrnOvrMar.value);
});