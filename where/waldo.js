var image = "mbta_red_100.png";
t_coords = new Object;
t_coords = [{'stop':'Alewife', 'lat':42.395428, 'lng':-71.142483}, {'stop':'Davis', 'lat':42.39674, 'lng':71.121815}, {'stop':'Porter', 'lat':42.3884, 'lng':71.119149}]
function initialize() {
	mapOptions = {
          center: new google.maps.LatLng(42.360996,-71.075478),
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    init_stops();
    get_location();
}
function get_location() {
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(make_current_location);
	}
}


function make_current_location(position) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	var mylatlng = new google.maps.LatLng(lat,lng);
	var location = new google.maps.Marker({
		position: mylatlng,
		map: map,
		title: "Your Location",
	});
	var infowindow = new google.maps.InfoWindow({
		content: "You are at " + lat + ", " + lng
	})
	infowindow.open(map, location);
	
}

function init_stops() {
	for(i=0;i<3;i++) {
		lat = t_coords[i]['lat'];
		lng = t_coords[i]['lng'];
		stop = t_coords[i]['stop'];
		mark_stop(lat,lng,stop);
	}
}

function mark_stop(lat,lng,stop) {
	console.log(lat);
	var latlng = new google.maps.LatLng(lat,lng);
	var location = new google.maps.Marker({
		position: latlng,
		map: map,
		icon: image
	})
}


