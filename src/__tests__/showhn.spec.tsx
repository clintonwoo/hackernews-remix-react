/** @jest-environment jsdom */

import Page from '../routes/__notice/showhn';

describe('Show HN Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
