import { element, by, ElementFinder } from 'protractor';

export default class SolutionUpdatePage {
  pageTitle: ElementFinder = element(by.id('isefApp.solution.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#solution-code'));
  versionInput: ElementFinder = element(by.css('input#solution-version'));
  fromInput: ElementFinder = element(by.css('input#solution-from'));
  untilInput: ElementFinder = element(by.css('input#solution-until'));
  summaryInput: ElementFinder = element(by.css('input#solution-summary'));
  descriptionInput: ElementFinder = element(by.css('input#solution-description'));
  issueSelect: ElementFinder = element(by.css('select#solution-issue'));
  expertSelect: ElementFinder = element(by.css('select#solution-expert'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setVersionInput(version) {
    await this.versionInput.sendKeys(version);
  }

  async getVersionInput() {
    return this.versionInput.getAttribute('value');
  }

  async setFromInput(from) {
    await this.fromInput.sendKeys(from);
  }

  async getFromInput() {
    return this.fromInput.getAttribute('value');
  }

  async setUntilInput(until) {
    await this.untilInput.sendKeys(until);
  }

  async getUntilInput() {
    return this.untilInput.getAttribute('value');
  }

  async setSummaryInput(summary) {
    await this.summaryInput.sendKeys(summary);
  }

  async getSummaryInput() {
    return this.summaryInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async issueSelectLastOption() {
    await this.issueSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async issueSelectOption(option) {
    await this.issueSelect.sendKeys(option);
  }

  getIssueSelect() {
    return this.issueSelect;
  }

  async getIssueSelectedOption() {
    return this.issueSelect.element(by.css('option:checked')).getText();
  }

  async expertSelectLastOption() {
    await this.expertSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async expertSelectOption(option) {
    await this.expertSelect.sendKeys(option);
  }

  getExpertSelect() {
    return this.expertSelect;
  }

  async getExpertSelectedOption() {
    return this.expertSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
