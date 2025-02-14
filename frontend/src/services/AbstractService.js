import { logger } from "./logging/LoggerService";

class AbstractService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_UPLOADFILES_API;
  }
  async getCsrfToken(token) {
    const TOKEN_EXPIRATION_TIME = 15 * 60 * 1000; 
    if (
      this.csrfToken &&
      this.lastTokenFetchTime &&
      Date.now() - this.lastTokenFetchTime < TOKEN_EXPIRATION_TIME
    ) {
      return this.csrfToken;
    }

    const csrfResponse = await this.request("/auth/antiforgerytoken", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    this.csrfToken = csrfResponse.token;
    this.lastTokenFetchTime = Date.now();

    return this.csrfToken;
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
      logger.logError("Request failed:", {
        error: error.message,
        functionName: "request",
        context: "AbstractService.request",
        severity: "low",
      });
      throw error;
    }
  }

  get(endpoint, token) {
    return this.request(endpoint, {
      method: "GET",
      headers: {
        "X-XSRF-TOKEN": this.csrfToken,
        Authorization: `Bearer ${token}`
      },
    });
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
