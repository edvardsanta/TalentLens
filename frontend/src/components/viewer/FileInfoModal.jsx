import React from "react";
import PropTypes from "prop-types";
import { StatusIndicator } from "./StatusIndicator";
import { getStatusConfig } from "./StatusConfig";
import { formatFileSize, formatDate } from "@/utils/fileUtils";
import { JobStatus } from "@/types/files/jobstatus.types";

const FileMetadataField = ({ label, value, className = "" }) => (
  <div className={`mb-3 ${className}`}>
    <label className="text-secondary small">{label}</label>
    <div className="fw-medium">{value}</div>
  </div>
);

FileMetadataField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const SkillScoreBar = ({ label, score, color = "primary" }) => {
  if (score == null) return null;

  const isNegative = score < 0;
  const normalizedScore = Math.min(Math.abs(score), 100);

  // Map color prop to Bootstrap classes
  const colorClasses = {
    primary: "bg-primary",
    danger: "bg-danger",
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
  };

  const barColor = colorClasses[color] || colorClasses.primary;
  const textColor = isNegative ? "text-danger" : `text-${color}`;

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-center">
        <span className="small fw-medium text-secondary">{label}</span>
        <span className={`small ${textColor}`}>{score.toFixed(1)}%</span>
      </div>

      <div className="progress">
        <div
          role="progressbar"
          aria-valuenow={normalizedScore}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${label}: ${score}%`}
          className={`progress-bar ${barColor} progress-bar-striped progress-bar-animated`}
          style={{
            width: `${normalizedScore}%`,
            [isNegative ? "right" : "left"]: 0,
          }}
        />
      </div>
    </div>
  );
};

SkillScoreBar.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const SkillScores = ({ scores }) => (
  <div className="space-y-3">
    <SkillScoreBar label="Hard Skills" score={scores.Hard} color="primary" />
    <SkillScoreBar label="Soft Skills" score={scores.Soft} color="success" />
  </div>
);

SkillScores.propTypes = {
  scores: PropTypes.shape({
    Hard: PropTypes.number.isRequired,
    Soft: PropTypes.number.isRequired,
  }).isRequired,
};

const ProgressBar = ({ progress }) => (
  <div className="mt-3">
    <label className="text-secondary small d-flex justify-content-between">
      Upload Progress
      <span>{progress}%</span>
    </label>
    <div className="progress" style={{ height: "3vh" }}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

const FileInfoModal = ({ isOpen, onClose, file }) => {
  if (!isOpen || !file) return null;

  const statusConfig = getStatusConfig(file.status);
  const dominantSkill =
    file.skillScores.Hard < file.skillScores.Soft ? "Soft" : "Hard";

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title d-flex align-items-center gap-2">
              <div className={`p-2 rounded-circle ${statusConfig.className}`}>
                <StatusIndicator status={file.status} size={20} />
              </div>
              {file.fileName}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <FileMetadataField
                  label="Status"
                  value={
                    <span className={`badge ${statusConfig.classNameBg}`}>
                      {file.status}
                    </span>
                  }
                />
              </div>

              <div className="col-md-6">
                <FileMetadataField
                  label="Size"
                  value={formatFileSize(file.fileSize)}
                />
              </div>

              <div className="col-md-6">
                <FileMetadataField
                  label="Score"
                  value={`${dominantSkill} Skill`}
                />
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="text-secondary small">Skills Score</label>
                  <SkillScores scores={file.skillScores} />
                </div>
              </div>

              <div className="col-md-6">
                <FileMetadataField
                  label="Upload Date"
                  value={formatDate(file.createdAt)}
                />
              </div>

              <div className="col-md-6">
                <FileMetadataField
                  label="Type"
                  value={file.fileExtension || "Unknown"}
                />
              </div>
            </div>

            {file.errorMessage && (
              <div className="alert alert-danger mt-3">
                <h6 className="alert-heading">Error Message:</h6>
                <p className="mb-0">{file.errorMessage}</p>
              </div>
            )}

            {JobStatus[JobStatus.InProgress] === file.status &&
              file.progress && <ProgressBar progress={file.progress} />}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FileInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  file: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    status: PropTypes.string,
    isError: PropTypes.bool,
    fileSize: PropTypes.number,
    fileExtension: PropTypes.string,
    createdAt: PropTypes.string,
    errorMessage: PropTypes.string,
    progress: PropTypes.number,
    skillScores: PropTypes.shape({
      Hard: PropTypes.number,
      Soft: PropTypes.number,
    }).isRequired,
  }),
};

export default FileInfoModal;
