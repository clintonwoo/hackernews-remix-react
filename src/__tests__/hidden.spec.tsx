/** @jest-environment jsdom */

import Page from '../routes/__main/hidden';

describe('Hidden Posts Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
