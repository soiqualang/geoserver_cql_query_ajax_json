//https://www.google.com/maps/@16.2033834,107.138095,5.75z

//Khai bao ban do nen
mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var mbAttr='soiqualang_chentreu';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

var streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});



var topo = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
	layers: 'TOPO-OSM-WMS'
});

var thuadat_style = {
	"color": "#ff7800",
	"weight": 5,
	"opacity": 0.5
};

shbando_dk='%20AND%201=1';
shthua_dk='%20AND%201=1';

thuadat_serv='http://dev.dothanhlong.org:8080/geoserver/thuadat/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=thuadat:view_duynghia_4326&maxFeatures=50&CQL_FILTER=1=1'+shbando_dk+''+shthua_dk+'&outputFormat=application/json';

thuadat_serv='proxy.php?url='+encodeURIComponent(thuadat_serv);

thuadat = new L.GeoJSON.AJAX(null, {
	style: thuadat_style
});

//https://www.google.com/maps/@15.841183,108.3778039,14z
var map = L.map('map', {
	center: [15.841183, 108.3778039],
	zoom: 14,
	layers: [grayscale, thuadat]
});

//Khai bao control layer
//Ban do nen
var baseLayers = {
	"Bản đồ Grayscale": grayscale,
	"Bản đồ Streets": streets
};

//Ban do chuyen de
var overlays = {		
	"Bản đồ Topo": topo,
	"Thửa đất": thuadat
};


L.control.layers(baseLayers, overlays).addTo(map);