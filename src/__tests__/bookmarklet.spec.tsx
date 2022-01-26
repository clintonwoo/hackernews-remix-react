/** @jest-environment jsdom */

import Page from '../routes/__notice/bookmarklet';

describe('Bookmarklet Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
