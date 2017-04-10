import { TreeFellingPage } from './app.po';

describe('tree-felling App', function() {
  let page: TreeFellingPage;

  beforeEach(() => {
    page = new TreeFellingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tree Felling app');
  });
});
