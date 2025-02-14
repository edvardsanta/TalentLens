import PropTypes from "prop-types";
import React from "react";
/**
 * FileInput component for uploading files.
 * @param {object} props - The props passed to the component.
 * @param {Function} props.onFileChange - Function to handle file change event.
 * @returns {React.JSX.Element} FileInput component.
 */
const FileInput = ({ onFileChange }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="file"
        className="form-control"
        id="inputGroupFile"
        onChange={onFileChange}
        multiple
      />
    </div>
  );
};

FileInput.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};

export default FileInput;
