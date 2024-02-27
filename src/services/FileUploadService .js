import AbstractService from "./AbstractService";

export default class FileUploadService extends AbstractService {
  uploadFiles(files) {
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file.file));

    return this.request("/upload", {
      method: "POST",
      body: formData,
    });
  }
}


