/** @jest-environment jsdom */

import Page from '../routes/__main/newcomments';

describe('New Comments Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
