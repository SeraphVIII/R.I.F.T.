export default class FetchController {
  async getData() {
    const url =
      "https://4053-2a0c-5bc0-40-2e31-f8b2-a379-f82f-e798.ngrok-free.app/api/data";
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    const data = await response.json();

    return data;
  }
}
