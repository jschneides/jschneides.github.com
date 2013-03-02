var image = "mbta_red_100.png";
t_coords = new Object;
t_coords = [{'stop':'Alewife Station', 'nkey':'RALEN', 'skey':'', 'lat':42.395428, 'lng':-71.142483}, {'stop':'Davis Station','nkey':'RDAVN', 'skey':'RDAVS', 'lat':42.39674, 'lng':-71.121815}, {'stop':'Porter Square Station','nkey':'RPORN', 'skey':'RPORS', 'lat':42.3884, 'lng':-71.119149}, {'stop':'Harvard Square Station', 'nkey':'RHARN', 'skey':'RHARS', 'lat':42.373362, 'lng':-71.118956}, {'stop':'Central Square Station', 'nkey':'RCENN', 'skey':'RCENS', 'lat':42.365486, 'lng':-71.103802}, {'stop':'Kendall/MIT Station','nkey':'RKENN', 'skey':'RKENS', 'lat':42.36249079, 'lng':-71.08617653}, {'stop':'Charles/MGH Station','nkey':'RMGHN', 'skey':'RMGHS', 'lat':42.361166, 'lng':-71.070628}, {'stop':'Park St. Station', 'nkey':'RPRKN', 'skey':'RPRKS', 'lat':42.35639457, 'lng':-71.0624242},  {'stop':'Downtown Crossing Station','nkey':'RDTCN', 'skey':'RDTCS', 'lat':42.355518, 'lng':-71.060225}, {'stop':'South Station','nkey':'RSOUN', 'skey':'RSOUS', 'lat':42.352271, 'lng':-71.055242}, {'stop':'Broadway Station','nkey':'RBRON', 'skey':'RBROS', 'lat':42.342622, 'lng':-71.056967}, {'stop':'Andrew Station','nkey':'RANDN', 'skey':'RANDS', 'lat':42.330154, 'lng':-71.057655}, {'stop':'JFK/UMass Station','nkey':'RJFKN', 'skey':'RJFKS', 'lat':42.320685, 'lng':-71.052391}, {'stop':'Savin Hill Station', 'nkey':'RSAVN', 'skey':'RSAVS', 'lat':42.31129, 'lng':-71.053331}, {'stop':'Fields Corner Station','nkey':'RFIEN', 'skey':'RFIES', 'lat':42.300093, 'lng':-71.061667}, {'stop':'Shawmut Station','nkey':'RSHAN', 'skey':'RSHAS', 'lat':42.29312583, 'lng':-71.06573796}, {'stop':'Ashmont Station','nkey':'', 'skey':'RASHS', 'lat':42.284652, 'lng':-71.064489}, {'stop':'North Quincy Station','nkey':'RNQUN', 'skey':'RNQUS', 'lat':42.275275, 'lng':-71.029583}, {'stop':'Wollaston Station','nkey':'RWOLN', 'skey':'RWOLS', 'lat':42.2665139, 'lng':-71.0203369}, {'stop':'Quincy Center Station','nkey':'RQUCN', 'skey':'RQUCS', 'lat':42.251809, 'lng':-71.005409}, {'stop':'Quincy Adams Station','nkey':'RQUAN', 'skey':'RQUAS', 'lat':42.233391, 'lng':-71.007153}, {'stop':'Braintree Station','nkey':'', 'skey':'RBRAS', 'lat':42.2078543, 'lng':-71.0011385}, ]
request = new XMLHttpRequest();
var infowindow = new google.maps.InfoWindow;

function get_train_data() {
	request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
	request.send(null);
	request.onreadystatechange = callback;
}
function callback() {
	if (request.readyState == 4 && request.status == 200) {
		train_data = JSON.parse(request.responseText);
		init_stops();
	}
}
function initialize() {
	mapOptions = {
          center: new google.maps.LatLng(42.31129,-71.053331),
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    get_location();
    get_train_data();
    //init_stops();

}
function get_location() {
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(make_current_location);
	}
}


function make_current_location(position) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	var str = '<div id=myloc> <h2> You are here at '+lat+ ', ' +lng +'</h2>';
	var mylatlng = new google.maps.LatLng(lat,lng);
	var location = new google.maps.Marker({
		position: mylatlng,
		map: map,
		title: "Your Location",
	});
	var infowindow = new google.maps.InfoWindow({
		content: str
	})
	infowindow.open(map, location);
}

function init_stops() {
	for(i=0;i<t_coords.length;i++) {
		lat = t_coords[i]['lat'];
		lng = t_coords[i]['lng'];
		stop = t_coords[i]['stop'];
		latlng_marker = mark_stop(lat,lng,stop);
		make_infowindow(latlng_marker[0], latlng_marker[1]);
	}
}

function mark_stop(lat,lng,stop) {
	var arrival_info;
	var latlng = new google.maps.LatLng(lat,lng);
	var t_marker = new google.maps.Marker({
		position: latlng,
		map: map,
		title: stop,
		icon: image
	})
	return [latlng, t_marker];

}
function make_infowindow(latlng, marker) {
	var str = '<div id="content">' + 
		'<h1>' + t_coords[i]['stop'] + '</h1>' +
		'<table id="tbl">' +
		'<tr> <td> Line </td> <td> Trip # </td> <td> Direction </td> <td> Time Remaining </td></tr>'
	for(j=0; j<train_data.length; j++) {
		if ((t_coords[i]['nkey'] == train_data[j]['PlatformKey']) && (train_data[j]['InformationType'] != "Arrived")) {
			str = str + '<tr> <td> Red </td> <td>' + train_data[j]['Trip'] +  
			'</td> <td> NORTHBOUND </td> <td>' + train_data[j]['TimeRemaining'] + '</td> </tr>';
		}
		else if((t_coords[i]['skey'] == train_data[j]['PlatformKey']) && (train_data[j]['InformationType'] != "Arrived")) {
			str = str + '<tr> <td> Red </td> <td>' + train_data[j]['Trip'] +  
			'</td> <td> SOUTHBOUND </td> <td>' + train_data[j]['TimeRemaining'] + '</td> </tr>';
		}
	}

	google.maps.event.addListener(marker, 'click', function() {
  		infowindow.setContent(str);
  		infowindow.open(map,marker);
	});
}


