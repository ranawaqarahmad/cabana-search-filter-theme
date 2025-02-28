// Define the callback function to initialize the map
function initializeMap() {
    // Geocode the address
    var mapElement = document.getElementById('mapinit');
    if (mapElement) {
      var targetAddress = mapElement.dataset.mapAddress;
      var grayScale = mapElement.dataset.grayscale;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': targetAddress }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          // Get the location coordinates
          var location = results[0].geometry.location;
          // Create the map centered on the location 
          var mapOptions = {
            zoom: 14,
            center: location,
            mapTypeControl: true,
            styles: [
              {
                stylers: [
                  { saturation: grayScale }
                ]
              }
            ],
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            navigationControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(mapElement, mapOptions);
          // Add a marker at the location
          var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: targetAddress
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
  
  // Load the Google Maps API asynchronously
  function loadMapsAPI() {
    var mapElement = document.getElementById('mapinit');
    var mapApiKey = mapElement.dataset.mapKey;
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + mapApiKey + '&libraries=places&callback=initializeMap';
    document.body.appendChild(script);
  }
  // Call the function to load the API
  loadMapsAPI();
  