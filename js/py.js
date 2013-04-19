// Point Youth script

function newsFeed(data){
	//debug console.log(data);
	var output='<ul data-role="listview">';	
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
			'<img src="images/default/makeapoint.png" alt="POiNT! Logo" />';
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
			//console.log(data);
			var output='';
			output += '<h2>' + data.post.title + '</h2>';
		
			var temp = data.post.content;
			console.log("test " + temp);
			//$('<div>').html(temp).find('a').replaceWith("test");
			
			
			//var temp = document.createElement("temp");
			//temp.innerHTML = data.post.content;			
			//temp.get.replaceWith("a target='_self'");
			//$("a",temp).change(function(){
			//	console.log("debug " + this.text());	
			//});
			//output += temp.innerHTML;
			
			output += data.post.content;
			
			$('#newsitem').html(output);
	});	// get JSON Data for News Items
} // newsItem

function mapVideos(){		
		$.getJSON('http://gdata.youtube.com/feeds/users/makeapointband/uploads?alt=json&max-results=30',
		function(data){
			//console.log(data);
			var output = '';
			for (var i=0; i<data.feed.entry.length; i++){
					var title = data.feed.entry[i].title.$t;
					var thumbnail = data.feed.entry[i].media$group.media$thumbnail[0].url;
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
		});	// get JSON Data for MAP videos	
}

function playVideo(id, title, description){		
	player.loadVideoById(id);
	
}

//function will be called when Youtube Iframe Player API async is done loading
function onYouTubePlayerAPIReady() {
	 player = new YT.Player('ytplayer', {  
		 width:'100%',		 	  
		 videoId: 'KBXqTv-sKd8'
    });
}

function studyFeed(){	
	$.getJSON('http://www.theblessing.nl/PWYM/?json=get_category_posts&id=17&callback=?',
		function(data){
			//debug console.log(data);
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
		});	// get JSON Data for Study Item
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

function studyFeed_eng(){	
	$.getJSON('http://www.theblessing.nl/PWYM/?json=get_category_posts&id=19&callback=?',
		function(data){
			//debug console.log(data);
			var output='<ul data-role="listview" data-filter="true">';	
			$.each(data.posts,function(key,val){
		
				var tempDiv = document.createElement("tempDiv");
				tempDiv.innerHTML = val.excerpt;
				$("a",tempDiv).remove();
				var excerpt = tempDiv.innerHTML;
		
				output += '<li>';
				output += '<a href="#studypost_eng" onclick="studyItem_eng(' + val.id +')">';
				output += '<h2 style="text-align:left;">' + val.title + '</h2>';		
				/* excluded by alissa 10/04/13 output += (val.thumbnail)?
					'<img src="' + val.thumbnail + '" alt="' + val.title +'" />':
					'<img src="images/makeapoint.png" alt="POiNT! Logo" />'; */
				output += '<p>' + excerpt + '</p>';
				output += '</a>';
				output += '</li>';
			}); // go through each post
			output+='</ul>';
			$('#studyfeed_eng').html(output);
		});	// get JSON Data for Study Item
} // list all the posts

function studyItem_eng(id){
	$.getJSON('http://www.theblessing.nl/PWYM/?json=get_post&post_id=' + id + '&callback=?',
		function(data){
			var output='';
			output += '<h2>' + data.post.title + '</h2>';
			output += data.post.content;
			$('#studyitem_eng').html(output);
	});	// get JSON Data for Study Item
} // studyItem_eng

var a = "Amsterdam";
var formData = {};
var selectedCountry = "";


function handleV2020RandomForm(e) {
        var next = "";
		//alert("handle v2020 random form");
		//trigger form validation with jquery validation plugin
        $(this).validate();	
		
        //gather the fields
        var data = $(this).serializeArray();
		
		//debug console.log("test");
		//debug console.log(data);
        //store them - assumes unique names
        for(var i=0; i<data.length; i++) {
            //If nextStep, it's our metadata, don't store it in formdata
            if(data[i].name=="nextStep") { next=data[i].value; continue; }
			//filter out submit buttons
			if(data[i].name=="submit1") { continue; }
			if(data[i].name=="submit2") { continue; }
			if(data[i].name=="submit3") { continue; }
			if(data[i].name=="submit4") { continue; }
			//if country, store it globally for later use with gmaps
			if (data[i].name=="country"){selectedCountry=data[i].value;}
            //if we have it, add it to a list. This is not "comma" safe.
            //not working with checkboxes, turned off by SJS 20130416
			//if(formData.hasOwnProperty(data[i].name)) formData[data[i].name] += ","+data[i].value;
            //else formData[data[i].name] = data[i].value;
			formData[data[i].name] = data[i].value;
        }
		//debug console.log("country" + selectedCountry);

        //now - we need to go the next page...
        //if next step isn't a full url, we assume internal link
        //logic will be, if something.something, do a post
        if(next.indexOf(".") == -1) {
			//alert("nextform is: " + next);
            var nextPage = "#" + next;
            $.mobile.changePage(nextPage);
        } else {
			//alert('no next form');
            
			var output = '';
			for (property in formData) {
  				output += property + '=' + formData[property]+'&';
			}						
			
			if ($('#map_canvas').contents().length == 0) {
				
				//alert("map canvas is empty, start randomcity");
				
				//declare country variable
				var country = selectedCountry;
	  			
				//declare amount of cities to lookup
				var cityCount = 500;
				
				//declare en set random number between 1-100 for selecting random item in city array
				var randomNumber = Math.floor(Math.random() * cityCount);
			  
				//declare and set city longtitude and latitude to default (JMWZ)
				var defaultCoordinates = '52.070511,4.28381';
				var lookupCoordinates = defaultCoordinates;
			  				
				//get JSON Data with list of city in given country	  		
				$.getJSON('http://api.geonames.org/searchJSON?&country=' + country +'&maxRows=' + cityCount + '&username=pointyouth',
					function(data){	
						//alert("json geonames call started");
						//alter cityCount when the returned cityCount is lower then declared
						if (data.totalResultsCount == 0){
							//$('#city').html('<h2>Sorry no random city available</h2>');
							//alert("no random city");	
							return;
						}
						else if (data.totalResultsCount < cityCount){
							cityCount = data.totalResultsCount;	
							//alert("less cities available");
						}
								
							
						//to filter out only cities in JSON result, we lookup another randomNumber if not a city but a region is returned
						while(data.geonames[randomNumber].fclName != 'city, village,...'){
							randomNumber = Math.floor(Math.random() * cityCount);
						}				
							
						// set random city
						var outputcity='';
						outputcity += '<h1>' + data.geonames[randomNumber].toponymName + '</h1>';
							
						//declare and set city variable			
						a = data.geonames[randomNumber].toponymName;				
						
						//add randomcity to emaildata
						output += 'city=' + a;
						
						//output random city info to page						 
						//alert("1 city is " + a);		
						//debug output += cityCount;			
						$('#city').html("<p>Your Vision 20:20 Random city is:</p>" + outputcity);
						//alert("2 city is " + a);			
						
						//update lookupCoordinates with longtitude and latitude of returned city 
						lookupCoordinates = data.geonames[randomNumber].lat + "," + data.geonames[randomNumber].lng;
							
						//clean out text and submit button
						$('#findout').hide();
						//alert("4 city is " + a);	
						//alert("hide show random city button");
						
						//clean out earlier maps
						$('#map_canvas').gmap('destroy');
						//alert("5 city is " + a);	
						
						//declare marker icon url
						var image = 'images/action/v2020flag.png';
						//alert("6 city is " + a);	
						
						//declare and set infowindow content
						var infowindowContent = '<p class="infowindow">Your Vision 20:20 Random city: ' + a +'</p>';
						//alert("7 city is " + a);	
						
						//draw google maps api							
						$('#map_canvas').gmap({'zoom':8, 'center':lookupCoordinates}).bind('init', function(ev, map) {
							$('#map_canvas').gmap('addMarker', {'position': lookupCoordinates, 'bounds': false,'animation':google.maps.Animation.BOUNCE,'icon':image}).click(function() {
								$('#map_canvas').gmap('openInfoWindow', {'content': infowindowContent}, this);
							});
						});
			
						//alert("just drawn map canvas");	  
						//alert("8 city is " + a);
						
						//alert("9 city is " + a);					
			
						$.ajax({
								type: "POST",
								url: "http://www.theblessing.nl/pointyouthapp/v2020random.php",
								//data: $("#v2020randomform").serialize(),
								//data: 'teamname=testteam&yourname=sinclair&youremail=sinclairvandalen@gmail.com&country=NL&teammember1=francis',
								data: output,
								dataType: "json",
								crossDomain:true,
					
								success: function(msg){							
									$("#notification").html(msg.message + '<br /><br /><a href="https://twitter.com/intent/tweet?status=Vision+20%3A20+Random+city%3A+' + a + '+Join+Random+city+in+POiNT+Youth+mobile+app" class="TrackSocialLink" target="_blank"><img src="http://www.maasbachradio.com/webplayer/twitter-logo.png" width="20" height="20" border="0">Share on Twitter</a>');
									//alert('json email succes: ' + msg.message);														
								},
								error: function(msg){							
									$("#notification").html(msg.message);
									//alert('json email error');
								}
						});
						
						//alert('after ajax call');
					
				});
			}
			else{
				//alert("map canvas is NOT empty");
			}
		
			
	}
    e.preventDefault();
	//alert("just prevented default post");
    
};
