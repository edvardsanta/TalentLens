import { FileInfo } from "./FileInfo";
import { FileDetailsTable } from "./FileDetailsTable";
import PropTypes from "prop-types";
/**
 * @typedef {Object} FileInfoType
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
 * @typedef {Object} FileContentInfoType
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
 * AccordionItem component representing an item in an accordion.
 * @param {Object} props - The props passed to the component.
 * @param {FileInfoType} props.item - The item data.
 * @param {UploadStatusInfo[]} props.uploadStatus - Array of upload status information objects.
 * @param {FileContentInfoType[]} props.fileContents - Array of file content information objects.
 * @param {number} props.index - The index of the item.
 * @returns {JSX.Element} JSX element representing the AccordionItem component.
 */
export const AccordionItem = ({ item, uploadStatus, fileContents, index }) => {
  const statusInfo = uploadStatus.find((u) => u.file.name === item.file.name);
  const fileInfo = fileContents.find((f) => f.filename === item.file.name);

  return (
    <div className="accordion-item">
      {/* Accordion Header */}
      <h2 className="accordion-header" id={`heading-${index}`}>
        <FileInfo item={item} statusInfo={statusInfo} index={index} />
      </h2>

      {/* Accordion Content */}
      <div
        className="accordion-collapse collapse"
        id={`collapse-${index}`}
        aria-labelledby={`heading-${index}`}
      >
        <div className="accordion-body">
          {fileInfo ? (
            <FileDetailsTable fileInfo={fileInfo} />
          ) : (
            <p>File content is not available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  item: PropTypes.object.isRequired,
  uploadStatus: PropTypes.array.isRequired, 
  fileContents: PropTypes.array.isRequired, 
  index: PropTypes.number.isRequired,
};
