import React from "react";
import { FileInfo } from "./FileInfo";
import {
  generateRandomFile,
  generateRandomStatusInfo,
  generateRandomIndex,
} from "../../cypress/support/helper-functions";
describe("<FileInfo />", () => {
  let item, statusInfo, index;
  beforeEach(() => {
    item = generateRandomFile();
    statusInfo = generateRandomStatusInfo();
    index = generateRandomIndex();
    cy.mount(<FileInfo item={item} statusInfo={statusInfo} index={index} />);
  });

  it("renders without errors", () => {
    cy.get(".accordion-button").should("exist");
  });

  it("displays file name", () => {
    cy.contains(".col-md-8.text-start", item.file.name).should("exist");
  });

  it("displays validation status icon", () => {
    if (item.isValid) {
      cy.get(".text-success").should("exist");
    } else {
      cy.get(".text-danger").should("exist");
    }
  });

  it("displays upload status badge", () => {
    cy.contains(".badge", statusInfo.status).should("exist");
  });

  it("disables button if not uploaded", () => {
    if (statusInfo.status !== "Uploaded") {
      cy.get(".accordion-button").should("be.disabled");
    }
  });

  it("displays tooltip with error message when hovering over error icon", () => {
    if (!item.isValid) {
      cy.get(`[data-tooltip-id="error-tooltip-${index}"]`).trigger(
        "mouseenter"
      );

      // Wait for the dynamically created tooltip to appear
      cy.get(`#error-tooltip-${index}`).should("exist");

      cy.get(`#error-tooltip-${index}`).should("contain", item.errorMessage);
    }
  });
});
