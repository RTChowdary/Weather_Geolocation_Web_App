function initMap() {
			var map = new google.maps.Map(document.getElementById('map'), {
			  center: {lat: 12.97, lng: 77.69},
			  zoom: 6
			});
			var infoWindow = new google.maps.InfoWindow({map: map});
			
			var wdata= function(lat,lng){
				document.getElementById("latLng").innerHTML = ((parseFloat(lat,10)).toFixed(2)).toString()+', '+((parseFloat(lng,10)).toFixed(2)).toString();
				var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&APPID=7a1af7e31b2fe1864851f568a0b6bdb2';
				$.ajax({
					url: url,
					dataType: "jsonp",
					success: function(data){
						document.getElementById("temp").innerHTML = (Math.floor(parseInt(data.main.temp, 10)-273.15)).toString()+' C';
						document.getElementById("pressure").innerHTML = data.main.pressure+' hPa';
						document.getElementById("humidity").innerHTML = data.main.humidity+'%';
						document.getElementById("des").innerHTML = data.weather[0].description;
						document.getElementById("wind").innerHTML = (Math.floor((parseInt(data.wind.speed, 10))*18/5)).toString()+' kmph';
						document.getElementById("sea_level").innerHTML = data.main.sea_level+' hPa';
						document.getElementById("grnd_level").innerHTML = data.main.grnd_level+' hPa';
						document.getElementById("place").innerHTML = data.name+', '+data.sys.country;
						}
					});
			};
			
			// Try HTML5 geolocation.
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					var clat = pos.lat;
					var clng = pos.lng;
					// From showing pixel and map coordinates---------------------------------------------
					var place = new google.maps.LatLng(clat, clng);
					wdata(clat,clng);
					// Retrieve lat and long
					var marker = new google.maps.Marker({
						draggable: true,
						position: pos, 
						map: map,
					});

				    google.maps.event.addListener(marker,'dragend',function(event){
						lat = event.latLng.lat();
						lng = event.latLng.lng();
						wdata(lat,lng);
						});
					// Retrieve lat and long
					
				map.setCenter(pos);
			  }, function() {
				handleLocationError(true, infoWindow, map.getCenter());
			  });
			} else {
			  // Browser doesn't support Geolocation
			  handleLocationError(false, infoWindow, map.getCenter());
			}
		}
		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			infoWindow.setPosition(pos);
			infoWindow.setContent(browserHasGeolocation ?
								  'Error: The Geolocation service failed.' :
								  'Error: Your browser doesn\'t support geolocation.');
		}
