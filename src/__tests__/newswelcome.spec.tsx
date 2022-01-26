/** @jest-environment jsdom */

import Page from '../routes/__notice/newswelcome';

describe('Welcome Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
