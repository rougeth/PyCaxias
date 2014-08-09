$('.navbar a').on('click', function() {
     $('nav li.active').removeClass('active');
     $(this).parent().addClass('active');
     var location_anchor = $(this).attr('href');
     $('html, body').animate({
      scrollTop: $(location_anchor).offset().top
      }, 1000);
});

$('#footer-menu li a').on('click', function() {
     $('nav li.active').removeClass('active');
     $(this).parent().addClass('active');
     var location_anchor = $(this).attr('href');
     $('html, body').animate({
      scrollTop: $(location_anchor).offset().top
      }, 1000);
});

//map
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var ftec = new google.maps.LatLng(-29.173913, -51.218490);
directionsDisplay = new google.maps.DirectionsRenderer();
var mapOptions = {
  zoom:15,
  center: ftec,
  streetViewControl: false,
  panControl: true,
  overviewMapControl: true,
  zoomControl: true,
  scaleControl: true
}
map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);
directionsDisplay.setPanel(document.getElementById('directions-panel'));
var marker = new google.maps.Marker({
              position: ftec,
              map: map,
              title:"FTEC Caxias do Sul"
});

function calcRoute(starte) {
  var start = document.getElementById("search-route").value;
  if(starte != undefined) {
    start = starte;
  }
  var end = ftec;
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    directionsDisplay.setDirections(response);
  }
  });
}

if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(function(position) {

        var point = new google.maps.LatLng(position.coords.latitude, 
                                    position.coords.longitude);
        calcRoute(point);
    });
}


autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('search-route')),
    { types: ['geocode'] });
// When the user selects an address from the dropdown,
// populate the address fields in the form.
google.maps.event.addListener(autocomplete, 'place_changed', function() {
  calcRoute();
});


document.getElementById("search-route").addEventListener("keypress", function(e){
    if (e.keyCode == 13) {
        calcRoute(); 
        return false;
    }
});