/** @jest-environment jsdom */

import Page from '../routes/__main/best';

describe('Best Posts Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
