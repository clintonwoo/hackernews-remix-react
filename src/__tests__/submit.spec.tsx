/** @jest-environment jsdom */

import Page from '../routes/__main/submit';

describe('Submit Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
