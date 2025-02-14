import AbstractService from "./AbstractService";
import { logger } from "./logging/LoggerService";
export default class FileViewerService extends AbstractService {
  constructor() {
    super();
    this.csrfToken = null;
    this.lastTokenFetchTime = null;
  }

  async getFiles(
    page = 1,
    pageSize = 10,
    sortBy = "createdAt",
    descending = true,
    token,
  ) {
    this.csrfToken = await this.getCsrfToken(token);

    try {
      const queryParams = new URLSearchParams({
        Page: page.toString(),
        PageSize: pageSize.toString(),
        SortBy: sortBy,
        Descending: descending,
        SearchTerm: "",
        Status: "",
      });

      return await this.get(`status/files?${queryParams.toString()}`, token);
    } catch (error) {
      logger.logError("Error fetching files:", {
        error: error.message,
        functionName: "getFiles",
        context: "FileViewerService.getFiles",
      });
      throw error;
    }
  }

  async searchFiles(
    searchTerm,
    status,
    startDate,
    endDate,
    page = 1,
    pageSize = 10,
  ) {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (searchTerm) {
        queryParams.append("searchTerm", searchTerm);
      }
      if (status) {
        queryParams.append("status", status);
      }
      if (startDate) {
        queryParams.append("startDate", startDate.toISOString());
      }
      if (endDate) {
        queryParams.append("endDate", endDate.toISOString());
      }

      return await this.get(`files/search?${queryParams.toString()}`);
    } catch (error) {
      logger.logError("Error searching files:", {
        error: error.message,
        functionName: "searchFiles",
        context: "FileViewerService.searchFiles",
      });
      throw error;
    }
  }

  async getFileDetails(fileId) {
    try {
      return await this.get(`files/${fileId}`);
    } catch (error) {
      logger.logError("Error fetching file details:", {
        error: error.message,
        functionName: "getFileDetails",
        context: "FileViewerService.getFileDetails",
      });
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      const url = new URL(`files/${fileId}`, this.baseUrl).href;
      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete file");
      }

      return true;
    } catch (error) {
      logger.logError("Error deleting file:", {
        error: error.message,
        functionName: "deleteFile",
        context: "FileViewerService.deleteFile",
      });
      throw error;
    }
  }
}
