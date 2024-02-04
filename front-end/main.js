import FetchController from "./FetchController.js";
import ScreenController from "./ScreenController.js";

const fetchController = new FetchController();
const screenController = new ScreenController();

function generateData() {
  const people = [
    {
      pid: 1,
      position: {
        lat: 52,
        lng: 0,
      },
      name: "Bob",
      heart_rate: "100",
    },
    {
      pid: 2,
      position: {
        lat: 52.00001,
        lng: 0.00001,
      },
      name: "John",
      heart_rate: "88",
    },
    {
      pid: 3,
      position: {
        lat: 52.00002,
        lng: 0.00002,
      },
      name: "Barry",
      heart_rate: "66",
    },
  ];

  const interval = setInterval(() => {}, 20);
}

// screenController.renderHealthInfo(people);

update();

const interval = setInterval(update, 1000);

function update(time) {
  fetchController
    .getData()
    .then((res) => screenController.renderHealthInfo(res.people));
}
