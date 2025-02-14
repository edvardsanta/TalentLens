import React, { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import FileListRow from "./FileListRow";
import FileInfoModal from "./FileInfoModal";
import PropTypes from "prop-types";

const FileHistoryViewer = ({ files = [], onItemsRendered }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState({
    field: "createdAt",
    direction: "asc",
  });
  const ROW_HEIGHT = 60;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const filteredFiles = useMemo(() => {
    const uniqueFiles = new Map();
    return files
      .filter((file) => {
        const matchesSearch = file.fileName
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || file.status === statusFilter;

        // Only include if it matches filters and hasn't been seen before
        const isMatch = matchesSearch && matchesStatus;
        if (isMatch) {
          const key = file.fileId || file.fileName;
          if (
            !uniqueFiles.has(key) ||
            (file.createdAt &&
              new Date(file.createdAt) >
                new Date(uniqueFiles.get(key).createdAt))
          ) {
            uniqueFiles.set(key, file);
            return true;
          }
          return false;
        }
        return false;
      })
      .sort((a, b) => {
        const aValue = a[sortBy.field];
        const bValue = b[sortBy.field];
        const multiplier = sortBy.direction === "asc" ? 1 : -1;

        if (sortBy.field === "createdAt") {
          return multiplier * (new Date(bValue || 0) - new Date(aValue || 0));
        }

        if (aValue === bValue) return 0;
        if (aValue == null) return multiplier;
        if (bValue == null) return -multiplier;

        return multiplier * (aValue > bValue ? 1 : -1);
      });
  }, [files, search, statusFilter, sortBy]);

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  const handleRowClick = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

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
              onChange={(e) => {
                setStatusFilter(e.target.value);
              }}
            >
              <option value="all">All Status</option>
              <option value="Completed">Uploaded</option>
              <option value="InProgress">Uploading</option>
              <option value="Canceled">Pending</option>
              <option value="Failed">Error</option>
            </select>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-3 py-2 bg-light border-bottom">
        <div className="row">
          <div className="col">
            <span
              className="cursor-pointer"
              onClick={() => handleSort("fileName")}
            >
              File Info{" "}
              {sortBy.field === "fileName" &&
                (sortBy.direction === "asc" ? "↑" : "↓")}
            </span>
          </div>
          <div className="col-2 d-none d-md-block">
            <span
              className="cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Date{" "}
              {sortBy.field === "createdAt" &&
                (sortBy.direction === "asc" ? "↑" : "↓")}
            </span>
          </div>
          <div className="col-1 d-none d-lg-block">
            <span
              className="cursor-pointer"
              onClick={() => handleSort("fileSize")}
            >
              Size{" "}
              {sortBy.field === "fileSize" &&
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
                onItemsRendered={onItemsRendered}
              >
                {({ index, style }) => (
                  <FileListRow
                    index={index}
                    style={style}
                    file={filteredFiles[index]}
                    onClick={() => handleRowClick(filteredFiles[index])}
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

FileHistoryViewer.propTypes = {
  files: PropTypes.array,
  onItemsRendered: PropTypes.func.isRequired,
};

export default FileHistoryViewer;
