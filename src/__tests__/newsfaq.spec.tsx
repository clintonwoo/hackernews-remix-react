/** @jest-environment jsdom */

import Page from '../routes/__notice/newsfaq';

describe('FAQ Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
