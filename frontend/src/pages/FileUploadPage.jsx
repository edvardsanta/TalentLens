import React, { useState, useCallback } from "react";
import FileInput from "@/components/upload/FileInput";
import UploadButton from "@/components/upload/UploadButton";
import FileList from "@/components/upload/FileUploadList";
import FileUploadService from "@/services/FileUploadService";
import { useSelector } from "react-redux";
import { AlertCircle } from "lucide-react";
import { useErrorLogging } from "@/hooks/useErrorLogging";
/**
 * FileUploadPage component for handling file uploads.
 * @returns {React.JSX.Element} The rendered FileUploadPage component.
 */
function FileUploadPage() {
  const MAX_FILES = import.meta.env.VITE_MAXFILES_UPLOAD || 10;
  const FILESIZE_MAX = 10 * 1024 * 1024;
  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState([]);
  const [fileContents, setFileContents] = useState([]);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const { handleError } = useErrorLogging();
  const fileUploadService = new FileUploadService();
  const userToken = useSelector((state) => state.auth.auth?.token);

  const validateFile = useCallback((file) => {
    const errors = [];

    if (file.size > FILESIZE_MAX) {
      errors.push(
        `File exceeds ${(FILESIZE_MAX / (1024 * 1024)).toFixed(1)}MB limit`,
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      errors.push("File type not supported");
    }

    return {
      isValid: errors.length === 0,
      errorMessage: errors.join(", "),
    };
  }, []);

  const handleFileChange = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  }, []);

  const processFiles = useCallback(
    (selectedFiles) => {
      if (selectedFiles.length > MAX_FILES) {
        setError(`Maximum ${MAX_FILES} files allowed`);
        return;
      }

      const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > FILESIZE_MAX * MAX_FILES) {
        setError(
          `Total size exceeds ${((FILESIZE_MAX * MAX_FILES) / (1024 * 1024)).toFixed(1)}MB limit`,
        );
        return;
      }

      const newFiles = selectedFiles.map((file) => ({
        file,
        ...validateFile(file),
      }));

      const newUploadStatus = selectedFiles.map((file) => ({
        file,
        status: "Pending",
        isError: false,
      }));

      setError("");
      setUploadStatus(newUploadStatus);
      setFiles(newFiles);

      const newFileContents = selectedFiles.map((file) => ({
        filename: file.name,
        personName: "",
        age: 0,
        githubUrl: "",
        linkedinUrl: "",
        hardSkills: [],
        softSkills: [],
        talent: "",
      }));
      setFileContents(newFileContents);
    },
    [MAX_FILES, validateFile],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    },
    [processFiles],
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileUpload = useCallback(async () => {
    const validFiles = files.filter((f) => f.isValid);

    if (validFiles.length === 0) {
      setError("No valid files to upload");
      return;
    }

    setUploadStatus(
      validFiles.map(({ file }) => ({
        file,
        status: "Uploading...",
        isError: false,
      })),
    );

    try {
      const results = await fileUploadService.uploadFiles(
        validFiles,
        userToken,
      );

      setUploadStatus((prevStatus) =>
        prevStatus.map((status, index) => ({
          ...status,
          status: results[index].successIdentified ? "Uploaded" : "Failed",
          isError: !results[index].successIdentified,
        })),
      );

      if (results.some((r) => r.successIdentified)) {
        const successfulUploads = results.filter((r) => r.successIdentified);

        setFileContents((prev) => {
          const updated = [...prev];
          successfulUploads.forEach((upload) => {
            const index = updated.findIndex(
              (f) => f.fileName === upload.fileName,
            );
            if (index !== -1) {
              updated[index] = upload;
            }
          });
          return updated;
        });
      }
    } catch (err) {
      handleError(err, {
        component: "FileUploadPage",
        function: "handleFileUpload",
      });
      setError("Upload failed. Please try again.");
      setUploadStatus(
        validFiles.map(({ file }) => ({
          file,
          status: "Failed",
          isError: true,
        })),
      );
    }
  }, [files, userToken]);

  return (
    <div className="container py-4">
      <div
        className={`upload-zone border border-2 border-dashed rounded p-4 mb-4 ${
          isDragging ? "border-primary bg-light" : "border-secondary"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {error && (
          <div
            className="alert alert-danger d-flex align-items-center mb-3"
            role="alert"
          >
            <AlertCircle className="me-2" />
            <div>
              <strong>Error: </strong>
              {error}
            </div>
          </div>
        )}

        <FileInput
          onFileChange={handleFileChange}
          accept={ALLOWED_TYPES.join(",")}
          multiple
          className="mb-3"
        />

        <div className="text-muted small mt-2">
          <p className="mb-1">Drag and drop files here or click to select</p>
          <p className="mb-1">
            Maximum {MAX_FILES} files,{" "}
            {(FILESIZE_MAX / (1024 * 1024)).toFixed(1)}MB each
          </p>
          <p className="mb-0">
            Supported formats: JPG, PNG, PDF, DOC, DOCX, TXT
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <FileList
          files={files}
          uploadStatus={uploadStatus}
          fileContents={fileContents}
        />
      )}

      <UploadButton
        onUpload={handleFileUpload}
        disabled={files.length === 0 || !files.some((f) => f.isValid)}
        className="btn btn-primary mt-3"
      />
    </div>
  );
}
export default FileUploadPage;
