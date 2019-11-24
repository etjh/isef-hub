import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IssueComponentsPage, { IssueDeleteDialog } from './issue.page-object';
import IssueUpdatePage from './issue-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Issue e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let issueComponentsPage: IssueComponentsPage;
  let issueUpdatePage: IssueUpdatePage;
  let issueDeleteDialog: IssueDeleteDialog;

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

  it('should load Issues', async () => {
    await navBarPage.getEntityPage('issue');
    issueComponentsPage = new IssueComponentsPage();
    expect(await issueComponentsPage.getTitle().getText()).to.match(/Issues/);
  });

  it('should load create Issue page', async () => {
    await issueComponentsPage.clickOnCreateButton();
    issueUpdatePage = new IssueUpdatePage();
    expect(await issueUpdatePage.getPageTitle().getAttribute('id')).to.match(/isefApp.issue.home.createOrEditLabel/);
    await issueUpdatePage.cancel();
  });

  it('should create and save Issues', async () => {
    async function createIssue() {
      await issueComponentsPage.clickOnCreateButton();
      await issueUpdatePage.setCodeInput('code');
      expect(await issueUpdatePage.getCodeInput()).to.match(/code/);
      await issueUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await issueUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await issueUpdatePage.setSummaryInput('summary');
      expect(await issueUpdatePage.getSummaryInput()).to.match(/summary/);
      await issueUpdatePage.setDescriptionInput('description');
      expect(await issueUpdatePage.getDescriptionInput()).to.match(/description/);
      await issueUpdatePage.statusSelectLastOption();
      await waitUntilDisplayed(issueUpdatePage.getSaveButton());
      await issueUpdatePage.save();
      await waitUntilHidden(issueUpdatePage.getSaveButton());
      expect(await issueUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createIssue();
    await issueComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await issueComponentsPage.countDeleteButtons();
    await createIssue();

    await issueComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await issueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Issue', async () => {
    await issueComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await issueComponentsPage.countDeleteButtons();
    await issueComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    issueDeleteDialog = new IssueDeleteDialog();
    expect(await issueDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/isefApp.issue.delete.question/);
    await issueDeleteDialog.clickOnConfirmButton();

    await issueComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await issueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
