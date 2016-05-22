
$(document).ready(function(){

	var title, finalURL;
    var apiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=?';
    var urlRandom = "https://en.wikipedia.org/wiki/Special:Random";
	

	function click(){
		title = document.getElementById('wiki').value;
		finalURL = apiURL + title + cb;
		retrieve();
	}

	
	function retrieve(){
		var arrayTitle = [];
		var arrayDesc = [];
		var arrayID = [];
		$.getJSON(finalURL, function(json){
			console.log(json);
			$.each(json.query.pages, function(index, item) {
				arrayTitle.push(item.title);
				arrayDesc.push(item.extract);
				arrayID.push(item.pageid);
			});	
			console.log(arrayID);
			$('li').each(function(x){
				var url = "http://en.wikipedia.org/?curid=" + arrayID[x];
				$(this).html("<a href='"+url+"' target='_blank'>" + "<h1>" + arrayTitle[x] + "</h1>" + arrayDesc[x]);
				
			});
			
		});
		
	}

	$("#getWiki").on("click", function(){
		click();
	});

	$("#lucky").click(function(){
		window.location.href=urlRandom;
	});

});