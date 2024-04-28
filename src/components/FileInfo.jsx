import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import PropTypes from "prop-types";

/**
 * @typedef {Object} FileInfoType
 * @property {File} file - The uploaded file object.
 * @property {boolean} isValid - Whether the file is valid based on size constraints.
 * @property {string|null} errorMessage - Error message if the file exceeds size constraints, otherwise null.
 */

/**
 * @typedef {Object} UploadStatusInfo
 * @property {File} file - Information about the file.
 * @property {string} status - Upload status of the file.
 * @property {boolean} isError - Whether there is an error with the upload.
 */

/**
 * FileInfo component representing detailed file information.
 * @param {Object} props - The props passed to the component.
 * @param {FileInfo} props.item - The file item data.
 * @param {UploadStatusInfo} props.statusInfo - The status information of the file.
 * @param {number} props.index - The index of the item.
 * @returns {JSX.Element} JSX element representing the FileInfo component.
 */
export const FileInfo = ({ item, statusInfo, index }) => {
  const isUploaded = statusInfo?.status === "Uploaded";
  const statusClass = statusInfo?.isError
    ? "bg-danger"
    : statusInfo?.status === "Pending"
    ? "bg-warning"
    : "bg-success";

  return (
    <button
      className="accordion-button"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#collapse-${index}`}
      aria-expanded="false"
      aria-controls={`collapse-${index}`}
      disabled={!isUploaded}
    >
      {/* File Info */}
      <div className="row align-items-center w-100">
        {/* File name */}
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
  );
};
FileInfo.propTypes = {
  item: PropTypes.object.isRequired,
  statusInfo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
