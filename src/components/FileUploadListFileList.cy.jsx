import React from "react";
import FileList from "./FileUploadList";
import { generateFiles, generateUploadStatus, generateFileContents } from "../../cypress/support/helper-functions";

describe("<FileList />", () => {
  beforeEach(() => {  
    var files = generateFiles(20);
    var uploadStatus = generateUploadStatus(files);
    var fileContents = generateFileContents(files);
    cy.mount(
      <FileList
        files={files}
        uploadStatus={uploadStatus}
        fileContents={fileContents}
      />
    );
  });

  it("renders the component with files pdf, txt and docx", () => {
    cy.contains("pdf").should("be.visible");
    cy.contains("docx").should("be.visible");
    cy.contains("txt").should("be.visible");
  });

  it("renders the component with status Uploaded, Pending and Error", () => {
    cy.get(".badge").contains("Uploaded").should("be.visible");
    cy.get(".badge").contains("Pending").should("be.visible");
    cy.get(".badge").contains("Error").should("be.visible");
  });
});
