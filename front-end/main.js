var soldiers = [];
var markers = [];
var iter = 0;

const initPositions = [{
    lat: 28.51231,
    lng: 77.40548
}];

var add = 0;

function removeAllMarkers() {
    markers.forEach((marker) => {
        console.log(marker.position);
        marker.position = null}
    );
    soldiers = [];
    markers = [];
    add = add + 0.001
}

async function initMap() {

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const centerPos = {
        lat: 28.50231,
        lng: 77.40548
    };
    
    soldiers = initPositions;

    var map = new Map(
        document.getElementById("map"), {
        zoom: 12,
        center: centerPos,
        mapId: "4504f8b37365c3d0"
    });


    const interval = setInterval(function() {
        removeAllMarkers();
        soldiers.push({
            lat: (28.50231+0.0001 * iter),
            lng: 77.40548
        });
        markers = soldiers.map((soldier) => new AdvancedMarkerElement({
            position: soldier,
            map
          }));
        iter++;
        map.center = soldiers[soldiers[soldiers.size-1]];
    }, 50);
}

async function getData() {
  const url =
    "https://5200-2a0c-5bc0-40-2e31-f8b2-a379-f82f-e798.ngrok-free.app/api/data";
  const data = fetch(url, {
    mode: "cors",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((res) => res.json());

  return data;
}

const data = await getData();
console.log(data);
