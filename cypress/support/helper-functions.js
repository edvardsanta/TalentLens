import Chance from "chance";

const chance = new Chance();

export const generateFiles = (numFiles) => {
  return Array.from({ length: numFiles }, () => ({
    file: {
      name:
        chance.word({ syllables: 3 }) +
        chance.pickone([".txt", ".pdf", ".docx"]),
    },
    isValid: chance.bool(),
    errorMessage: chance.sentence(),
  }));
};

export const generateUploadStatus = (files) => {
  return files.map((file) => ({
    file: file.file,
    status: chance.pickone(["Uploaded", "Pending", "Error"]),
    isError: file.isValid ? false : true,
  }));
};

// Function to generate file contents, only for valid and uploaded files
export const generateFileContents = (files) => {
  return files
    .filter((file) => file.isValid)
    .map((file) => ({
      filename: file.file.name,
      personName: chance.name(),
      age: chance.age(),
      githubUrl: chance.url({ domain: "github.com" }),
      linkedinUrl: chance.url({ domain: "linkedin.com" }),
      hardSkills: chance.unique(chance.profession, 3),
      softSkills: chance.unique(chance.word, 3),
      talent: chance.word(),
    }));
};




export const generateRandomFile = () => ({
  file: { name: chance.word() + '.txt' }, 
  isValid: chance.bool(), 
  errorMessage: chance.bool() ? chance.sentence() : null, 
});

export const generateRandomStatusInfo = () => ({
  file: generateRandomFile().file,
  status: chance.pickone(['Uploaded', 'Pending', 'Error']), 
  isError: chance.bool(), 
});

export const generateRandomIndex = () => chance.integer({ min: 0, max: 100 });