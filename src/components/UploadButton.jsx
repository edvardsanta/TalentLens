import React from 'react';
const UploadButton = ({ onUpload }) => {
  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
      <button className="btn btn-primary" onClick={onUpload}>Upload</button>
    </div>
  );
};
export default UploadButton;
