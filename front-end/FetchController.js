export default class FetchController {
  async getData() {
    const url =
      "https://808e-2a0c-5bc0-40-2e31-a044-3f93-5d0-bfad.ngrok-free.app/api/data";
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
