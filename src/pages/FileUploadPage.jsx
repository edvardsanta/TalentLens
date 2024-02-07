import React, { useState } from 'react';
import FileInput from '../components/FileInput';
import UploadButton from '../components/UploadButton';
import FileList from '../components/FileUploadList';

function FileUploadPage() {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      file,
      isValid: file.size <= 10 * 1024 * 1024,
      errorMessage: file.size > 10 * 1024 * 1024 ? `File '${file.name}' exceeds 10 MB.` : null
    }));
    setFiles(newFiles);
  };

  const handleFileUpload = () => {
    const validFiles = files.filter(f => f.isValid);

    const newUploadStatus = validFiles.map(({ file }) => ({
      file,
      status: 'Uploading...',
      isError: false,
    }));

    setUploadStatus(newUploadStatus);
    if(import.meta.env.VITE_AMBIENT == "local")
    {
      setTimeout(() => {
        const updatedStatus = validFiles.map(({ file }) => ({
          file,
          status: 'Uploaded',
          isError: false,
        }));
        setUploadStatus(updatedStatus);
      }, 2000);
    }  
  };

  return (
     <div className="container mt-5">
     <h1 className="mb-4 text-center">File Upload Page</h1>
     <FileInput onFileChange={handleFileChange} />
     <FileList files={files} uploadStatus={uploadStatus} />
     <UploadButton onUpload={handleFileUpload} />
   </div>
  );
}

export default FileUploadPage;