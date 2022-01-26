/** @jest-environment jsdom */

import Page from '../routes/__main/show';

describe('Show Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
