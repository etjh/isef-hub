import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SolutionComponentsPage, { SolutionDeleteDialog } from './solution.page-object';
import SolutionUpdatePage from './solution-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Solution e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let solutionComponentsPage: SolutionComponentsPage;
  let solutionUpdatePage: SolutionUpdatePage;
  let solutionDeleteDialog: SolutionDeleteDialog;

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

  it('should load Solutions', async () => {
    await navBarPage.getEntityPage('solution');
    solutionComponentsPage = new SolutionComponentsPage();
    expect(await solutionComponentsPage.getTitle().getText()).to.match(/Solutions/);
  });

  it('should load create Solution page', async () => {
    await solutionComponentsPage.clickOnCreateButton();
    solutionUpdatePage = new SolutionUpdatePage();
    expect(await solutionUpdatePage.getPageTitle().getAttribute('id')).to.match(/isefApp.solution.home.createOrEditLabel/);
    await solutionUpdatePage.cancel();
  });

  it('should create and save Solutions', async () => {
    async function createSolution() {
      await solutionComponentsPage.clickOnCreateButton();
      await solutionUpdatePage.setCodeInput('code');
      expect(await solutionUpdatePage.getCodeInput()).to.match(/code/);
      await solutionUpdatePage.setVersionInput('version');
      expect(await solutionUpdatePage.getVersionInput()).to.match(/version/);
      await solutionUpdatePage.setFromInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await solutionUpdatePage.getFromInput()).to.contain('2001-01-01T02:30');
      await solutionUpdatePage.setUntilInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await solutionUpdatePage.getUntilInput()).to.contain('2001-01-01T02:30');
      await solutionUpdatePage.setSummaryInput('summary');
      expect(await solutionUpdatePage.getSummaryInput()).to.match(/summary/);
      await solutionUpdatePage.setDescriptionInput('description');
      expect(await solutionUpdatePage.getDescriptionInput()).to.match(/description/);
      await solutionUpdatePage.issueSelectLastOption();
      await solutionUpdatePage.expertSelectLastOption();
      await waitUntilDisplayed(solutionUpdatePage.getSaveButton());
      await solutionUpdatePage.save();
      await waitUntilHidden(solutionUpdatePage.getSaveButton());
      expect(await solutionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSolution();
    await solutionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await solutionComponentsPage.countDeleteButtons();
    await createSolution();

    await solutionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await solutionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Solution', async () => {
    await solutionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await solutionComponentsPage.countDeleteButtons();
    await solutionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    solutionDeleteDialog = new SolutionDeleteDialog();
    expect(await solutionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/isefApp.solution.delete.question/);
    await solutionDeleteDialog.clickOnConfirmButton();

    await solutionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await solutionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
