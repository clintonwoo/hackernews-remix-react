/** @jest-environment jsdom */

import Page from '../routes/__main/active';

describe('Active Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
