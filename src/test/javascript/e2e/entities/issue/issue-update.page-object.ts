import { element, by, ElementFinder } from 'protractor';

export default class IssueUpdatePage {
  pageTitle: ElementFinder = element(by.id('isefApp.issue.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#issue-code'));
  dateInput: ElementFinder = element(by.css('input#issue-date'));
  summaryInput: ElementFinder = element(by.css('input#issue-summary'));
  descriptionInput: ElementFinder = element(by.css('input#issue-description'));
  statusSelect: ElementFinder = element(by.css('select#issue-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
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

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
