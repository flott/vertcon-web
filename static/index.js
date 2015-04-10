// console.log("toot toot")
var map = L.map('mapContainer').setView([47.65, -122.4], 11);


L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(map);

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
		.setContent(e.latlng.toString())
		.openOn(map);
	
	var latbox = document.getElementById('latbox');
	var lonbox = document.getElementById('lonbox');
	latbox.value = e.latlng.lat;
	lonbox.value = e.latlng.lng;
	}

map.on('click', onMapClick);