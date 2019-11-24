import { element, by, ElementFinder } from 'protractor';

export default class JHInterfaceUpdatePage {
  pageTitle: ElementFinder = element(by.id('isefApp.jHInterface.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#jh-interface-code'));
  nameInput: ElementFinder = element(by.css('input#jh-interface-name'));
  summaryInput: ElementFinder = element(by.css('input#jh-interface-summary'));
  descriptionInput: ElementFinder = element(by.css('input#jh-interface-description'));
  producerSelect: ElementFinder = element(by.css('select#jh-interface-producer'));
  consumerSelect: ElementFinder = element(by.css('select#jh-interface-consumer'));

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

  async producerSelectLastOption() {
    await this.producerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async producerSelectOption(option) {
    await this.producerSelect.sendKeys(option);
  }

  getProducerSelect() {
    return this.producerSelect;
  }

  async getProducerSelectedOption() {
    return this.producerSelect.element(by.css('option:checked')).getText();
  }

  async consumerSelectLastOption() {
    await this.consumerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async consumerSelectOption(option) {
    await this.consumerSelect.sendKeys(option);
  }

  getConsumerSelect() {
    return this.consumerSelect;
  }

  async getConsumerSelectedOption() {
    return this.consumerSelect.element(by.css('option:checked')).getText();
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
