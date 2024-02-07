import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';
const FileList = ({ files, uploadStatus }) => {
  return (
    <ul className="list-group mt-3">
      {files.map((item, index) => (
        <li key={index} className="list-group-item">
          <div className="row align-items-center">
            {/* File name column */}
            <div className="col text-start">
              {item.file.name}
            </div>

            {/* Icon column
              This represent the error in frontend
            */}
            <div className="col text-center">
              {item.isValid ? (
                <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
              ) : (
                <>
                  <FontAwesomeIcon 
                    icon={faTimesCircle} 
                    className="text-danger"
                    data-tooltip-id={`error-tooltip-${index}`} 
                    data-tooltip-content={item.errorMessage}
                  />
                  <Tooltip id={`error-tooltip-${index}`} />
                </>
              )}
            </div>

            {/* Status column 
               This represent the response error/success in backend
            */}
            <div className="col text-end">
              <span className={`badge ${uploadStatus.find(u => u.file.name === item.file.name)?.isError ? 'bg-danger' : 'bg-success'} rounded-pill`}>
                {uploadStatus.find(u => u.file.name === item.file.name)?.status || 'Pending'}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default FileList;