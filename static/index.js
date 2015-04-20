var unit_system = $('input[name=unitOptions]:checked', '#globalOpts').val();

var direction = $('input[name=dirOptions]:checked', '#globalOpts').val();

$("#useUserElev").prop('checked', false);
var useUserElev = $("#useUserElev").prop("checked");
var userElev = $("#userElev").val();
var shiftedElev = 0.0;

// update the variables when the controls are changed
$('#globalOpts input').on('change', function() {
  unit_system = $('input[name=unitOptions]:checked', '#globalOpts').val();
  direction = $('input[name=dirOptions]:checked', '#globalOpts').val();
  useUserElev = $("#useUserElev").prop("checked");
});

// Control the user-specified elevation boxes
$("#useUserElev").on('change', function() {
  useUserElev = $("#useUserElev").prop("checked");
  if (useUserElev == true){
    $("#userZentry").removeClass("hidden");
    $("#manShiftedElev").removeClass("hidden");
  }
  else if (useUserElev == false){
    $("#userZentry").addClass("hidden");
    $("#manShiftedElev").addClass("hidden");
  }
});

$(function() {
$('a#calculate').bind('click', function() {
  $.getJSON('/_get_diff', {
    lon: $("#lonbox").val(),
    lat: $("#latobx").val()
  }, function(data) {
    var transform = 0.0;
    if (unit_system == 'm'){
      transform = data.result/1000;
    }
    else if (unit_system == 'ft'){
      transform = data.result/304.8;
    }
    transform = transform * direction;
    
    if (useUserElev == true){
      userElev = $("#userElev").val();
      shiftedElev = transform + Number(userElev);
      $("#shiftedElev").text(shiftedElev.toFixed(3));
    }
    
    $("#result").text(transform.toFixed(3));
    $(".manUnits").text(unit_system);
  });
  return false;
});
});





var map = L.map('mapContainer').setView([47.65, -122.4], 11);


L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(map);

var popup = L.popup();
function onMapClick(e) {
    var transform = 0.0;
    
    $.getJSON('/_get_diff', {
      lon: e.latlng.lng,
      lat: e.latlng.lat
      }, function(data) {
        
        
        if (unit_system == 'm'){
          transform = data.result/1000;
        }
        else if (unit_system == 'ft'){
          transform = data.result/304.8;
        }
        transform = transform * direction;
    
        if (useUserElev == true){
          console.log("toot")
          userElev = $("#userElev").val();
          shiftedElev = transform + Number(userElev);
        
        popup
          .setLatLng(e.latlng)
		      .setContent("<p>Latitude: " + e.latlng.lat + "</br>" +
		                  "Longitude: " + e.latlng.lng + "</br>" +
		                  "Datum shift: " + transform.toFixed(3) + " " + unit_system + "</br>" +
		                  "Adjusted elevation: " + shiftedElev.toFixed(3) + " " + unit_system
		                  )
		      .openOn(map);
        }
        
        else {
          popup
          .setLatLng(e.latlng)
		      .setContent("<p>Latitude: " + e.latlng.lat + "</br>" +
		                  "Longitude: " + e.latlng.lng + "</br>" +
	                    "Datum shift: " + transform.toFixed(3) + " " + unit_system + "</br>"
		                  )
		      .openOn(map);
        }
    });
	}

map.on('click', onMapClick);