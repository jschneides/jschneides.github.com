var image = "mbta_red_100.png";
function initialize() {
	mapOptions = {
          center: new google.maps.LatLng(42.360996,-71.075478),
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    get_location();
}
function get_location() {
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(make_marker("Current Location"));
    	
	}
}


function make_marker(position, str) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	var mylatlng = new google.maps.LatLng(lat,lng);
	location = new google.maps.Marker({
		position: mylatlng,
		map: map,
		title: str,
		icon: image
	});
}

/*function make_window(position) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	var mylatlng = new google.maps.LatLng(lat,lng);
	var infowindow = new google.maps.InfoWindow({
		content: "I am here at " + lat + ", " + lng
	}); 
	infowindow.open(map, location);
}*/
