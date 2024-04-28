import PropTypes from 'prop-types';
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
 * FileDetailsTable component for rendering detailed file information.
 * @param {Object} props - The props passed to the component.
 * @param {FileInfoType} props.fileInfo - The detailed information about the file.
 * @returns {JSX.Element} - JSX element representing the FileDetailsTable component.
 */
export const FileDetailsTable = ({ fileInfo }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>GitHub URL</th>
        <th>LinkedIn URL</th>
        <th>Hard Skills</th>
        <th>Soft Skills</th>
        <th>Talent</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{fileInfo.personName}</td>
        <td>{fileInfo.age}</td>
        <td>
          <a href={fileInfo.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </td>
        <td>
          <a href={fileInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </td>
        <td>{fileInfo.hardSkills.join(", ")}</td>
        <td>{fileInfo.softSkills.join(", ")}</td>
        <td>{fileInfo.talent}</td>
      </tr>
    </tbody>
  </table>
);

FileDetailsTable.propTypes = {
  fileInfo: PropTypes.shape({
    personName: PropTypes.string.isRequired,
    age: PropTypes.number,
    githubUrl: PropTypes.string,
    linkedinUrl: PropTypes.string,
    hardSkills: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    softSkills: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    talent: PropTypes.string.isRequired,
  }).isRequired,
};
