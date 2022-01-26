/** @jest-environment jsdom */

import Page from '../routes/__main/submitted';

describe('Submitted Posts Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
