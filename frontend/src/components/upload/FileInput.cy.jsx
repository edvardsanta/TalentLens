import React from "react";
import FileInput from "./FileInput";

describe("<FileInput />", () => {
  let handleFileChange;

  beforeEach(() => {
    handleFileChange = cy.stub().as("handleFileChange");
    cy.mount(<FileInput onFileChange={handleFileChange} />);
  });

  it("renders input of type file", () => {
    cy.get('input[type="file"]').should("exist");
  });

  it("should call handleFileChange function when files are selected", () => {
    // Create a sample file to upload
    cy.fixture("example.txt").then((fileContent) => {
      const testFile = new File([fileContent], "example.txt", {
        type: "text/plain",
      });

      // Find the file input, trigger the change event with the test file, and verify the stub was called correctly
      cy.get('input[type="file"]').trigger("change", {
        target: { files: [testFile] },
      });
      cy.get("@handleFileChange").should("be.calledOnce");
    });
  });

  it("should allow multiple file selection", () => {
    cy.get('input[type="file"]').should("have.attr", "multiple");
  });

  it("should have correct class for styling", () => {
    cy.get('.input-group.mb-3 input[type="file"]').should("exist");
  });
});
