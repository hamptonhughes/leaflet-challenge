// Create map object

let myMap = L.map("map", {
    center: [37.09, -95.7],
    zoom: 5
  });
  
//Define geoJson link
let link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson'


// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


//Create a function to choose the marker color

function chooseColor(d) {
    if (d > 90) return "darkred";
    else if (d > 70) return "red";
    else if (d >50) return "orange";
    else if (d > 30) return "yellow";
    else if (d >10) return "lightgreen";
    else return "green";
  }
  

// Getting our GeoJSON data
d3.json(link).then(function(data) {
     console.log(data)
   //Loop through each of the features, adding earthquake info to a circle marker 
    for (let i = 0; i < data.features.length; i++) {
       let location = [data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]]
        L.circle(location, {
            fillOpacity: 0.75,
            fillColor: chooseColor(parseInt(data.features[i].geometry.coordinates[2])),
            color: chooseColor(parseInt(data.features[i].geometry.coordinates[2])),
            radius: data.features[i].properties.mag * 20000
        }).bindPopup(`<h2>${data.features[i].properties.place}</h2><hr>Depth: ${data.features[i].geometry.coordinates[2]}<br>
                        Magnitude: ${data.features[i].properties.mag}`).addTo(myMap);
    }


      // Add legend 
      let legend = L.control({position: 'bottomright'});

      legend.onAdd = function (myMap) {
      
          let div = L.DomUtil.create('div', 'info legend'),
          fillColors = [-10, 10, 30, 50, 70, 90],
          labels = [];
      
          // loop through our density intervals and generate a label with a colored square for each interval
          for (var i = 0; i < fillColors.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + chooseColor(fillColors[i] + 1) + '"></i> ' +
                  fillColors[i] + (fillColors[i + 1] ? '&ndash;' + fillColors[i + 1] + '<br>' : '+');
      }
      
      return div;
      };
      
      legend.addTo(myMap);

});
