import FetchController from "./FetchController.js";
import ScreenController from "./ScreenController.js";

const fetchController = new FetchController();
const screenController = new ScreenController();

const interval = setInterval(update, 1000);

function update(time) {
  fetchController
    .getData()
    .then((res) => screenController.renderHealthInfo(res.people));
}
