
//mapa inicializado
var map = L.map('map').setView([-25.953724, 32.588711], 12);

//camada osm
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
osm.addTo(map);

//camada de Water color
var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});
//watercolor.addTo(map)

//camda dark
var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
});
//dark.addTo(map)

//googleStreets
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
// googleStreets.addTo(map)

//Google satellite
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
// googleSat.addTo(map)

var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
});


//Maker
var myIcon = L.icon({
    iconUrl: 'img/red_marker.png',
    iconSize: [40, 40],
});

var singleMarker = L.marker([-25.953724, 32.588711], { icon: myIcon, draggable: true })
var popup = singleMarker.bindPopup('Aqui eh Maputo: ' + singleMarker.getLatLng()).openPopup();
popup.addTo(map);

var secondMarker = L.marker([-25.953724, 32.488711], { icon: myIcon, draggable: true })


//GeoJSON
//console.log(singleMarker.toGeoJSON())

//GeoJSON
var pontosData = L.geoJSON(pontosJSON).addTo(map)
var linhasData = L.geoJSON(linhasJSON).addTo(map)
var poligonosData = L.geoJSON(poligonosJSON, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<b>Name: </b>` + feature.properties.name)
    },
    style: {
        fillColor: 'green',
        color: 'red'
    }
}).addTo(map)

//controle de camadas
var baseMaps = {
    "Open Street Map": osm,
    "Water Color": watercolor,
    "Dark": dark,
    "Google Streets": googleStreets,
    "Google satellite": googleSat

};

var overlayMaps = {
    "First Marker": singleMarker,
    "Second Marker": secondMarker,
    "Pontos": pontosData,
    "Linhas": linhasData,
    "Poligono": poligonosData,
    "Nexrad": nexrad
};

map.removeLayer(singleMarker)

var layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: true }).addTo(map);

//Leaflet events
map.on('mouseover', function () {
    console.log('Mouse esta sobre o mapa')
})

map.on('mousemove', function (e) {
    document.getElementsByClassName('coordinate')[0].innerHTML = "Latitude: " + e.latlng.lat + " Logitude: " + e.latlng.lng
    console.log("Latitude: " + e.latlng.lat + " Logitude: " + e.latlng.lng)
})


    //personalizacao de estilos


