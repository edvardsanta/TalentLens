import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a centered upload button that calls the provided `onUpload` function when clicked.
 * @param {object} props - The component props.
 * @param {Function} props.onUpload - The function to call when the upload button is clicked.
 * @returns {React.JSX.Element} - The upload button component.
 */
const UploadButton = ({ onUpload }) => {
  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
      <button className="btn btn-primary" onClick={onUpload}>
        Upload
      </button>
    </div>
  );
};

UploadButton.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default UploadButton;
