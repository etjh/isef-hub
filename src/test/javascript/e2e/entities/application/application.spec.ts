import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApplicationComponentsPage, { ApplicationDeleteDialog } from './application.page-object';
import ApplicationUpdatePage from './application-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Application e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let applicationComponentsPage: ApplicationComponentsPage;
  let applicationUpdatePage: ApplicationUpdatePage;
  let applicationDeleteDialog: ApplicationDeleteDialog;

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

  it('should load Applications', async () => {
    await navBarPage.getEntityPage('application');
    applicationComponentsPage = new ApplicationComponentsPage();
    expect(await applicationComponentsPage.getTitle().getText()).to.match(/Applications/);
  });

  it('should load create Application page', async () => {
    await applicationComponentsPage.clickOnCreateButton();
    applicationUpdatePage = new ApplicationUpdatePage();
    expect(await applicationUpdatePage.getPageTitle().getAttribute('id')).to.match(/isefApp.application.home.createOrEditLabel/);
    await applicationUpdatePage.cancel();
  });

  it('should create and save Applications', async () => {
    async function createApplication() {
      await applicationComponentsPage.clickOnCreateButton();
      await applicationUpdatePage.setNameInput('name');
      expect(await applicationUpdatePage.getNameInput()).to.match(/name/);
      await applicationUpdatePage.setDescriptionInput('description');
      expect(await applicationUpdatePage.getDescriptionInput()).to.match(/description/);
      await applicationUpdatePage.ownerSelectLastOption();
      await waitUntilDisplayed(applicationUpdatePage.getSaveButton());
      await applicationUpdatePage.save();
      await waitUntilHidden(applicationUpdatePage.getSaveButton());
      expect(await applicationUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createApplication();
    await applicationComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await applicationComponentsPage.countDeleteButtons();
    await createApplication();

    await applicationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await applicationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Application', async () => {
    await applicationComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await applicationComponentsPage.countDeleteButtons();
    await applicationComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    applicationDeleteDialog = new ApplicationDeleteDialog();
    expect(await applicationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/isefApp.application.delete.question/);
    await applicationDeleteDialog.clickOnConfirmButton();

    await applicationComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await applicationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
