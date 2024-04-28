import PropTypes from 'prop-types'; 
import { AccordionItem } from "./AccordionItem";
/**
 * @typedef {Object} FileInfo
 * @property {File} file - The uploaded file object.
 * @property {boolean} isValid - Whether the file is valid based on size constraints.
 * @property {string|null} errorMessage - Error message if the file exceeds size constraints, otherwise null.
 */

/**
 * @typedef {Object} UploadStatusInfo
 * @property {File} file - Information about the file.
 * @property {string} status - Upload status of the file.
 * @property {boolean} isError - Whether there is an error with the upload.
 */

/**
 * @typedef {Object} FileContentInfo
 * @property {string} filename - The name of the file.
 * @property {string} personName - The name of the person in the file.
 * @property {number} age - The age of the person in the file.
 * @property {string} githubUrl - The GitHub URL of the person.
 * @property {string} linkedinUrl - The LinkedIn URL of the person.
 * @property {string[]} hardSkills - Array of hard skills of the person.
 * @property {string[]} softSkills - Array of soft skills of the person.
 * @property {string} talent - Talent of the person.
 */

/**
 * FileList component displays a list of files with their upload status and detailed information.
 * @param {Object} props - The props passed to the component.
 * @param {FileInfo[]} props.files - Array of file information objects.
 * @param {UploadStatusInfo[]} props.uploadStatus - Array of upload status information objects.
 * @param {FileContentInfo[]} props.fileContents - Array of file content information objects.
 * @returns {JSX.Element} JSX element representing the FileList component.
 */
const FileList = ({ files, uploadStatus, fileContents }) => {
  return (
    <div className="accordion" id="fileAccordion">
      {files.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          uploadStatus={uploadStatus}
          fileContents={fileContents}
          index={index}
        />
      ))}
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.array.isRequired, 
  uploadStatus: PropTypes.array.isRequired,
  fileContents: PropTypes.array.isRequired,
};
export default FileList;
