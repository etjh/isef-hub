import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExpertComponentsPage, { ExpertDeleteDialog } from './expert.page-object';
import ExpertUpdatePage from './expert-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Expert e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let expertComponentsPage: ExpertComponentsPage;
  let expertUpdatePage: ExpertUpdatePage;
  let expertDeleteDialog: ExpertDeleteDialog;

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

  it('should load Experts', async () => {
    await navBarPage.getEntityPage('expert');
    expertComponentsPage = new ExpertComponentsPage();
    expect(await expertComponentsPage.getTitle().getText()).to.match(/Experts/);
  });

  it('should load create Expert page', async () => {
    await expertComponentsPage.clickOnCreateButton();
    expertUpdatePage = new ExpertUpdatePage();
    expect(await expertUpdatePage.getPageTitle().getAttribute('id')).to.match(/isefApp.expert.home.createOrEditLabel/);
    await expertUpdatePage.cancel();
  });

  it('should create and save Experts', async () => {
    async function createExpert() {
      await expertComponentsPage.clickOnCreateButton();
      await expertUpdatePage.setNameInput('name');
      expect(await expertUpdatePage.getNameInput()).to.match(/name/);
      await expertUpdatePage.setContactDetailsInput('contactDetails');
      expect(await expertUpdatePage.getContactDetailsInput()).to.match(/contactDetails/);
      await expertUpdatePage.groupSelectLastOption();
      await expertUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(expertUpdatePage.getSaveButton());
      await expertUpdatePage.save();
      await waitUntilHidden(expertUpdatePage.getSaveButton());
      expect(await expertUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createExpert();
    await expertComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await expertComponentsPage.countDeleteButtons();
    await createExpert();

    await expertComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await expertComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Expert', async () => {
    await expertComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await expertComponentsPage.countDeleteButtons();
    await expertComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    expertDeleteDialog = new ExpertDeleteDialog();
    expect(await expertDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/isefApp.expert.delete.question/);
    await expertDeleteDialog.clickOnConfirmButton();

    await expertComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await expertComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
