import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

const FileList = ({ files, uploadStatus }) => {
  return (
    <div className="accordion" id="fileAccordion">
      {files.map((item, index) => {
        const statusInfo = uploadStatus.find(
          (u) => u.file.name === item.file.name
        );
        const statusClass = statusInfo?.isError
          ? "bg-danger"
          : statusInfo?.status === "Pending"
          ? "bg-warning"
          : "bg-success";
        const targetId = `collapse-${index}`;

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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FileList;