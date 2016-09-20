	//token de acceso a mapbox
	accessToken = L.mapbox.accessToken = 'pk.eyJ1IjoiaXNhYWNhdmlsYSIsImEiOiJjaXNoejAwMXowMDBvMnBud3FsOWFjZWl1In0.LJhyNscjlcr_ZONnc_BP_Q';

	//marker para el geocode
	var marker = null;
	//el mapa principal
	var map;
	//array con ID de las rutas para identificacion de layers y colours
	rutasID = [ '1', '10', '11', '13', '13_a', '14', '15', '17', '19',
							 '20', '21', '22', '24', '24_a', '27_a','28', '29', '3', 
							 '4', '5', '7', '9', '9_a', 'a', 'b', 'cardona' ];
	//array de colores en formato #aabbcc para cada ruta
	layerColour = ['#eec6de'/*1*/, '#4fcdc2'/*10*/, '#87b0b6'/*11*/, '#00a3cc'/*13*/, 
					 '#1ca3b5'/*13a*/, '#aeafb1'/*14*/, '#f7d300'/*15*/, '#fdc84d'/*17*/,
					 '#f2c8ac'/*19*/, '#827771'/*20*/, '#b29a76'/*21*/, '#c5cf88'/*22*/, 
					 '#c0d120'/*24*/, '#78a071'/*24a*/, '#dcdaf7'/*27a*/, '#9571a7'/*28*/,
					 '#970656'/*29*/, '#fda9b9'/*3*/, '#dd7fc8'/*4*/, '#fb6c85'/*5*/,
					 '#e0377a'/*7*/, '#a6eee0'/*9*/, '#86aed2'/*9a*/, '#ca3b55'/*a*/,
					 '#d37a7d'/*b*/, '#f05235'/*cardona*/
					 ];
	//array para geojsons					 
	var jsons = [];
	
	//rutas: objeto que guarda cada layer en una propiedad con el 
	//nombre ruouteStr
	var rutas = {};

//variable geocoder para conversion

//funcion principal, carga el mapa y sirve como funcion callback
//para las solicitudes a la JS API de google maps
function initMap(){
	//var map es el mapa principal
	map = L.mapbox.map('map', 'mapbox.streets').setView([19.2499700, -103.7271400], 13);
	//featureLayer convierte cada json en la ruta geojson/* en un layer 
	//con su color correspondiente
	for (var i = 0; i < rutasID.length; i++) {
	        jsons[i] =  L.mapbox.featureLayer('geojson/ruta_'+rutasID[i]+'.geojson', {style: {color: layerColour[i]}});
	};
	//es necesario pasar un objeto con los layers por propiedades
	//el nombre de las propiedades es routeStr y su valor es json[i]
	for (var i = 0; i < rutasID.length; i++) {
		var routeStr = "ruta "+rutasID[i];
		rutas[routeStr] = jsons[i];
	};

	//creacion selector de layers
	var control = L.control.layers(null, rutas);
	//se carga el selector al mapa
	control.addTo(map);	
};
	


function searchAddress(){
	var inAddress = document.getElementById('address').value;
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: inAddress}, function(results, status){
		var lng = results[0].geometry.location.lng();
		var lat = results[0].geometry.location.lat();
		
		if (status == google.maps.GeocoderStatus.OK && marker == null){
			marker = L.marker([lat, lng]);
			marker.addTo(map);
		}else{
			marker.setLatLng([lat, lng]);
		}
		
		document.getElementById('address').value = '';
	});
};
