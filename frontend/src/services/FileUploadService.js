import AbstractService from "./AbstractService";
export default class FileUploadService extends AbstractService {
  constructor() {
    super();
    this.csrfToken = null;
    this.lastTokenFetchTime = null;
  }

  async uploadFiles(files, token) {
    this.csrfToken = await this.getCsrfToken(token);

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file.file));

    return this.request("/upload", {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": this.csrfToken,
        Authorization: `Bearer ${token}`, // Use passed token
      },
      body: formData,
      credentials: "include",
    });
  }
}
