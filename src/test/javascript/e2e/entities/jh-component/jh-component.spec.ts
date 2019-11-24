import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import JHComponentComponentsPage, { JHComponentDeleteDialog } from './jh-component.page-object';
import JHComponentUpdatePage from './jh-component-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('JHComponent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jHComponentComponentsPage: JHComponentComponentsPage;
  let jHComponentUpdatePage: JHComponentUpdatePage;
  let jHComponentDeleteDialog: JHComponentDeleteDialog;

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

  it('should load JHComponents', async () => {
    await navBarPage.getEntityPage('jh-component');
    jHComponentComponentsPage = new JHComponentComponentsPage();
    expect(await jHComponentComponentsPage.getTitle().getText()).to.match(/JH Components/);
  });

  it('should load create JHComponent page', async () => {
    await jHComponentComponentsPage.clickOnCreateButton();
    jHComponentUpdatePage = new JHComponentUpdatePage();
    expect(await jHComponentUpdatePage.getPageTitle().getAttribute('id')).to.match(/isefApp.jHComponent.home.createOrEditLabel/);
    await jHComponentUpdatePage.cancel();
  });

  it('should create and save JHComponents', async () => {
    async function createJHComponent() {
      await jHComponentComponentsPage.clickOnCreateButton();
      await jHComponentUpdatePage.setCodeInput('code');
      expect(await jHComponentUpdatePage.getCodeInput()).to.match(/code/);
      await jHComponentUpdatePage.setNameInput('name');
      expect(await jHComponentUpdatePage.getNameInput()).to.match(/name/);
      await jHComponentUpdatePage.setSummaryInput('summary');
      expect(await jHComponentUpdatePage.getSummaryInput()).to.match(/summary/);
      await jHComponentUpdatePage.setDescriptionInput('description');
      expect(await jHComponentUpdatePage.getDescriptionInput()).to.match(/description/);
      await jHComponentUpdatePage.applicationSelectLastOption();
      await jHComponentUpdatePage.groupSelectLastOption();
      await waitUntilDisplayed(jHComponentUpdatePage.getSaveButton());
      await jHComponentUpdatePage.save();
      await waitUntilHidden(jHComponentUpdatePage.getSaveButton());
      expect(await jHComponentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createJHComponent();
    await jHComponentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await jHComponentComponentsPage.countDeleteButtons();
    await createJHComponent();

    await jHComponentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await jHComponentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last JHComponent', async () => {
    await jHComponentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await jHComponentComponentsPage.countDeleteButtons();
    await jHComponentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    jHComponentDeleteDialog = new JHComponentDeleteDialog();
    expect(await jHComponentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/isefApp.jHComponent.delete.question/);
    await jHComponentDeleteDialog.clickOnConfirmButton();

    await jHComponentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await jHComponentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
