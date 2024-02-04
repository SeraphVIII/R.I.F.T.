const velocity = 0.001; // per second
const timeInterval = 0.01; // in milliseconds

const start1 = {
  lat: 51.528550086215105,
  lng: -0.20126425370772605,
};

const end1 = {
  lat: 51.52795113184585,
  lng: -0.1984015937668363,
};

const start2 = {
  lat: 51.52855236100455,
  lng: -0.20144362902995,
};

const end2 = {
  lat: 51.52803539894703,
  lng: -0.19871640916308145,
};

const start3 = {
  lat: 51.52862751038593,
  lng: -0.20177309785251085,
};

const end3 = {
  lat: 51.528131052887765,
  lng: -0.1991959557467386,
};

function generatePoints(start, end) {
  const points = [start];
  let lat = start.lat;
  let lng = start.lng;

  let changeInLat = end.lat - start.lat;
  let changeInLng = end.lng - start.lng;

  const theta = Math.atan(changeInLat / changeInLng);
  const distance = Math.sqrt(changeInLat ** 2 + changeInLng ** 2);

  const numberOfSeconds = distance / velocity;
  const numberOfElements = numberOfSeconds / timeInterval;

  for (let i = 1; i < numberOfElements; i++) {
    lat += timeInterval * velocity * Math.sin(theta);
    lng += timeInterval * velocity * Math.cos(theta);

    points.push({ lat: lat, lng: lng });
  }

  return points;
}

function generatePerson1Data(points, name = "Person 1", pid = 1) {
  return points.map((point, index) => {
    let status = "normal";
    let heart_rate = 66;

    if (index >= 0.8 * points.length) {
      status = "critical";
      heart_rate = 140;
    }
    return {
      name: name,
      pid: pid,
      status: status,
      heart_rate: heart_rate,
    };
  });
}

function generatePerson2Data(points, name = "Person 2", pid = 2) {
  return points.map((point, index) => {
    let status = "normal";
    let heart_rate = 66;

    return {
      name: name,
      pid: pid,
      status: status,
      heart_rate: heart_rate,
    };
  });
}

function combinePeopleData(...args) {
  const arg = Array.from(args);
  const peopleData = [];
  for (let i = 0; i < arg[0].length; i++) {
    peopleData[i] = { people: [] };
    for (let arr of arg) {
      peopleData[i].people.push(arr[i]);
    }
  }

  return peopleData;
}

export function generateDataOne() {
  const points = generatePoints(start1, end1);
  const person1 = generatePerson1Data(points);
  const person2 = generatePerson2Data(points);

  return combinePeopleData(person1, person2);
}

const data = generateDataOne();
console.log(data);
