import { getStatusConfig } from "./StatusConfig";
import React, { useCallback } from "react";
import { StatusIndicator } from "./StatusIndicator";
import { formatFileSize, formatDate } from "@/utils/fileUtils";
import PropTypes from "prop-types";
import { JobStatus } from "@/types/files/jobstatus.types";
const FileListRow = React.memo(({ file, style, onClick }) => {
  const statusConfig = getStatusConfig(file.status);

  const handleClick = useCallback(() => {
    onClick(file);
  }, [file, onClick]);

  return (
    <div style={style} className="border-bottom" onClick={handleClick}>
      <div className="d-flex align-items-center h-100 px-3">
        <div className="col d-flex align-items-center gap-2">
          <div className={`p-2 rounded-circle ${statusConfig.className}`}>
            <StatusIndicator status={file.status} />
          </div>
          <div>
            <div className="text-truncate" style={{ maxWidth: "300px" }}>
              {file.fileName}
            </div>
            {file.errorMessage && (
              <small className="text-danger">{file.errorMessage}</small>
            )}
          </div>
        </div>
        <div className="col-2 d-none d-lg-block">
          {formatDate(file.createdAt)}
        </div>
        <div className="col-1 d-none d-lg-block">
          {formatFileSize(file.fileSize)}
        </div>
        <div className="col-2">
          <div className="d-flex align-items-center gap-2">
            {file.status === JobStatus[JobStatus.InProgress] &&
              file.progress && (
                <div
                  className="progress d-none d-lg-flex flex-grow-1"
                  style={{ height: "6px" }}
                >
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated d-none d-lg-block"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              )}
            <span className={`badge rounded-pill ${statusConfig.classNameBg}`}>
              {file.status?.charAt(0).toUpperCase() + file.status?.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

FileListRow.propTypes = {
  file: PropTypes.shape({
    status: PropTypes.string,
    isError: PropTypes.bool,
    fileName: PropTypes.string,
    errorMessage: PropTypes.string,
    createdAt: PropTypes.string,
    fileSize: PropTypes.number,
    progress: PropTypes.number,
  }).isRequired,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

FileListRow.displayName = "FileListRow";

export default FileListRow;
