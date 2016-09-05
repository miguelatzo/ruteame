var accessToken = L.mapbox.accessToken = 'pk.eyJ1IjoiaXNhYWNhdmlsYSIsImEiOiJjaXNoejAwMXowMDBvMnBud3FsOWFjZWl1In0.LJhyNscjlcr_ZONnc_BP_Q';

var map = L.mapbox.map('map', 'mapbox.streets').setView([19.2499700, -103.7271400], 13);

var toggleableLayerIds = [ '1', '10', '11', '13', '13_a', '14', '15', '17', '19',
						 '20', '21', '22', '24', '24_a', '27_a','28', '29', '3', 
						 '4', '5', '7', '9', '9_a', 'a', 'b', 'cardona' ];

var layerColour = ['#eec6de'/*1*/, '#4fcdc2'/*10*/, '#87b0b6'/*11*/, '#00a3cc'/*13*/, 
				 '#1ca3b5'/*13a*/, '#aeafb1'/*14*/, '#f7d300'/*15*/, '#fdc84d'/*17*/,
				 '#f2c8ac'/*19*/, '#827771'/*20*/, '#b29a76'/*21*/, '#c5cf88'/*22*/, 
				 '#c0d120'/*24*/, '#78a071'/*24a*/, '#dcdaf7'/*27a*/, '#9571a7'/*28*/,
				 '#970656'/*29*/, '#fda9b9'/*3*/, '#dd7fc8'/*4*/, '#fb6c85'/*5*/,
				 '#e0377a'/*7*/, '#a6eee0'/*9*/, '#86aed2'/*9a*/, '#ca3b55'/*a*/,
				 '#d37a7d'/*b*/, '#f05235'/*cardona*/
				 ];
var jsons = [];
var group = L.layerGroup();
for (var i = 0; i < toggleableLayerIds.length; i++) {
        jsons[i] =  L.mapbox.featureLayer('geojson/ruta_'+toggleableLayerIds[i]+'.geojson', {style: {color: layerColour[i]}});
        //group.addLayer(L.mapbox.featureLayer('geojson/ruta_'+toggleableLayerIds[i]+'.geojson', {style: {color: 'red'}}));
    	//map.setPaintProperty(jsons[i], 'fill-color', '#fd8d3c');
    };


var rutas = {};
for (var i = 0; i < toggleableLayerIds.length; i++) {
	var routeStr = "ruta "+toggleableLayerIds[i];
	rutas[routeStr] = jsons[i];
};



var control = L.control.layers(null, rutas);
control.addTo(map);