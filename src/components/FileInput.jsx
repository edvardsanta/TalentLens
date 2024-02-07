import React from 'react';

const FileInput = ({ onFileChange }) => {
  return (
    <div className="input-group mb-3">
      <input type="file" className="form-control" id="inputGroupFile" onChange={onFileChange} multiple />
    </div>
  );
};

export default FileInput;