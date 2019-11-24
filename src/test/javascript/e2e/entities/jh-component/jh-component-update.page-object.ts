import { element, by, ElementFinder } from 'protractor';

export default class JHComponentUpdatePage {
  pageTitle: ElementFinder = element(by.id('isefApp.jHComponent.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#jh-component-code'));
  nameInput: ElementFinder = element(by.css('input#jh-component-name'));
  summaryInput: ElementFinder = element(by.css('input#jh-component-summary'));
  descriptionInput: ElementFinder = element(by.css('input#jh-component-description'));
  applicationSelect: ElementFinder = element(by.css('select#jh-component-application'));
  groupSelect: ElementFinder = element(by.css('select#jh-component-group'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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

  async applicationSelectLastOption() {
    await this.applicationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async applicationSelectOption(option) {
    await this.applicationSelect.sendKeys(option);
  }

  getApplicationSelect() {
    return this.applicationSelect;
  }

  async getApplicationSelectedOption() {
    return this.applicationSelect.element(by.css('option:checked')).getText();
  }

  async groupSelectLastOption() {
    await this.groupSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async groupSelectOption(option) {
    await this.groupSelect.sendKeys(option);
  }

  getGroupSelect() {
    return this.groupSelect;
  }

  async getGroupSelectedOption() {
    return this.groupSelect.element(by.css('option:checked')).getText();
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
