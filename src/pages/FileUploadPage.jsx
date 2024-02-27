import React, { useState, useEffect } from "react";
import FileInput from "@/components/FileInput";
import UploadButton from "@/components/UploadButton";
import FileList from "@/components/FileUploadList";
import FileUploadService from "@/services/FileUploadService ";
import mockFileContents from "@/Mock/mockFileContents";
function FileUploadPage() {
  const MAX_FILES = import.meta.env.VITE_MAXFILES_UPLOAD || 10;
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState([]);
  // const [fileContents, setfileContents] = useState([]);
  const [fileContents, setFileContents] = useState(mockFileContents);
  const [webSocket, setWebSocket] = useState(null);
  const FILESIZE_MAX = 10 * 1024 * 1024;
  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET);
    setWebSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setUploadStatus((prevStatus) =>
        prevStatus.map((u) => {
          if (u.file.name === data.FileName) {
            console.log("agora");
            return { ...u, status: data.Status, isError: data.IsError };
          }
          console.log(u);
          return u;
        })
      );
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed: ", event);
    };

    return () => {
      ws.close();
    };
  }, []);

  const fileUploadService = new FileUploadService();
  const handleFileChange = (e) => {
    if (e.target.files.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files at a time.`);
      return;
    }

    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      isValid: file.size <= FILESIZE_MAX,
      errorMessage:
        file.size > FILESIZE_MAX ? `File '${file.name}' exceeds 10 MB.` : null,
    }));
    const newUploadStatus = Array.from(e.target.files).map((file) => ({
      file,
      status: "Pending",
      isError: false,
    }));
    setUploadStatus(newUploadStatus);
    setFiles(newFiles);
  };

  const handleFileUpload = async () => {
    console.log(fileContents)
    const validFiles = files.filter((f) => f.isValid);
    if (validFiles.length == 0) {
      return;
    }
    console.log(validFiles.length);
    const newUploadStatus = validFiles.map(({ file }) => ({
      file,
      status: "Uploading...",
      isError: false,
    }));

    setUploadStatus(newUploadStatus);
    if (import.meta.env.VITE_AMBIENT == "local") {
      setTimeout(() => {
        const updatedStatus = validFiles.map(({ file }) => ({
          file,
          status: "Uploaded",
          isError: false,
        }));
        setUploadStatus(updatedStatus);
      }, 2000);
    } else {
      try {
        const result = await fileUploadService.uploadFiles(validFiles);
        console.log("Upload successful:", result);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">File Upload Page</h1>
      <FileInput onFileChange={handleFileChange} />
      <FileList
        files={files}
        uploadStatus={uploadStatus}
        fileContents={fileContents}
      />
      <UploadButton onUpload={handleFileUpload} />
    </div>
  );
}

export default FileUploadPage;
