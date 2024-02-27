class AbstractService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_UPLOADFILES_API;
  }

  async request(endpoint, options) {
    const url = new URL(endpoint, this.baseUrl).href;

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default AbstractService;
