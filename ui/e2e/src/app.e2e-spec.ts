import { AppPage } from './app.po';
import {by, element} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should contain map', () => {
    page.navigateTo();
    const mapEl = element(by.css('map'));
    expect(mapEl.isPresent);
  });
});
