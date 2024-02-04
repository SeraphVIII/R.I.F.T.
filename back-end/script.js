const WebSocket = require("ws")
const fetch = require("node-fetch-commonjs")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// https://5200-2a0c-5bc0-40-2e31-f8b2-a379-f82f-e798.ngrok-free.app/api/data
app.use(cors());
app.use(bodyParser.json());
class DataPoint {
    constructor(heart_rate, lat, lng, timestamp) {
      this.heart_rate = heart_rate;
      this.lat = lat;
      this.lng = lng;
      this.timestamp = timestamp
    }
}

class Person {
    
    constructor(current_bpm, name, lat, lng, personID, standing_bpm_mean, standing_bpm_std, running_bpm_mean, running_bpm_std, time_stamp) {
        this.name = name;
        this.personID = personID;
        this.standing_bpm_mean = standing_bpm_mean;
        this.standing_bpm_std = standing_bpm_std;
        this.running_bpm_mean = running_bpm_mean;
        this.running_bpm_std = running_bpm_std;
        this.dataPoints = [new DataPoint(current_bpm, lat, lng, time_stamp)];
    }
    
    addDataPoint(dataPoint) {
        this.dataPoints.push(dataPoint);
    }
    
    isRunning() {
        const MAX_VALUES_TO_CONSIDER = 20; // Maximum number of values to consider
        var totalSpeed = 0;
        for (let i = Math.max(this.dataPoints.length - MAX_VALUES_TO_CONSIDER, 1); i < this.dataPoints.length; i++) {
            totalSpeed += calculateDistance(this.dataPoints[i]["lat"], this.dataPoints[i]["lng", this.dataPoints[i - 1]["lat"], this.dataPoints[i - 1]["lng"]])
        }
        const averageSpeed = totalSpeed / Math.min(MAX_VALUES_TO_CONSIDER, this.dataPoints.length - 1);
    
        // If average speed is above a threshold, consider the person as running
        const runningThreshold = 5; // Adjust this threshold according to your needs
        return averageSpeed > runningThreshold;
    }
    
    
    
    // You can add more methods or functionality as needed
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

let all = [
    new Person(20, "Person 1", 51.507382614115976, -0.19503585266537363, 1, 67, 20, 101, 28, 0),
    new Person(72, "Person 2", 51.502081198314876, -0.1697567115948215, 2, 72, 15, 120, 30, 0),
    new Person(160, "Person 3", 51.503527100156255, -0.1882785520950669, 3, 85, 30, 130, 40, 0),
    new Person(75, "Person 4", 51.49686680763736, -0.18018386912022025, 4, 70, 22, 106, 35, 0)
  ];

let people = [
    {
      "heart_rate": 20,
      "position": {"lat": 51.507382614115976, "lng": -0.19503585266537363},
      "pid": 1,
      "sizeRectangle": 0.001,
      "factorTime": 1,
      "name": "Person 1",
      "status": "Critical",
      "standing_bpm_mean": 67,
      "standing_bpm_std": 20,
      "active_bpm_mean": 101,
      "active_bpm_std": 28
    },
    {
      "heart_rate": 72,
      "position": {"lat": 51.502081198314876, "lng": -0.1697567115948215},
      "pid": 2,
      "sizeRectangle": 0.004,
      "factorTime": 1.5,
      "name": "Person 2",
      "status": "Normal",
      "standing_bpm_mean": 72,
      "standing_bpm_std": 15,
      "active_bpm_mean": 120,
      "active_bpm_std": 30
    },
    {
      "heart_rate": 160,
      "position": {"lat": 51.503527100156255, "lng": -0.1882785520950669},
      "pid": 3,
      "sizeRectangle": 0.008,
      "factorTime": 0.3,
      "name": "Person 3",
      "status": "Moderate",
      "standing_bpm_mean": 85,
      "standing_bpm_std": 30,
      "active_bpm_mean": 130,
      "active_bpm_std": 40
    },
    {
      "heart_rate": 75,
      "position": {"lat": 51.49686680763736, "lng": -0.18018386912022025},
      "pid": 4,
      "sizeRectangle": 0.004,
      "factorTime": 0.5,
      "name": "Person 4",
      "status": "Normal",
      "standing_bpm_mean": 72,
      "standing_bpm_std": 22,
      "active_bpm_mean": 106,
      "active_bpm_std": 35
    }
  ];




const period = 100;
let periodCounterGlobal = 0;
setInterval(update_counter, period); 

let total_program_time = 0;

const maxCount = 100

const velocity = 0.00016 / 100
// const max_deflection = 0.03;
let going_up = true


const get_deviation = x => (((counter ) / maxCount) * x)

const heart_rate_mod =  hr => hr + get_deviation(5)
const position_mod = loc => ({
    "lat": loc["lat"] + counter * velocity,
    "lng": loc["lng"] + counter * velocity
  });

  

const json_object = {
    "centre": "Sample Center",
    "people": people
}

let counter = 0;




function update_counter() {
    total_program_time += period;
    counter = going_up ? counter + 1 : counter - 1
    if (counter >= maxCount) {
        going_up = false;
    } else if (counter <=  -maxCount) {
        going_up = true;
    }

    periodCounterGlobal++;
    periodCounterGlobal = periodCounterGlobal % period
}

let changing_hr = 78

app.post('/api/hr', (req, res) =>{
    console.log(req.body["hr"])
    changing_hr = req.body["hr"]

    res.json({"OK": 200})

})
// Define a route to handle GET requests
app.get('/api/data', (req, res) => {
    //console.log("Request");
    

    let peopleMod = []
    person = people[0]
    var hr = heart_rate_mod(person["heart_rate"])
    const newPerson = {
        "heart_rate": hr,
        "position": person["position"],
        "pid": person["pid"],
        "name":  person["name"],
        "status": getStatus(all[0], hr)
    }
    all[0].addDataPoint(new DataPoint(hr, person["position"]["lat"], person["position"]["lng"], total_program_time))
    peopleMod.push(newPerson)


    for (let i = 1; i < people.length; i++) {
        person = people[i]
        if (i == people.length -1 ) {
            hr = changing_hr
        } else {
            hr = heart_rate_mod(person["heart_rate"])

        }
        const newPerson = {
            "heart_rate": hr,
            "position": getRectanglePosition(person["position"]["lat"], person["position"]["lng"],
             person["sizeRectangle"], person["factorTime"]),
            // "position": position_mod(person["position"]),
            "pid": person["pid"],
            "name":  person["name"],
            "status": getStatus(all[0], hr)
        }
        all[i].addDataPoint(new DataPoint(hr, newPerson["position"]["lat"], newPerson["position"]["lng"], total_program_time))
        peopleMod.push(newPerson)
    }
    
    // Process the request and send back some data
    res.json({
        "centre": "Sample Center",
        "people": peopleMod
    });
});
 

const data = {}
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const WS_CONNECTION = "wss://ws.tryterra.co/connect"

async function getToken() {
    const url = 'https://ws.tryterra.co/auth/developer'
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'dev-id':  'na-testing-ze4lw0gsLB',
            'x-api-key': 'TGNtlmF29SOtdH4rLI624y-9CYnBJQ1p',
        }
    }
    try {
        let tokenResp = await fetch(url, options)
        return (await tokenResp.json())["token"]
    }catch (e) {
        console.error(e)
    }
    return ""
}

function initWS(token) {
    const socket = new WebSocket(WS_CONNECTION)

    socket.addEventListener('open', () =>
        console.log("Connection Established")
    )

    socket.addEventListener('close', event => {
        console.log('close')
        console.log(event.reason)
    })

    socket.addEventListener('error', event => {
        console.log('error')
        console.log(event)
    })

    var expectingHeartBeatAck = false

    function heartBeat() {
        const heartBeatPayload = JSON.stringify({ "op": 0 })
        socket.send(heartBeatPayload)
        console.log("↑  " + heartBeatPayload)

    }

    socket.addEventListener('message', function (event) {
        console.log("↓  " + event.data);
        const msg = JSON.parse(event.data)
        if (msg.op == 2){
            heartBeat()
            const interval = msg.d.heartbeat_interval
            setInterval(heartBeat, interval)
            var payload = JSON.stringify({
                "op": 3,
                "d": {
                    "token": token,
                    "type": 1  //0  for user, 1 for developer
                }
            })
            socket.send(payload)
        }
        if (msg.op == 1) {
            expectingHeartBeatAck = false
        }
    })
}




function getRectanglePosition(lat, lng, size, factorTime) {
    const periodCounter = Math.floor((periodCounterGlobal % period) * factorTime)
    const sizeSide = Math.floor(period * factorTime) /4 
    
    const side = Math.floor((periodCounter) / sizeSide) % 4
    
    if (side == 0) {

        return {
        "lat" : lat + (((periodCounter % sizeSide)) / sizeSide) * size,
        "lng" : lng
        }

    } else if (side ==1) {

        return {
            "lat" : lat + size,
            "lng" : lng + (((periodCounter % sizeSide)) / sizeSide) * size
        }

    } else if (side ==2) {

        return {
            "lat" : lat - (( (periodCounter % sizeSide)) / sizeSide) * size + size,
            "lng" : lng + size
        }

        
    } else if (side == 3) {

        return {
            "lat" : lat,
            "lng" : lng + size  - (( (periodCounter % sizeSide)) / sizeSide) * size
        }
        
    }

    console.log("weird")

    return {"lat" : 51,"lng" : 51}

}

function getRunning(person) {
    return person.isRunning()
}

function getStatus(person, heartRate) {
        const runningOrNot = getRunning(person)
    
        rest_bpm_mean = person.standing_bpm_mean
        rest_bpm_std = person.standing_bpm_std
        active_bpm_mean = person.running_bpm_mean
        active_bpm_std = person.running_bpm_std
        // console.log(rest_bpm_mean)
        // console.log(rest_bpm_std)
        // console.log(active_bpm_mean)
        // console.log(active_bpm_std)
        // console.log(runningOrNot)

        if (heartRate < 0.5) {
            return "Dead";
        }

        // critical part     

        if (heartRate <= rest_bpm_mean - rest_bpm_std) {
            return "Critical";
        }
        if (runningOrNot && heartRate <= active_bpm_mean - active_bpm_std) {
            return "Critical"
        }

        // moderate
        if (heartRate >= rest_bpm_mean + 1.5 * rest_bpm_std) {
            return "Moderate"
        }
        if (runningOrNot && heartRate >= active_bpm_mean + 1.5 * active_bpm_std) {
            return "Moderate"
        }

        return "Normal";
   }



// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}


getToken().then(token => initWS(token))
