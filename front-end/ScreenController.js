export default class ScreenController {
  renderHealthInfo(people) {
    const healthContainer = document.querySelector(".health-container");
    people.forEach((person) => {
      const soldierHealthOverview = document.querySelector(
        `#pid_${person.pid}`
      );

      if (!soldierHealthOverview) {
        const newSoldierHealthInterview = document.createElement("div");
        newSoldierHealthInterview.classList.add("soldier-health-overview");
        newSoldierHealthInterview.id = `pid_${person.pid}`;
        newSoldierHealthInterview.innerHTML = `
          <div class="person-name">${person.name}</div>
          <p>Heartrate: <span class="person-heartrate">${
            person.heart_rate
          }</span><img class="icon" src="./assets/heart-filled.svg"></img></p>
          <p>
            Status: <span class="person-status ${person.status.toLowerCase()}" >${person.status.toLowerCase()}</span>
          </p>
          <p>Analysis: <span class="person-analysis">none</span></p>
`;
        newSoldierHealthInterview.addEventListener("click", (event) => {
          console.log(event.currentTarget);
          document
            .querySelectorAll(".soldier-health-overview")
            .forEach((el) => el.classList.remove("active"));
          event.currentTarget.classList.add("active");
        });
        healthContainer.appendChild(newSoldierHealthInterview);
      } else {
        soldierHealthOverview.querySelector(".person-name").textContent =
          person.name;
        soldierHealthOverview.querySelector(".person-heartrate").textContent =
          person.heart_rate;
        soldierHealthOverview.querySelector(".person-status").textContent =
          person.status.toLowerCase();
        const personStatus =
          soldierHealthOverview.querySelector(".person-status");
        personStatus.classList.remove("normal");
        personStatus.classList.remove("moderate");
        personStatus.classList.remove("critical");
        personStatus.classList.add(person.status.toLowerCase());
        soldierHealthOverview.classList.remove("critical");
        if (person.status.toLowerCase() == "critical")
          soldierHealthOverview.classList.add("critical");
      }
    });
  }
}
