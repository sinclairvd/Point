// Point Youth script

function newsFeed(data){
	//debug console.log(data);
	var output='<ul data-role="listview" data-filter="true">';	
	$.each(data.posts,function(key,val){

		var tempDiv = document.createElement("tempDiv");
		tempDiv.innerHTML = val.excerpt;
		$("a",tempDiv).remove();
		var excerpt = tempDiv.innerHTML;

		output += '<li>';
		output += '<a href="#news" onclick="newsItem(' + val.id +')">';
		output += '<h2>' + val.title + '</h2>';		
		output += (val.thumbnail)?
			'<img src="' + val.thumbnail + '" alt="' + val.title +'" />':
			'<img src="images/makeapoint.png" alt="POiNT! Logo" />';
		output += '<p>' + excerpt + '</p>';
		output += '</a>';
		output += '</li>';
	}); // go through each post
	output+='</ul>';
	$('#newsfeed').html(output);
} // list all the posts

function newsItem(id){
	$.getJSON('http://www.theblessing.nl/PWYM/?json=get_post&post_id=' + id + '&callback=?',
		function(data){
			var output='';
			output += '<h2>' + data.post.title + '</h2>';
			output += data.post.content;
			$('#newsitem').html(output);
	});	// get JSON Data for News Items
} // newsItem

function mapVideos(data){
		//debug console.log(data);
		
		var output = '';
		for (var i=0; i<data.feed.entry.length; i++){
				var title = data.feed.entry[i].title.$t;
				var thumbnail = data.feed.entry[i].media$group.media$thumbnail[1].url;
				var description = data.feed.entry[i].media$group.media$description.$t;
				var id = data.feed.entry[i].id.$t.substr(38);
				
				// edited by Francis 20130415 turn  this code on to use two column design
				//var blocktype = ((i % 2)===1) ? 'b': 'a';				
				//output += '<div class="ui-block-' + blocktype + '">';
				
				output += '<div>';
				
				output += '<a href="#videoplayer" data-transition="fade" onclick="playVideo(\'' + id + '\',\'' + title + '\',\'' + escape(description) + '\' )">';
				output += '<h3 class="movietitle">' + title + '</h3>';
				output += '<img src="' + thumbnail + '" alt="' + title +'" />';
				output += '</a>';
				output += '</div>';
		}
				
		$('#videolist').html(output);
}

function playVideo(id, title, description){
	var output = '<iframe src="http://www.youtube.com/embed/' + id + '?wmode=transparent&amp;HD=0&amp;showinfo=0&amp;controls=1&amp;autoplay=1&amp;" frameborder="0" allowfullscreen></iframe>';
	//this code show metadata, but when orientation is changed of phone, this is not desirable
	//output += '<h3>' + title + '</h3>';
	//output += '<p>' + unescape(description) + '</p>';
	$('#myplayer').html(output);
}

function studyFeed(data){
	console.log(data);
	var output='<ul data-role="listview" data-filter="true">';	
	$.each(data.posts,function(key,val){

		var tempDiv = document.createElement("tempDiv");
		tempDiv.innerHTML = val.excerpt;
		$("a",tempDiv).remove();
		var excerpt = tempDiv.innerHTML;

		output += '<li>';
		output += '<a href="#studypost" onclick="studyItem(' + val.id +')">';
		output += '<h2 style="text-align:left;">' + val.title + '</h2>';		
		/* excluded by alissa 10/04/13 output += (val.thumbnail)?
			'<img src="' + val.thumbnail + '" alt="' + val.title +'" />':
			'<img src="images/makeapoint.png" alt="POiNT! Logo" />'; */
		output += '<p>' + excerpt + '</p>';
		output += '</a>';
		output += '</li>';
	}); // go through each post
	output+='</ul>';
	$('#studyfeed').html(output);
} // list all the posts

function studyItem(id){
	$.getJSON('http://www.theblessing.nl/PWYM/?json=get_post&post_id=' + id + '&callback=?',
		function(data){
			var output='';
			output += '<h2>' + data.post.title + '</h2>';
			output += data.post.content;
			$('#studyitem').html(output);
	});	// get JSON Data for Study Item
} // studyItem

// will get the current position and show the map, when PhoneGap is ready to use in onDeviceReady()
function onDeviceReady(){
    getPosition();
}

// get current position and show map
function getPosition(){ 
    var geoOptions = { enableHighAccuracy: true, timeout: 10000 };
    navigator.geolocation.getCurrentPosition(function(position){ // geoSuccess
	
        // we have the position
		var geolocation = $('#geolocation');
		geolocation.html('<table></table>');
 
		var table = geolocation.find('table');
		if(position.coords.latitude)
    		table.append('<tr><th>Latitude</th><td>' + position.coords.latitude + '</td></tr>');
		if(position.coords.longitude)
		    table.append('<tr><th>Longitude</th><td>' + position.coords.longitude + '</td></tr>');
		if(position.coords.altitude)
		    table.append('<tr><th>Altitude</th><td>' + position.coords.altitude + '</td></tr>');
		if(position.coords.accuracy)
		    table.append('<tr><th>Accuracy</th><td>' + position.coords.accuracy + '</td></tr>');
		if(position.coords.altitudeAccuracy)
		    table.append('<tr><th>Altitude Accuracy</th><td>' + position.coords.altitudeAccuracy + '</td></tr>');
		if(position.coords.heading)
		    table.append('<tr><th>Heading</th><td>' + position.coords.heading + '</td></tr>');
		if(position.coords.speed)
		    table.append('<tr><th>Speed</th><td>' + position.coords.speed + '</td></tr>');
		if(position.coords.timestamp)
		    table.append('<tr><th>Timestamp</th><td>' + new Date(position.timestamp) + '</td></tr>');
			
		/* show position on map */
		var map_canvas = $('#map_canvas'); 
		map_canvas.gmap(
		    {'center' : position.coords.latitude + ',' + position.coords.longitude,
		    'zoom' : 12,
		    'disableDefaultUI':true,
		    'callback':function(){
	        var self = this;
	        var marker = self.addMarker({ 'position' : this.get('map').getCenter() });
	        marker.click(function(){
	            self.openInfoWindow({ 'content' : 'This is your current location' }, this);
    	    });
	    }   
});     
	
	}, function(error){ // geoError
        navigator.notification.alert('error: ' + error.message + '\n' + 'code: ' + error.code);
    }, geoOptions);
}

//randomCity function
function randomCity(selectedCountry){
	//debug alert("hello");
	//declare country variable
	var country = selectedCountry;
  
	//declare amount of cities to lookup
	var cityCount = 500;
  	
	//declare en set random number between 1-100 for selecting random item in city array
  	var randomNumber = Math.floor(Math.random() * cityCount);
  
  	//declare and set city longtitude and latitude to default (JMWZ)
  	var defaultCoordinates = '52.070511,4.28381';
  	var lookupCoordinates = defaultCoordinates;
  
  	//for each selected value in country
  	//debug var test = 'http://api.geonames.org/searchJSON?&country=' + city +'&maxRows=' + cityCount + '&username=pointyouth';
	//debug alert('stad ' + test);
	//get JSON Data with list of city in given country	  		
	$.getJSON('http://api.geonames.org/searchJSON?&country=' + country +'&maxRows=' + cityCount + '&username=pointyouth',
	function(data){	
		//alter cityCount when the returned cityCount is lower then declared
		if (data.totalResultsCount == 0){
			$('#city').html('<h2>Sorry no random city available</h2>');	
			return;
		}
		else if (data.totalResultsCount < cityCount){
			cityCount = data.totalResultsCount;	
		}			
				
		//to filter out only cities in JSON result, we lookup another randomNumber if not a city but a region is returned
		while(data.geonames[randomNumber].fclName != 'city, village,...'){
			randomNumber = Math.floor(Math.random() * cityCount);
		}				
				
		// output random city
		var output='';
		output += '<h2>' + data.geonames[randomNumber].toponymName + '</h2>';
				
		//declare and set city variable
		var city = data.geonames[randomNumber].toponymName;	
				
		//debug output += cityCount;			
		$('#city').html("<p>Your Vision 20:20 Random city is:</p>" + output);
				
		//update lookupCoordinates with longtitude and latitude of returned city 
		lookupCoordinates = data.geonames[randomNumber].lat + "," + data.geonames[randomNumber].lng;
		//alert(lookupCoordinates);
		//return;
				
		//clean out earlier maps
		$('#map_canvas').gmap('destroy');
		
		//declare marker icon url
		var image = 'flag.png';
		
		//declare and set infowindow content
		var infowindowContent = '<p class="infowindow">Your Vision 20:20 Random place!<br /><b>' + city +'</b></p>';
		
		//draw google maps api							
		$('#map_canvas').gmap({'zoom':8, 'center':lookupCoordinates}).bind('init', function(ev, map) {
			$('#map_canvas').gmap('addMarker', {'position': lookupCoordinates, 'bounds': false,'animation':google.maps.Animation.BOUNCE,'icon':image}).click(function() {
						$('#map_canvas').gmap('openInfoWindow', {'content': infowindowContent}, this);
						});
					});
		});	  
	}

var formData = {};
var selectedCountry = "";

function handleV2020RandomForm(e) {
        var next = "";
		alert("7");
        
        //gather the fields
        var data = $(this).serializeArray();
		//debug console.log("test");
		//debug console.log(data);
        //store them - assumes unique names
        for(var i=0; i<data.length; i++) {
            //If nextStep, it's our metadata, don't store it in formdata
            if(data[i].name=="nextStep") { next=data[i].value; continue; }
			//if country, store it globally for later use with gmaps
			if (data[i].name=="country"){selectedCountry=data[i].value;}
            //if we have it, add it to a list. This is not "comma" safe.
            if(formData.hasOwnProperty(data[i].name)) formData[data[i].name] += ","+data[i].value;
            else formData[data[i].name] = data[i].value;
        }
		//debug console.log("country" + selectedCountry);

        //now - we need to go the next page...
        //if next step isn't a full url, we assume internal link
        //logic will be, if something.something, do a post
        if(next.indexOf(".") == -1) {
			//debug alert("8" + next);
            var nextPage = "#" + next;
            $.mobile.changePage(nextPage);
        } else {
			//debug alert("9");
			randomCity(selectedCountry);
            $.mobile.changePage(next, {type:"post",data:formData});
        }
		//debug alert("10");
        e.preventDefault();
    
};