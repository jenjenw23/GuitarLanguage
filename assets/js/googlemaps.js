
    var map;
      var infowindow;

      function initMap() {
        var evanston = {lat: 42.056901, lng: -87.676553};

        map = new google.maps.Map(document.getElementById('map'), {
          center: evanston,
          zoom: 12
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: evanston,
          radius: 4828,
          //type: ['store'],
		  keyword: ['music instruments']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        var request = { reference: place.reference };
	   	var service = new google.maps.places.PlacesService(map);

			service.getDetails(request, function(place, status) {
      		google.maps.event.addListener(marker, 'click', function() {
        	infowindow.setContent("<div><strong>" + place.name + "</strong><br>" + place.formatted_address +"<br />" + place.formatted_phone_number);
        	infowindow.open(map, this);
      		});
   		 });
      }
