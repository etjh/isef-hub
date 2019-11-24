import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JHInterfaceComponentsPage, { JHInterfaceDeleteDialog } from './jh-interface.page-object';
import JHInterfaceUpdatePage from './jh-interface-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('JHInterface e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jHInterfaceComponentsPage: JHInterfaceComponentsPage;
  let jHInterfaceUpdatePage: JHInterfaceUpdatePage;
  let jHInterfaceDeleteDialog: JHInterfaceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load JHInterfaces', async () => {
    await navBarPage.getEntityPage('jh-interface');
    jHInterfaceComponentsPage = new JHInterfaceComponentsPage();
    expect(await jHInterfaceComponentsPage.getTitle().getText()).to.match(/JH Interfaces/);
  });

  it('should load create JHInterface page', async () => {
    await jHInterfaceComponentsPage.clickOnCreateButton();
    jHInterfaceUpdatePage = new JHInterfaceUpdatePage();
    expect(await jHInterfaceUpdatePage.getPageTitle().getAttribute('id')).to.match(/isefApp.jHInterface.home.createOrEditLabel/);
    await jHInterfaceUpdatePage.cancel();
  });

  it('should create and save JHInterfaces', async () => {
    async function createJHInterface() {
      await jHInterfaceComponentsPage.clickOnCreateButton();
      await jHInterfaceUpdatePage.setCodeInput('code');
      expect(await jHInterfaceUpdatePage.getCodeInput()).to.match(/code/);
      await jHInterfaceUpdatePage.setNameInput('name');
      expect(await jHInterfaceUpdatePage.getNameInput()).to.match(/name/);
      await jHInterfaceUpdatePage.setSummaryInput('summary');
      expect(await jHInterfaceUpdatePage.getSummaryInput()).to.match(/summary/);
      await jHInterfaceUpdatePage.setDescriptionInput('description');
      expect(await jHInterfaceUpdatePage.getDescriptionInput()).to.match(/description/);
      await jHInterfaceUpdatePage.producerSelectLastOption();
      await jHInterfaceUpdatePage.consumerSelectLastOption();
      await waitUntilDisplayed(jHInterfaceUpdatePage.getSaveButton());
      await jHInterfaceUpdatePage.save();
      await waitUntilHidden(jHInterfaceUpdatePage.getSaveButton());
      expect(await jHInterfaceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createJHInterface();
    await jHInterfaceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await jHInterfaceComponentsPage.countDeleteButtons();
    await createJHInterface();

    await jHInterfaceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await jHInterfaceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last JHInterface', async () => {
    await jHInterfaceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await jHInterfaceComponentsPage.countDeleteButtons();
    await jHInterfaceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    jHInterfaceDeleteDialog = new JHInterfaceDeleteDialog();
    expect(await jHInterfaceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/isefApp.jHInterface.delete.question/);
    await jHInterfaceDeleteDialog.clickOnConfirmButton();

    await jHInterfaceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await jHInterfaceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
