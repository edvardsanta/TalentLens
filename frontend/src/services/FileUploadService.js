import AbstractService from "./AbstractService";

export default class FileUploadService extends AbstractService {
  constructor() {
    super();
    this.csrfToken = null;
    this.lastTokenFetchTime = null;
  }

  async getCsrfToken(token) {
    // Implement token caching logic
    const TOKEN_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes

    // Check if token exists and is not expired
    if (
      this.csrfToken &&
      this.lastTokenFetchTime &&
      Date.now() - this.lastTokenFetchTime < TOKEN_EXPIRATION_TIME
    ) {
      return this.csrfToken;
    }

    // Fetch new token
    const csrfResponse = await this.request("/auth/antiforgerytoken", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    // Store the new token and fetch time
    this.csrfToken = csrfResponse.token;
    this.lastTokenFetchTime = Date.now();

    return this.csrfToken;
  }
  async uploadFiles(files, token) {
    const csrfToken = await this.getCsrfToken(token);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file.file));

    return this.request("/upload", {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": csrfToken,
        Authorization: `Bearer ${token}`, // Use passed token
      },
      body: formData,
      credentials: "include",
    });
  }
}
