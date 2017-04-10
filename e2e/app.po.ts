import { browser, element, by } from 'protractor';

export class TreeFellingPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root header md-toolbar span')).getText();
  }
}
