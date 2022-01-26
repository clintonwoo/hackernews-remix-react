/** @jest-environment jsdom */

import Page from '../routes/__main/front';

describe('Front Page', () => {
  it('has default export', () => {
    expect(Page).toBeDefined();
  });
});
