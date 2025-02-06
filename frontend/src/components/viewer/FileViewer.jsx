import React, { useState, useMemo, useCallback } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Upload,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const FileInfoModal = ({ isOpen, onClose, file }) => {
  if (!file) return null;

  const getStatusIcon = (status, isError) => {
    if (isError) return <XCircle className="text-danger" size={20} />;
    switch (status?.toLowerCase()) {
      case "uploaded":
        return <CheckCircle2 className="text-success" size={20} />;
      case "uploading":
        return <Upload className="text-primary" size={20} />;
      case "pending":
        return <Clock className="text-warning" size={20} />;
      default:
        return <AlertCircle className="text-secondary" size={20} />;
    }
  };

  const getStatusBadgeClass = (status, isError) => {
    if (isError) return "bg-danger-subtle text-danger";
    switch (status?.toLowerCase()) {
      case "uploaded":
        return "bg-success-subtle text-success";
      case "uploading":
        return "bg-primary-subtle text-primary";
      case "pending":
        return "bg-warning-subtle text-warning";
      default:
        return "bg-secondary-subtle text-secondary";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  if (!isOpen) return null;

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
              <div
                className={`p-2 rounded-circle ${getStatusBadgeClass(
                  file.status,
                  file.isError,
                )}`}
              >
                {getStatusIcon(file.status, file.isError)}
              </div>
              {file.name}
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
                <div className="mb-3">
                  <label className="text-secondary small">Status</label>
                  <div>
                    <span
                      className={`badge ${getStatusBadgeClass(
                        file.status,
                        file.isError,
                      )}`}
                    >
                      {file.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="text-secondary small">Size</label>
                  <div className="fw-medium">{formatFileSize(file.size)}</div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="text-secondary small">Upload Date</label>
                  <div className="fw-medium">{formatDate(file.uploadedAt)}</div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="text-secondary small">Type</label>
                  <div className="fw-medium">{file.type || "Unknown"}</div>
                </div>
              </div>
            </div>

            {file.errorMessage && (
              <div className="alert alert-danger mt-3">
                <h6 className="alert-heading">Error Message:</h6>
                <p className="mb-0">{file.errorMessage}</p>
              </div>
            )}

            {file.status === "uploading" && file.progress && (
              <div className="mt-3">
                <label className="text-secondary small d-flex justify-content-between">
                  Upload Progress
                  <span>{file.progress}%</span>
                </label>
                <div className="progress" style={{ height: "6px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
            )}
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

const FileHistoryViewer = ({ files = [] }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState({
    field: "uploadedAt",
    direction: "desc",
  });
  const ROW_HEIGHT = 60;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const getStatusIcon = (status, isError) => {
    if (isError) return <XCircle className="text-danger" size={20} />;
    switch (status?.toLowerCase()) {
      case "uploaded":
        return <CheckCircle2 className="text-success" size={20} />;
      case "uploading":
        return <Upload className="text-primary" size={20} />;
      case "pending":
        return <Clock className="text-warning" size={20} />;
      default:
        return <AlertCircle className="text-secondary" size={20} />;
    }
  };

  const getStatusBadgeClass = (status, isError) => {
    if (isError) return "bg-danger-subtle text-danger";
    switch (status?.toLowerCase()) {
      case "uploaded":
        return "bg-success-subtle text-success";
      case "uploading":
        return "bg-primary-subtle text-primary";
      case "pending":
        return "bg-warning-subtle text-warning";
      default:
        return "bg-secondary-subtle text-secondary";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString();
  };

  // Filter and sort files
  const filteredFiles = useMemo(() => {
    return files
      .filter((file) => {
        const matchesSearch = file.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || file.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = a[sortBy.field];
        const bValue = b[sortBy.field];
        const multiplier = sortBy.direction === "asc" ? 1 : -1;

        if (sortBy.field === "uploadedAt") {
          return multiplier * (new Date(bValue || 0) - new Date(aValue || 0));
        }
        return multiplier * ((aValue || "") > (bValue || "") ? 1 : -1);
      });
  }, [files, search, statusFilter, sortBy]);

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const Row = useCallback(
    ({ index, style }) => {
      const file = filteredFiles[index];
      if (!file) return null;
      const handleRowClick = () => {
        console.log("Row clicked:", file);
        setSelectedFile(file);
        setIsModalOpen(true);
      };
      return (
        <div style={style} className="border-bottom" onClick={handleRowClick}>
          <div className="d-flex align-items-center h-100 px-3">
            <div className="col d-flex align-items-center gap-2">
              <div
                className={`p-2 rounded-circle ${getStatusBadgeClass(
                  file.status,
                  file.isError,
                )}`}
              >
                {getStatusIcon(file.status, file.isError)}
              </div>
              <div>
                <div className="text-truncate" style={{ maxWidth: "300px" }}>
                  {file.name}
                </div>
                {file.errorMessage && (
                  <small className="text-danger">{file.errorMessage}</small>
                )}
              </div>
            </div>
            <div className="col-2 d-none d-lg-block">
              {formatDate(file.uploadedAt)}
            </div>
            <div className="col-1 d-none d-lg-block">
              {formatFileSize(file.size)}
            </div>
            <div className="col-2">
              <div className="d-flex align-items-center gap-2">
                {file.status === "uploading" && file.progress && (
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
                <span
                  className={`badge rounded-pill ${getStatusBadgeClass(
                    file.status,
                    file.isError,
                  )}`}
                >
                  {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    },
    [filteredFiles],
  );

  return (
    <div className="d-flex flex-column gap-4">
      {/* Search and Filters */}
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <Search size={20} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <Filter size={20} />
            </span>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="uploaded">Uploaded</option>
              <option value="uploading">Uploading</option>
              <option value="pending">Pending</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-3 py-2 bg-light border-bottom">
        <div className="row">
          <div className="col">
            <span className="cursor-pointer" onClick={() => handleSort("name")}>
              File Info{" "}
              {sortBy.field === "name" &&
                (sortBy.direction === "asc" ? "↑" : "↓")}
            </span>
          </div>
          <div className="col-2 d-none d-md-block">
            <span
              className="cursor-pointer"
              onClick={() => handleSort("uploadedAt")}
            >
              Date{" "}
              {sortBy.field === "uploadedAt" &&
                (sortBy.direction === "asc" ? "↑" : "↓")}
            </span>
          </div>
          <div className="col-1 d-none d-lg-block">
            <span className="cursor-pointer" onClick={() => handleSort("size")}>
              Size{" "}
              {sortBy.field === "size" &&
                (sortBy.direction === "asc" ? "↑" : "↓")}
            </span>
          </div>
          <div className="col-2">Status</div>
        </div>
      </div>

      {/* Virtualized List Container */}
      {filteredFiles.length > 0 ? (
        <div style={{ height: "75vh" }} className="virtualized-list-container">
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={filteredFiles.length}
                itemSize={ROW_HEIGHT}
                width={width}
              >
                {({ index, style }) => (
                  <Row
                    index={index}
                    style={style}
                    file={filteredFiles[index]}
                    onRowClick={(file) => {
                      setSelectedFile(file);
                      setIsModalOpen(true);
                    }}
                  />
                )}
              </List>
            )}
          </AutoSizer>
        </div>
      ) : (
        <div className="text-center p-4 bg-light rounded">
          <p className="text-secondary m-0">No files found</p>
        </div>
      )}

      {/* Modal */}
      <FileInfoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFile(null);
        }}
        file={selectedFile}
      />
    </div>
  );
};

export default FileHistoryViewer;
