import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

const FileList = ({ files, uploadStatus, fileContents }) => {
  const handleAccordionClick = (status, event) => {
    if (status === "Uploaded") {
      const collapseElement = document.getElementById(targetId);
      if (collapseElement.classList.contains("show")) {
        new bootstrap.Collapse(collapseElement, { toggle: true });
      } else {
        new bootstrap.Collapse(collapseElement, { toggle: true });
      }
    }
  };

  return (
    <div className="accordion" id="fileAccordion">
      {files.map((item, index) => {
        const statusInfo = uploadStatus.find(
          (u) => u.file.name === item.file.name
        );
        const isUploaded = statusInfo?.status === "Uploaded";
        const statusClass = statusInfo?.isError
          ? "bg-danger"
          : statusInfo?.status === "Pending"
          ? "bg-warning"
          : "bg-success";
        const targetId = `collapse-${index}`;
        const fileInfo = fileContents.find(
          (f) => f.filename === item.file.name
        );
        return (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading-${index}`}>
              {/* Clickable row */}
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${targetId}`}
                aria-expanded="false"
                aria-controls={targetId}
                disabled={!isUploaded}
              >
                <div className="row align-items-center w-100">
                  {/* File name column */}
                  <div className="col-md-8 text-start">{item.file.name}</div>

                  {/* Validation and Upload Status */}
                  <div className="col-md-4 text-end">
                    {/* Validation Status */}
                    {item.isValid ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-success me-2"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="text-danger me-2"
                        data-tooltip-id={`error-tooltip-${index}`}
                        data-tooltip-content={item.errorMessage}
                      />
                    )}
                    <Tooltip id={`error-tooltip-${index}`} />
                    {/* Upload Status */}
                    <span className={`badge rounded-pill ${statusClass}`}>
                      {statusInfo?.status}
                    </span>
                  </div>
                </div>
              </button>
            </h2>

            {/* Accordion content */}
            <div
              id={targetId}
              className="accordion-collapse collapse"
              data-bs-parent="#fileAccordion"
            >
              {/* TODO: Create a table to render file infos */}
              <div className="accordion-body">
                Detailed information about {item.file.name}
                {fileInfo && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>GitHub URL</th>
                        <th>LinkedIn URL</th>
                        <th>Hard Skills</th>
                        <th>Soft Skills</th>
                        <th>Talent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{fileInfo.personName}</td>
                        <td>{fileInfo.age}</td>
                        <td>
                          <a href={fileInfo.githubUrl} target="_blank">
                            GitHub
                          </a>
                        </td>
                        <td>
                          <a href={fileInfo.linkedinUrl} target="_blank">
                            LinkedIn
                          </a>
                        </td>
                        <td>{fileInfo.hardSkills.join(", ")}</td>
                        <td>{fileInfo.softSkills.join(", ")}</td>
                        <td>{fileInfo.talent}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {!fileInfo && <p>File content is not available yet.</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FileList;
