export default class ScreenController {
  renderHealthInfo(people) {
    const healthContainer = document.querySelector(".health-container");

    people.forEach((people) => {
      const newSoldierHealthInterview = document.createElement(div);
      newSoldierHealthInterview.innerHTML = `<div class="soldier-health-overview">
        <div class="person-name">${people.name}</div>
        <p>Heartrate: <span class="person-heartrate">${people.heartrate}</span><img class="icon" src="./assets/heart-filled.svg"></img></p>
        <p>
          Status: <span class="person-status good" >good</span>
        </p>
        <p>Analysis: <span class="person-analysis">none</span></p>
    
      </div>`;
    });
  }
}
