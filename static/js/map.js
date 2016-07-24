function findLocation( selector, getLatitude, getLongitude ) {
								jQuery(selector).gMap('addMarker', {
									latitude: getLatitude,
									longitude: getLongitude,
									content: 'You have selected this Location.',
									popup: true
								}).gMap('centerAt', {
									latitude: getLatitude,
									longitude: getLongitude,
									zoom: 12
								});
							}

							jQuery('#google-map').gMap({

								 address: 'Melbourne, Australia',
								 maptype: 'ROADMAP',
								 zoom: 12,
								 markers: [
									{
										address: "Melbourne, Australia"
									}
								 ],
								 doubleclickzoom: false,
								 controls: {
									 panControl: true,
									 zoomControl: true,
									 mapTypeControl: true,
									 scaleControl: false,
									 streetViewControl: false,
									 overviewMapControl: false
								 }

							});

							jQuery(window).load( function(){

								var t = setTimeout( function(){
									if(navigator.geolocation) {
										navigator.geolocation.getCurrentPosition(function(position) {
											jQuery('#google-map').gMap('addMarker', {
												latitude: position.coords.latitude,
												longitude: position.coords.longitude,
												content: 'You are here!',
												popup: true
											}).gMap('centerAt', {
												latitude: position.coords.latitude,
												longitude: position.coords.longitude,
												zoom: 14
											});
										}, function() {
											alert('Couldn\'t find you :(');
										});
									}
								}, 200 );

							});

							jQuery('#location-submit').click( function(e){

								var locationFinder = jQuery(this).parent().parent().find('#location-input').val();
								var locationFinderIcon = jQuery(this).parent().parent().find('.input-group-addon').find('i');

								jQuery('#location-coordinates').fadeOut();

								if( locationFinder != '' ){
									locationFinderIcon.removeClass('icon-map-marker').addClass('icon-line-loader icon-spin');

									jQuery.ajax({
										url: 'http://maps.google.com/maps/api/geocode/json?address=' + encodeURI(locationFinder),
										//force to handle it as text
										dataType: "text",
										success: function(data) {
											var json = jQuery.parseJSON(data);
											findLocation( '#google-map', json.results[0].geometry.location.lat, json.results[0].geometry.location.lng );
											jQuery('#latitude-text').html('<strong>Latitude:</strong> ' + json.results[0].geometry.location.lat);
											jQuery('#longitude-text').html('<strong>Longitude:</strong> ' + json.results[0].geometry.location.lng);
											jQuery('#location-coordinates').fadeIn();
											locationFinderIcon.removeClass('icon-line-loader icon-spin').addClass('icon-map-marker');
										}
									});
								} else {
									alert('Please enter your Location!');
								}

								e.preventDefault();

							});