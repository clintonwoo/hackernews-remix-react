/** @jest-environment jsdom */

import Page from '../routes/__main/item';

describe('News Item Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
