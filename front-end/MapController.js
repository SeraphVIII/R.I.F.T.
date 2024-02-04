const markers = new Map();
var soldiers = [];

async function initMap() {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

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
      "https://808e-2a0c-5bc0-40-2e31-a044-3f93-5d0-bfad.ngrok-free.app/api/data";
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
      if (markers.has(soldier.pid)) {
        markers.get(soldier.pid).position = new google.maps.LatLng(
          soldier.position.lat,
          soldier.position.lng
        );

        const status = document.querySelector(
          `#pid_${soldier.pid} .person-status`
        ).textContent;

        if (status == "normal") {
          const soldierImage = document.createElement("img");
          soldierImage.src = "./assets/soldier-green.svg";
          markers.get(soldier.pid).content = soldierImage;
        }

        if (status == "moderate") {
          const soldierImage = document.createElement("img");
          soldierImage.src = "./assets/soldier-orange.svg";
          markers.get(soldier.pid).content = soldierImage;
        }

        if (status == "critical") {
          const soldierImage = document.createElement("img");
          soldierImage.src = "./assets/soldier-red.svg";
          markers.get(soldier.pid).content = soldierImage;
        }
      } else {
        const soldierImage = document.createElement("img");
        soldierImage.src = "./assets/soldier-blue.svg";

        const marker = new AdvancedMarkerElement({
          position: soldier.pos,
          title: soldier.name,
          content: soldierImage,
          map,
        });

        const markerInfoWindow = new InfoWindow();
        markerInfoWindow.setContent(marker.title);
        markerInfoWindow.open({ anchor: marker, map: marker.map });

        // infoWindow.open(marker.map, marker);
        marker.addListener("click", ({ domEvent, latLng }) => {
          const { target } = domEvent;
          infoWindow.close();
          infoWindow.setContent(marker.title);
          const prevPinned = document.querySelector(
            ".soldier-health-overview.active"
          );
          prevPinned?.classList.remove("active");
          if (prevPinned?.id != `pid_${soldier.pid}`) {
            const personElem = document.getElementById("pid_" + soldier.pid);
            personElem.classList.add("active");
          }
          infoWindow.open(marker.map, marker);
        });
        markers.set(soldier.pid, marker);
      }
    });
  }, 50);
}
