import { FileDetailsTable } from "./FileDetailsTable";
import PropTypes from "prop-types";
import React from "react";
import { CheckCircle, XCircle, AlertCircle, ChevronDown } from "lucide-react";

/**
 * @typedef {object} FileInfoType
 * @property {File} file - The uploaded file object.
 * @property {boolean} isValid - Whether the file is valid based on size constraints.
 * @property {string|null} errorMessage - Error message if the file exceeds size constraints, otherwise null.
 */

/**
 * @typedef {object} UploadStatusInfo
 * @property {File} file - Information about the file.
 * @property {string} status - Upload status of the file.
 * @property {boolean} isError - Whether there is an error with the upload.
 */

/**
 * @typedef {object} FileContentInfoType
 * @property {string} filename - The name of the file.
 * @property {string} personName - The name of the person in the file.
 * @property {number} age - The age of the person in the file.
 * @property {string} githubUrl - The GitHub URL of the person.
 * @property {string} linkedinUrl - The LinkedIn URL of the person.
 * @property {string[]} hardSkills - Array of hard skills of the person.
 * @property {string[]} softSkills - Array of soft skills of the person.
 * @property {string} talent - Talent of the person.
 */

const getStatusIcon = (status, isError) => {
  if (status === "Uploaded" && !isError) {
    return <CheckCircle size={18} className="text-success" />;
  }
  if (status === "Failed" || isError) {
    return <XCircle size={18} className="text-danger" />;
  }
  if (status === "Uploading...") {
    return (
      <div
        className="spinner-border spinner-border-sm text-primary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  return <AlertCircle size={18} className="text-warning" />;
};

/**
 * AccordionItem component representing an item in an accordion.
 * @param {object} props - The props passed to the component.
 * @param {FileInfoType} props.item - The item data.
 * @param {UploadStatusInfo[]} props.uploadStatus - Array of upload status information objects.
 * @param {FileContentInfoType[]} props.fileContents - Array of file content information objects.
 * @param {number} props.index - The index of the item.
 * @returns {React.JSX.Element} JSX element representing the AccordionItem component.
 */
export const AccordionItem = ({ item, uploadStatus, fileContents, index }) => {
  const statusInfo = uploadStatus.find((u) => u.file.name === item.file.name);
  const fileInfo = fileContents.find((f) => f.filename === item.file.name);

  return (
    <div className="accordion-item border rounded mb-3">
      <h2 className="accordion-header d-flex" id={`heading-${index}`}>
        <button
          className="accordion-button collapsed p-3 w-100"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${index}`}
          aria-expanded="false"
          aria-controls={`collapse-${index}`}
        >
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              {statusInfo && (
                <span className="me-3">
                  {getStatusIcon(statusInfo.status, statusInfo.isError)}
                </span>
              )}
              <div>
                <div className="fw-medium">{item.file.name}</div>
                <div className="text-muted small">
                  {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              {!item.isValid && (
                <span className="badge bg-danger me-3">
                  {item.errorMessage}
                </span>
              )}
              {statusInfo && (
                <span
                  className={`badge ${
                    statusInfo.isError
                      ? "bg-danger"
                      : statusInfo.status === "Uploaded"
                        ? "bg-success"
                        : "bg-warning"
                  } me-3`}
                >
                  {statusInfo.status}
                </span>
              )}
              <ChevronDown size={18} className="text-muted accordion-icon" />
            </div>
          </div>
        </button>
      </h2>

      <div
        id={`collapse-${index}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading-${index}`}
      >
        <div className="accordion-body bg-light border-top">
          {fileInfo ? (
            <FileDetailsTable fileInfo={fileInfo} />
          ) : (
            <div className="text-center py-4 text-muted">
              <AlertCircle size={24} className="mb-2" />
              <p className="mb-0">File content is not available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  item: PropTypes.object.isRequired,
  uploadStatus: PropTypes.array.isRequired,
  fileContents: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};
