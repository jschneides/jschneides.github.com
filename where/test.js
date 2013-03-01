function getMyLocation() {
        lat = -99999;
        lng = -99999;
        console.log("hi");
        if (navigator.geolocation) {
            // the navigator.geolocation object is supported on your browser
            navigator.geolocation.getCurrentPosition(function(position) {
            console.log("hi");
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                elem = document.getElementById("map_canvas");
                elem.innerHTML = "<h1>You are in " + lat + ", " + lng + "</h1>";
            });
        }
        else {
            alert("Geolocation is not supported by your web browser.  What a shame!");
        }
    }