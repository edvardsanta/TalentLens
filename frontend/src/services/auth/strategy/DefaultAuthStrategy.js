import { logger } from "@/services/logging/LoggerService";

export class DefaultAuthStrategy {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  async authenticate({ username, password }) {
    try {
      const response = await fetch(`${this.apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const user = await response.json();
      return user;
    } catch (error) {
      logger.logError(error, {
        functionName: "authenticate",
        context: "DefaultAuthStrategy.authenticate",
        severity: "low",
      });
      throw new Error(error.message || "Authentication failed");
    }
  }

  async logout() {
    try {
      // await fetch(`${this.apiUrl}/logout`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });
      return null;
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      logger.logError(error, { Context: "DefaultAuthStrategy.logout" });
      throw new Error("Logout failed");
    }
  }

  async register({ username, password, email }) {
    try {
      const response = await fetch(`${this.apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const user = await response.json();
      return user;
    } catch (error) {
      throw new Error(error.message || "Registration failed");
    }
  }
}
