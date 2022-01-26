/** @jest-environment jsdom */

import Page from '../routes/__main/shownew';

describe('Show New Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
