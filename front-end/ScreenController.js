export default class ScreenController {
  renderHealthInfo(people) {
    const healthContainer = document.querySelector(".health-container");

    people.forEach();

    const newSoldierHealthInterview = document.createElement(div);
    newSoldierHealthInterview.innerHTML = `<div class="soldier-health-overview">
    <div class="person-name"></div>
    <p>Heartrate: <span class="person-heartrate">160</span><img class="icon" src="./assets/heart-filled.svg"></img></p>
    <p>
      Status: <span class="person-status critical" >critical</span>
    </p>
    <p>Analysis: <span class="person-analysis">Head Injury</span></p>

  </div>`;
  }
}
