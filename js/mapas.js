var accessToken = L.mapbox.accessToken = 'pk.eyJ1IjoiaXNhYWNhdmlsYSIsImEiOiJjaXNoejAwMXowMDBvMnBud3FsOWFjZWl1In0.LJhyNscjlcr_ZONnc_BP_Q';

var map = L.mapbox.map('map', 'mapbox.streets').setView([19.2499700, -103.7271400], 13);

var toggleableLayerIds = [ '1', '10', '11', '13', '13_a', '14', '15', '17', '19', '20', '21', '22', '24', '24_a', '27_a','28', '29', '3', '4', '5', '7', '9', '9_a', 'a', 'b', 'cardona' ];
var jsons = [];
for (var i = 0; i < toggleableLayerIds.length; i++) {
        jsons[i] =  L.mapbox.featureLayer().loadURL('geojson/ruta_'+toggleableLayerIds[i]+'.geojson');            
    };


var rutas = {};
for (var i = 0; i < toggleableLayerIds.length; i++) {
	var routeStr = "ruta "+toggleableLayerIds[i];
	rutas[routeStr] = jsons[i];
};


var control = L.control.layers(null, rutas);
control.addTo(map);