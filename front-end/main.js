console.log("hi");

async function getData() {
  const url =
    "https://5200-2a0c-5bc0-40-2e31-f8b2-a379-f82f-e798.ngrok-free.app/api/data";
  const data = fetch(url, {
    mode: "cors",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }).then((res) => res.json());

  return data;
}

const data = await getData();
console.log(data);
