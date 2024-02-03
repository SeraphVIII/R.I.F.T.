import FetchController from "./FetchController.js";
import ScreenController from "./ScreenController.js";

const fetchController = new FetchController();
const screenController = new ScreenController();

fetchController
  .getData()
  .then((res) => screenController.renderHealthInfo(res.people));
