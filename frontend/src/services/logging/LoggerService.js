import StandardError from "@/models/StandardError";
class LoggerService {
  constructor() {
    this.isFileLogging = import.meta.env.VITE_USE_FILE_LOGGING === "true";
    this.logFilePath = import.meta.env.VITE_LOG_FILE_PATH || "app.log";
    this.errorTrackingEnabled =
      import.meta.env.VITE_ERROR_TRACKING_ENABLED === "true";
  }

  /**
   * Logs an error and sends it to the configured error tracking and file logging services.
   * @param {Error} error - The error object to log.
   * @param {StandardError} errorInfo - Additional information about the error, such as component stack trace.
   */
  async logError(error, errorInfo) {
    const standardError = {
      id: `error-${Date.now()}`, // Generate a unique ID for the error
      message: error.message,
      code: error.code || "UNKNOWN", // Default code if not provided
      trace: {
        functionId: errorInfo?.functionName || "unknown", // Function name or ID
        file: errorInfo?.file || "unknown", // File where the error occurred
        line: errorInfo?.line || 0, // Line number where the error occurred
      },
      metadata: {
        timestamp: new Date().toISOString(),
        environment: import.meta.env.MODE,
        context: errorInfo?.context || "unknown", // Additional context
        severity: errorInfo?.severity || "error", // Error severity level
      },
    };

    if (this.isFileLogging) {
      await this.writeToFile(standardError);
    }

    if (this.errorTrackingEnabled) {
      await this.sendToErrorTracking(standardError);
    }

    // Always console.log in development
    if (import.meta.env.VITE_AMBIENT === "local") {
      console.error("Error logged:", standardError);
    }
  }

  async writeToFile(errorLog) {
    try {
      const fs = await import("fs/promises");
      await fs.appendFile(
        this.logFilePath,
        JSON.stringify(errorLog) + "\n",
        "utf8",
      );
    } catch (error) {
      console.error("Failed to write to log file:", error);
    }
  }

  async sendToErrorTracking(errorLog) {
    try {
      const response = await fetch("/api/log-error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorLog),
      });

      if (!response.ok) {
        throw new Error("Failed to send error to tracking service");
      }
    } catch (error) {
      console.error("Failed to send error to tracking service:", error);
    }
  }
}
export const logger = new LoggerService();
