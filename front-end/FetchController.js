export default class FetchController {
  async getData() {
    const url =
      "https://7309-2a0c-5bc0-40-2e31-f8b2-a379-f82f-e798.ngrok-free.app/api/data";
    const response = await fetch(url, { mode: "cors" });
    const data = await response.json();

    return data;
  }
}
