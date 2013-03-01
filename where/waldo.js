var image = "mbta_red_100.png";
function initialize() {
	mapOptions = {
          center: new google.maps.LatLng(42.360996,-71.075478),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    get_location();
}
function get_location() {
	console.log("test1");
	if (navigator.geolocation) {
		console.log("test2");
    	navigator.geolocation.getCurrentPosition(make_marker);
	}
}


function make_marker(position) {
		console.log("test3");
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	var mylatlng = new google.maps.LatLng(lat,lng);
	var location = new google.maps.Marker({
		position: mylatlng,
		map: map,
		title: "Current Location"
		icon: image
	});
}
