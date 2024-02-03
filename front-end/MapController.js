const markers = new Map();
var soldiers = [];

var iter = 0;

async function initMap() {

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const centerPos = {
        lat: 28.50231,
        lng: 77.40548
    };

    var map = new Map(
        document.getElementById("map"), {
        zoom: 12,
        center: centerPos,
        mapId: "4504f8b37365c3d0"
    });

    const interval = setInterval(function() {
        //TODO: set soldiers to data

        soldiers.push({
            pId: 1,
            position: {
                lat: (28.51231 + 0.0001 * iter),
                lng: 77.40548
            }
        })

        soldiers.forEach((soldier) => {
            if(markers.has(soldier.pId)) {
                markers.get(soldier.pId).position = new google.maps.LatLng(soldier.position.lat, soldier.position.lng);
            }
            else {
                markers.set(soldier.pId, new AdvancedMarkerElement({
                    position: soldier.pos,
                    map
                }));
            }
        });
        iter++;
    }, 10);
}