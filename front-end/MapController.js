const markers = new Map();
var soldiers = [];

async function initMap() {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  const centerPos = {
    lat: 51.5072,
    lng: -0.1276,
  };

  var map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: centerPos,
    mapId: "4504f8b37365c3d0",
  });

  async function getData() {
    const url =
      "https://5200-2a0c-5bc0-40-2e31-f8b2-a379-f82f-e798.ngrok-free.app/api/data";
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    const data = await response.json();

    return data;
  }

  const infoWindow = new InfoWindow();

  const interval = setInterval(async function () {
    //TODO: set soldiers to data

    soldiers = await getData();

    soldiers.people.forEach((soldier) => {
      if(markers.has(soldier.pid)) {
          markers.get(soldier.pid).position = new google.maps.LatLng(soldier.position.lat, soldier.position.lng);
      }
      else {
        const marker = new AdvancedMarkerElement({
          position: soldier.pos,
          title: soldier.name,
          map
      });
      marker.addListener("click", ({domEvent, latLng}) => {
        const { target } = domEvent;
        infoWindow.close();
        infoWindow.setContent(marker.title);
        const personElem = document.getElementById("pid_" + soldier.pid);
        personElem.classList.add("active");
        console.log(personElem);
        infoWindow.open(marker.map, marker);
      })
        markers.set(soldier.pid, marker);
      }
  });
  }, 10);
}
