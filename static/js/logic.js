// Create map object

let myMap = L.map("map", {
    center: [37.09, -95.7],
    zoom: 5
  });
  

let link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson'


// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Getting our GeoJSON data
d3.json(link).then(function(data) {

    console.log(data)
    for (let i = 0; i < data.features.length; i++) {
        let location = [data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]]
        L.circle(location, {
            fillOpacity: 0.75,
            fillColor: 'red',
            color: 'red',
            radius: data.features[i].properties.mag * 20000
    // Adjust the radius.
            //radius: Math.sqrt(data.features[i].properties.mag)*50000



        }).bindPopup(`Magnitude:${data.features[i].properties.mag}`).addTo(myMap);
    }


});
